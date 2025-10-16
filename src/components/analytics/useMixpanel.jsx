import React, { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';

// Function to get or create an anonymous ID
const getAnonymousId = () => {
    let anonId = localStorage.getItem('mixpanel_anonymous_id');
    if (!anonId) {
        anonId = crypto.randomUUID();
        localStorage.setItem('mixpanel_anonymous_id', anonId);
    }
    return anonId;
};

// Global rate limiter
const globalRateLimiter = {
    lastTrackTime: 0,
    minInterval: 2000, // Minimum 2 seconds between ANY events
    canTrack: function() {
        const now = Date.now();
        if (now - this.lastTrackTime < this.minInterval) {
            return false;
        }
        this.lastTrackTime = now;
        return true;
    }
};

export const useMixpanel = () => {
    const lastTrackTime = useRef({});
    const trackingQueue = useRef(new Set());
    const failedAttempts = useRef(0);
    const isRateLimited = useRef(false);

    const track = async (eventName, properties = {}) => {
        // Check if we're rate limited
        if (isRateLimited.current) {
            console.log(`⏸️ Mixpanel: Rate limited, skipping "${eventName}"`);
            return;
        }

        // Global rate limiter check
        if (!globalRateLimiter.canTrack()) {
            console.log(`⏸️ Mixpanel: Too many events, skipping "${eventName}"`);
            return;
        }

        const eventKey = `${eventName}_${JSON.stringify(properties)}`;
        const now = Date.now();
        const lastTime = lastTrackTime.current[eventKey];
        
        // Prevent duplicate events within 10 seconds
        if (lastTime && (now - lastTime) < 10000) {
            return;
        }

        // Prevent concurrent tracking of the same event
        if (trackingQueue.current.has(eventKey)) {
            return;
        }

        trackingQueue.current.add(eventKey);
        lastTrackTime.current[eventKey] = now;
        
        try {
            const pageProperties = {
                page_url: window.location.href,
                page_path: window.location.pathname,
                page_title: document.title,
                referrer: document.referrer,
                user_agent: navigator.userAgent,
                screen_resolution: `${window.screen.width}x${window.screen.height}`,
                timestamp: new Date().toISOString(),
                ...properties
            };
            
            const anonymousId = getAnonymousId();

            await base44.functions.invoke('trackMixpanelEvent', {
                event_name: eventName,
                properties: pageProperties,
                distinct_id: anonymousId
            });

            // Reset failed attempts on success
            failedAttempts.current = 0;
            isRateLimited.current = false;

        } catch (error) {
            console.warn(`⚠️ Mixpanel: Failed to track "${eventName}"`, error.message);
            
            // Check if it's a rate limit error
            if (error.message?.includes('429') || error.message?.includes('Rate limit')) {
                failedAttempts.current++;
                
                // If we get multiple 429 errors, stop tracking for a while
                if (failedAttempts.current >= 3) {
                    isRateLimited.current = true;
                    console.warn('🛑 Mixpanel: Too many rate limit errors, pausing tracking for 5 minutes');
                    
                    // Resume tracking after 5 minutes
                    setTimeout(() => {
                        isRateLimited.current = false;
                        failedAttempts.current = 0;
                        console.log('✅ Mixpanel: Tracking resumed');
                    }, 5 * 60 * 1000);
                }
                
                // Don't retry rate-limited requests
                trackingQueue.current.delete(eventKey);
                return;
            }
        } finally {
            // Remove from queue after a delay
            setTimeout(() => trackingQueue.current.delete(eventKey), 1000);
        }
    };

    const trackPageView = (pageName) => {
        // Use session storage to track page views once per session
        const sessionKey = `mixpanel_page_${pageName}`;
        if (sessionStorage.getItem(sessionKey)) {
            return;
        }
        
        track('Page View', { page_name: pageName });
        sessionStorage.setItem(sessionKey, 'true');
    };

    const trackButtonClick = (buttonName, location) => {
        track('Button Click', { button_name: buttonName, location: location });
    };

    const trackReading = (readingType, readingName) => {
        track('Reading Started', { reading_type: readingType, reading_name: readingName });
    };

    const trackReadingComplete = (readingType, readingName, timeSpent) => {
        track('Reading Completed', { reading_type: readingType, reading_name: readingName, time_spent_seconds: timeSpent });
    };

    const trackSignUp = (method = 'email') => {
        track('Sign Up', { method });
    };

    const trackLogin = () => {
        track('Login');
    };

    const trackFeatureUsed = (featureName) => {
        track('Feature Used', { feature_name: featureName });
    };

    const trackError = (errorType, errorMessage, context) => {
        track('Error Occurred', { error_type: errorType, error_message: errorMessage, context: context });
    };

    return {
        track,
        trackPageView,
        trackButtonClick,
        trackReading,
        trackReadingComplete,
        trackSignUp,
        trackLogin,
        trackFeatureUsed,
        trackError
    };
};

export const usePageTracking = (pageName) => {
    const { trackPageView } = useMixpanel();
    
    React.useEffect(() => {
        const sessionKey = `mixpanel_tracked_${pageName}`;
        const alreadyTracked = sessionStorage.getItem(sessionKey);
        
        if (!alreadyTracked) {
            // Add a small delay to prevent immediate tracking on mount
            const timer = setTimeout(() => {
                trackPageView(pageName);
                sessionStorage.setItem(sessionKey, 'true');
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [pageName, trackPageView]);
};