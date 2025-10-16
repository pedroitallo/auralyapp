
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const luckyColors = [
    { name: 'Lilac', bg: 'bg-purple-400', ring: 'ring-purple-400/50' },
    { name: 'Red', bg: 'bg-red-500', ring: 'ring-red-500/50' },
    { name: 'Yellow', bg: 'bg-yellow-400', ring: 'ring-yellow-400/50' },
    { name: 'Blue', bg: 'bg-sky-500', ring: 'ring-sky-500/50' },
    { name: 'Green', bg: 'bg-emerald-500', ring: 'ring-emerald-500/50' },
    { name: 'White', bg: 'bg-slate-200', ring: 'ring-slate-200/50' },
    { name: 'Orange', bg: 'bg-orange-500', ring: 'ring-orange-500/50' },
];

const generateNewFeatures = () => {
    // Generate Lucky Color
    const color = luckyColors[Math.floor(Math.random() * luckyColors.length)];

    // Generate Lucky Number
    const number = Math.floor(Math.random() * 100) + 1;

    // Generate Lucky Time
    const startHour = Math.floor(Math.random() * 12); // 0-11
    const startMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    const durationHours = Math.floor(Math.random() * 4) + 2; // 2-5 hours

    const startDate = new Date();
    startDate.setHours(startHour + (Math.random() > 0.5 ? 12 : 0), startMinute, 0, 0);

    const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

    const timeRange = `${format(startDate, 'h:mm a')} - ${format(endDate, 'h:mm a')}`;
    
    const newFeatures = { color, number, time: timeRange };
    
    localStorage.setItem('holyguide_todays_features', JSON.stringify({
        data: newFeatures,
        timestamp: new Date().getTime(),
    }));

    return newFeatures;
};

const FeatureCard = ({ title, children }) => (
    <div className="bg-black/20 rounded-xl p-3 h-32 flex flex-col justify-between items-center text-center">
        <div className="flex-grow flex items-center justify-center">
            {children}
        </div>
        <p className="text-purple-200 text-xs font-medium">{title}</p>
    </div>
);

export default function TodaysFeatures() {
    const [features, setFeatures] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('holyguide_todays_features');
        if (stored) {
            const { data, timestamp } = JSON.parse(stored);
            const isExpired = new Date().getTime() - timestamp > 24 * 60 * 60 * 1000;
            if (isExpired) {
                setFeatures(generateNewFeatures());
            } else {
                setFeatures(data);
            }
        } else {
            setFeatures(generateNewFeatures());
        }
    }, []);

    if (!features) {
        return (
            <div className="bg-[var(--card-background)] p-4 rounded-2xl border border-[var(--card-border)] animate-pulse">
                <div className="h-6 bg-white/10 rounded-md w-3/4 mb-4"></div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-black/20 rounded-xl h-32"></div>
                    <div className="bg-black/20 rounded-xl h-32"></div>
                    <div className="bg-black/20 rounded-xl h-32"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--card-background)] p-4 rounded-2xl border border-[var(--card-border)] cosmic-glow shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-3">Today's Features</h3>
            <div className="grid grid-cols-3 gap-3">
                <FeatureCard title="Lucky Color">
                    <div className={`relative w-12 h-12 rounded-full ${features.color.bg}`}>
                        <div className={`absolute -inset-1 rounded-full ring-4 ${features.color.ring} animate-pulse`}></div>
                    </div>
                </FeatureCard>
                <FeatureCard title="Lucky Number">
                    <p className="text-4xl font-bold text-white">{features.number}</p>
                </FeatureCard>
                <FeatureCard title="Lucky Time">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-white">{features.time.split(' - ')[0]}</p>
                        <p className="text-sm font-semibold text-white">{features.time.split(' - ')[1]}</p>
                    </div>
                </FeatureCard>
            </div>
        </div>
    );
}
