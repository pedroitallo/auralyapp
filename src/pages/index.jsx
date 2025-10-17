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

import login from "./login";

import signup from "./signup";

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

    login: login,

    signup: signup,

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

    const Admin = admin;
    const Home = home;
    const Reading = reading;
    const Journey = journey;
    const Guide = guide;
    const Profile = profile;
    const Feedback = feedback;
    const Journeys = journeys;
    const Chats = chats;
    const Coins = coins;
    const Chat = chat;
    const DreamAnalysis = dreamAnalysis;
    const LoveCompatibility = loveCompatibility;
    const LoveAdvice = loveAdvice;
    const FastEnergyCleansing = fastEnergyCleansing;
    const Revelations = revelations;
    const CoinHistory = coinHistory;
    const Onboarding = onboarding;
    const Mydivine = mydivine;
    const Letterday = letterday;
    const Magic = magic;
    const Horoscope = horoscope;
    const Managepayments = managepayments;
    const Help = help;
    const Explorejourney = explorejourney;
    const Chataura = chataura;
    const LoveDestiny = loveDestiny;
    const Guides = guides;
    const Offerchat = offerchat;
    const Thanks = thanks;
    const CompatibilityRevelation = compatibilityRevelation;
    const LoveCompass = loveCompass;
    const CosmicMatch = cosmicMatch;
    const DailyTarot = dailyTarot;
    const YesOrNo = yesOrNo;
    const Login = login;
    const Signup = signup;

    return (
        <Layout currentPageName={currentPage}>
            <Routes>

                    <Route path="/" element={<Home />} />


                <Route path="/admin" element={<Admin />} />

                <Route path="/home" element={<Home />} />

                <Route path="/reading" element={<Reading />} />

                <Route path="/journey" element={<Journey />} />

                <Route path="/guide" element={<Guide />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/feedback" element={<Feedback />} />

                <Route path="/journeys" element={<Journeys />} />

                <Route path="/chats" element={<Chats />} />

                <Route path="/coins" element={<Coins />} />

                <Route path="/chat" element={<Chat />} />

                <Route path="/dream-analysis" element={<DreamAnalysis />} />

                <Route path="/love-compatibility" element={<LoveCompatibility />} />

                <Route path="/love-advice" element={<LoveAdvice />} />

                <Route path="/fast-energy-cleansing" element={<FastEnergyCleansing />} />

                <Route path="/revelations" element={<Revelations />} />

                <Route path="/coin-history" element={<CoinHistory />} />

                <Route path="/onboarding" element={<Onboarding />} />

                <Route path="/mydivine" element={<Mydivine />} />

                <Route path="/letterday" element={<Letterday />} />

                <Route path="/magic" element={<Magic />} />

                <Route path="/horoscope" element={<Horoscope />} />

                <Route path="/managepayments" element={<Managepayments />} />

                <Route path="/help" element={<Help />} />

                <Route path="/explorejourney" element={<Explorejourney />} />

                <Route path="/chataura" element={<Chataura />} />

                <Route path="/love-destiny" element={<LoveDestiny />} />

                <Route path="/guides" element={<Guides />} />

                <Route path="/offerchat" element={<Offerchat />} />

                <Route path="/thanks" element={<Thanks />} />

                <Route path="/compatibility-revelation" element={<CompatibilityRevelation />} />

                <Route path="/love-compass" element={<LoveCompass />} />

                <Route path="/cosmic-match" element={<CosmicMatch />} />

                <Route path="/daily-tarot" element={<DailyTarot />} />

                <Route path="/yes-or-no" element={<YesOrNo />} />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

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