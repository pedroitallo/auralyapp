import Layout from "./Layout.jsx";

import admin from "./admin";

import home from "./home";

import reading from "./reading";

import journey from "./journey";

import guide from "./guide";

import profile from "./profile";

import feedback from "./feedback";

import journeys from "./journeys";

import chats from "./chats";

import coins from "./coins";

import chat from "./chat";

import dreamAnalysis from "./dream-analysis";

import loveCompatibility from "./love-compatibility";

import loveAdvice from "./love-advice";

import fastEnergyCleansing from "./fast-energy-cleansing";

import revelations from "./revelations";

import coinHistory from "./coin-history";

import onboarding from "./onboarding";

import mydivine from "./mydivine";

import letterday from "./letterday";

import magic from "./magic";

import horoscope from "./horoscope";

import managepayments from "./managepayments";

import help from "./help";

import explorejourney from "./explorejourney";

import chataura from "./chataura";

import loveDestiny from "./love-destiny";

import guides from "./guides";

import offerchat from "./offerchat";

import thanks from "./thanks";

import compatibilityRevelation from "./compatibility-revelation";

import loveCompass from "./love-compass";

import cosmicMatch from "./cosmic-match";

import dailyTarot from "./daily-tarot";

import yesOrNo from "./yes-or-no";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    admin: admin,
    
    home: home,
    
    reading: reading,
    
    journey: journey,
    
    guide: guide,
    
    profile: profile,
    
    feedback: feedback,
    
    journeys: journeys,
    
    chats: chats,
    
    coins: coins,
    
    chat: chat,

    'dream-analysis': dreamAnalysis,

    'love-compatibility': loveCompatibility,

    'love-advice': loveAdvice,

    'fast-energy-cleansing': fastEnergyCleansing,

    revelations: revelations,

    'coin-history': coinHistory,
    
    onboarding: onboarding,
    
    mydivine: mydivine,
    
    letterday: letterday,
    
    magic: magic,
    
    horoscope: horoscope,
    
    managepayments: managepayments,
    
    help: help,
    
    explorejourney: explorejourney,
    
    chataura: chataura,

    'love-destiny': loveDestiny,

    guides: guides,

    offerchat: offerchat,

    thanks: thanks,

    'compatibility-revelation': compatibilityRevelation,

    'love-compass': loveCompass,

    'cosmic-match': cosmicMatch,

    'daily-tarot': dailyTarot,

    'yes-or-no': yesOrNo,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<admin />} />
                
                
                <Route path="/admin" element={<admin />} />
                
                <Route path="/home" element={<home />} />
                
                <Route path="/reading" element={<reading />} />
                
                <Route path="/journey" element={<journey />} />
                
                <Route path="/guide" element={<guide />} />
                
                <Route path="/profile" element={<profile />} />
                
                <Route path="/feedback" element={<feedback />} />
                
                <Route path="/journeys" element={<journeys />} />
                
                <Route path="/chats" element={<chats />} />
                
                <Route path="/coins" element={<coins />} />
                
                <Route path="/chat" element={<chat />} />
                
                <Route path="/dream-analysis" element={<dreamAnalysis />} />

                <Route path="/love-compatibility" element={<loveCompatibility />} />

                <Route path="/love-advice" element={<loveAdvice />} />

                <Route path="/fast-energy-cleansing" element={<fastEnergyCleansing />} />

                <Route path="/revelations" element={<revelations />} />

                <Route path="/coin-history" element={<coinHistory />} />
                
                <Route path="/onboarding" element={<onboarding />} />
                
                <Route path="/mydivine" element={<mydivine />} />
                
                <Route path="/letterday" element={<letterday />} />
                
                <Route path="/magic" element={<magic />} />
                
                <Route path="/horoscope" element={<horoscope />} />
                
                <Route path="/managepayments" element={<managepayments />} />
                
                <Route path="/help" element={<help />} />
                
                <Route path="/explorejourney" element={<explorejourney />} />
                
                <Route path="/chataura" element={<chataura />} />
                
                <Route path="/love-destiny" element={<loveDestiny />} />

                <Route path="/guides" element={<guides />} />

                <Route path="/offerchat" element={<offerchat />} />

                <Route path="/thanks" element={<thanks />} />

                <Route path="/compatibility-revelation" element={<compatibilityRevelation />} />

                <Route path="/love-compass" element={<loveCompass />} />

                <Route path="/cosmic-match" element={<cosmicMatch />} />

                <Route path="/daily-tarot" element={<dailyTarot />} />

                <Route path="/yes-or-no" element={<yesOrNo />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}