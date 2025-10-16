import React, { createContext, useContext, useEffect } from 'react';
import { useMixpanel } from './useMixpanel';
import { User } from '@/api/entities';

const MixpanelContext = createContext();

export const useMixpanelContext = () => {
    const context = useContext(MixpanelContext);
    if (!context) {
        throw new Error('useMixpanelContext must be used within MixpanelProvider');
    }
    return context;
};

export const MixpanelProvider = ({ children }) => {
    const mixpanel = useMixpanel();

    useEffect(() => {
        // Track initial session with delay to avoid rate limiting
        const trackSession = async () => {
            try {
                // Check if we already tracked a session in this browser session
                const sessionTracked = sessionStorage.getItem('mixpanel_session_tracked');
                if (sessionTracked) return;

                const user = await User.me();
                mixpanel.track('App_Opened', {
                    session_id: Date.now().toString(),
                    user_type: user.is_premium ? 'premium' : 'free'
                });
                
                sessionStorage.setItem('mixpanel_session_tracked', 'true');
            } catch (error) {
                // User not logged in, track anonymous session
                if (!sessionStorage.getItem('mixpanel_anonymous_session')) {
                    mixpanel.track('App_Opened', {
                        is_anonymous: true,
                        session_id: Date.now().toString()
                    });
                    sessionStorage.setItem('mixpanel_anonymous_session', 'true');
                }
            }
        };

        // Delay initial tracking to avoid overwhelming on app start
        const timer = setTimeout(trackSession, 1000);
        return () => clearTimeout(timer);
    }, [mixpanel]);

    return (
        <MixpanelContext.Provider value={mixpanel}>
            {children}
        </MixpanelContext.Provider>
    );
};