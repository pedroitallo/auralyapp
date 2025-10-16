import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { resultTexts } from './data';
import { RefreshCw, ArrowLeft } from 'lucide-react';

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomText = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateScores = (relationship) => {
    switch (relationship) {
        case 'friends':
        case 'acquaintances':
            return {
                overall: getRandomScore(65, 85),
                love: getRandomScore(40, 65),
                sex: getRandomScore(30, 60),
                family: getRandomScore(50, 75),
                friendship: getRandomScore(80, 98),
                business: getRandomScore(60, 80),
                text: getRandomText(resultTexts.friends),
            };
        case 'exes':
             return {
                overall: getRandomScore(25, 55),
                love: getRandomScore(20, 45),
                sex: getRandomScore(20, 50),
                family: getRandomScore(40, 60),
                friendship: getRandomScore(30, 55),
                business: getRandomScore(40, 65),
                text: getRandomText(resultTexts.exes),
            };
        case 'dating':
        case 'married':
             return {
                overall: getRandomScore(85, 100),
                love: getRandomScore(88, 100),
                sex: getRandomScore(85, 100),
                family: getRandomScore(80, 98),
                friendship: getRandomScore(85, 100),
                business: getRandomScore(75, 95),
                text: getRandomText(resultTexts.dating),
            };
        case 'crush':
             return {
                overall: getRandomScore(70, 92),
                love: getRandomScore(75, 95),
                sex: getRandomScore(70, 90),
                family: getRandomScore(60, 80),
                friendship: getRandomScore(70, 90),
                business: getRandomScore(65, 85),
                text: getRandomText(resultTexts.crush),
            };
        default:
             return {
                overall: getRandomScore(50, 80),
                love: getRandomScore(50, 80),
                sex: getRandomScore(50, 80),
                family: getRandomScore(50, 80),
                friendship: getRandomScore(50, 80),
                business: getRandomScore(50, 80),
                text: "Your connection is unique and full of potential. Explore it with an open heart.",
            };
    }
};

const ScoreBar = ({ label, score }) => (
    <div className="flex justify-between items-center">
        <span className="font-semibold text-white text-lg">{label}</span>
        <div className="flex items-center space-x-3">
            <div className="w-32 bg-white/10 rounded-full h-2">
                <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
            </div>
            <span className="font-bold text-white text-lg w-12 text-right">{score}%</span>
        </div>
    </div>
);

const ResultScreen = ({ formData, onRestart, onBack }) => {
    const [scores, setScores] = useState(null);

    useEffect(() => {
        setScores(generateScores(formData.relationship));
    }, [formData.relationship]);

    if (!scores) return null;

    const { person1, person2 } = formData;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-[#101427] to-[#1C132F] text-white p-6 flex flex-col"
        >
            <div className="flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-white hover:text-purple-300">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Compatibility Report</h1>
                <div className="w-6" />
            </div>

            <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gray-600/30 rounded-full flex items-center justify-center text-2xl">
                        {person2.sign?.icon || '👤'}
                    </div>
                    <span className="font-semibold">{person2.name}</span>
                </div>
                <span className="text-4xl font-light text-purple-400">+</span>
                <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gray-600/30 rounded-full flex items-center justify-center text-2xl">
                        {person1.sign?.icon || '👤'}
                    </div>
                    <span className="font-semibold">{person1.name}</span>
                </div>
            </div>

            {/* Overall Score - Big Oval Bar */}
            <div className="text-center mb-8">
                <div className="w-full max-w-xs mx-auto bg-white/10 rounded-full h-12 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-600 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${scores.overall}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    />
                    <span className="relative text-2xl font-bold text-white z-10">{scores.overall}%</span>
                </div>
            </div>

            {/* Individual Scores in Grid Format */}
            <div className="space-y-6 mb-8">
                <ScoreBar label="Love" score={scores.love} />
                <ScoreBar label="Sex" score={scores.sex} />
                <ScoreBar label="Family" score={scores.family} />
                <ScoreBar label="Friendship" score={scores.friendship} />
                <ScoreBar label="Business" score={scores.business} />
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">General</h2>
                <p className="text-purple-200 leading-relaxed">{scores.text}</p>
            </div>
            
            <div className="mt-auto">
                 <Button
                    onClick={onRestart}
                    className="w-full h-14 text-lg bg-purple-600 hover:bg-purple-700 rounded-xl flex items-center justify-center space-x-2"
                >
                    <RefreshCw size={20} />
                    <span>Check Another</span>
                </Button>
            </div>
        </motion.div>
    );
};

export default ResultScreen;