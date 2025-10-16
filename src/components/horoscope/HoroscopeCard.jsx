
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { affirmations } from './data';
import CircularProgress from './CircularProgress';

const periods = {
  today: 1,
  week: 7,
  month: 30,
};

const generateHoroscopeData = () => ({
  love: Math.floor(Math.random() * 51) + 50, // 50-100%
  money: Math.floor(Math.random() * 61) + 40, // 40-100%
  health: Math.floor(Math.random() * 71) + 30, // 30-100%
});

const generateAffirmation = () => {
    return affirmations[Math.floor(Math.random() * affirmations.length)];
}

const AffirmationCard = ({ affirmation }) => (
    <div className="relative bg-black/20 rounded-2xl p-6 mt-6 overflow-hidden min-h-[150px] flex flex-col justify-center">
        <div 
            className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.15
            }}
        ></div>
         <div className="absolute top-4 left-6 text-purple-300 text-xs tracking-widest uppercase">Affirmation</div>
         <p className="relative text-xl text-center font-serif text-white leading-relaxed z-10">
            "{affirmation}"
         </p>
    </div>
);


export default function HoroscopeCard() {
    const [activePeriod, setActivePeriod] = useState('today');
    const [data, setData] = useState({});
    const [affirmation, setAffirmation] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const allData = {};
        
        // Horoscope Data
        Object.keys(periods).forEach(period => {
            const stored = localStorage.getItem(`horoscope_${period}`);
            if (stored) {
                const { data, timestamp } = JSON.parse(stored);
                const days = periods[period];
                // Check if the data is older than 'days' from its timestamp
                // For 'today', it should ideally reset every day regardless of timestamp.
                // For 'week'/'month', it should reset after 7/30 days from timestamp.
                // A simpler check: if the timestamp is not for "today" (if period is today), or if it's expired otherwise.
                const storedDate = new Date(timestamp);
                const currentDate = new Date();
                let isExpired = false;

                if (period === 'today') {
                    // Check if the stored data is from a different day
                    isExpired = storedDate.toDateString() !== currentDate.toDateString();
                } else {
                    // For week/month, check if 'days' have passed since the timestamp
                    isExpired = (currentDate.getTime() - timestamp) > days * 24 * 60 * 60 * 1000;
                }

                if (isExpired) {
                    const newData = generateHoroscopeData();
                    localStorage.setItem(`horoscope_${period}`, JSON.stringify({ data: newData, timestamp: new Date().getTime() }));
                    allData[period] = newData;
                } else {
                    allData[period] = data;
                }
            } else {
                const newData = generateHoroscopeData();
                localStorage.setItem(`horoscope_${period}`, JSON.stringify({ data: newData, timestamp: new Date().getTime() }));
                allData[period] = newData;
            }
        });
        setData(allData);

        // Affirmation Data
        const storedAffirmation = localStorage.getItem('affirmation');
        if (storedAffirmation) {
            const { text, timestamp } = JSON.parse(storedAffirmation);
            // Affirmation expires after 48 hours
            const isExpired = new Date().getTime() - timestamp > 2 * 24 * 60 * 60 * 1000;
            if (isExpired) {
                const newText = generateAffirmation();
                localStorage.setItem('affirmation', JSON.stringify({ text: newText, timestamp: new Date().getTime() }));
                setAffirmation(newText);
            } else {
                setAffirmation(text);
            }
        } else {
            const newText = generateAffirmation();
            localStorage.setItem('affirmation', JSON.stringify({ text: newText, timestamp: new Date().getTime() }));
            setAffirmation(newText);
        }
        
        setIsLoading(false);
    }, []);

    const currentData = data[activePeriod] || { love: 0, money: 0, health: 0 };

    if (isLoading) {
        return (
            <div className="bg-[var(--card-background)] p-4 rounded-2xl border border-[var(--card-border)] animate-pulse space-y-4">
                <div className="h-10 bg-white/10 rounded-full w-full"></div>
                <div className="h-6 bg-white/10 rounded-md w-1/3"></div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-24 h-24 bg-black/20 rounded-full"></div>
                        <div className="h-4 bg-white/10 rounded-md w-1/2"></div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-24 h-24 bg-black/20 rounded-full"></div>
                        <div className="h-4 bg-white/10 rounded-md w-1/2"></div>
                    </div>
                     <div className="flex flex-col items-center space-y-2">
                        <div className="w-24 h-24 bg-black/20 rounded-full"></div>
                        <div className="h-4 bg-white/10 rounded-md w-1/2"></div>
                    </div>
                </div>
                 <div className="h-36 bg-black/20 rounded-2xl"></div>
            </div>
        );
    }
    
    return (
        <div className="bg-[var(--card-background)] p-4 rounded-2xl border border-[var(--card-border)] cosmic-glow shadow-2xl">
            <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-white">Your Horoscope</h2>
            </div>
            
            <Tabs value={activePeriod} onValueChange={setActivePeriod} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800/60 p-1.5 rounded-full border border-white/10">
                    <TabsTrigger value="today" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full">Today</TabsTrigger>
                    <TabsTrigger value="week" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full">Week</TabsTrigger>
                    <TabsTrigger value="month" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full">Month</TabsTrigger>
                </TabsList>
                <TabsContent value={activePeriod} className="mt-6">
                    <div className="flex items-center space-x-2 mb-6">
                        <Calendar className="w-4 h-4 text-purple-300" />
                        <span className="text-sm font-medium text-purple-200">
                           {format(new Date(), 'MM.dd.yy')}
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <CircularProgress percentage={currentData.love} color="#F472B6" label="Love" />
                        <CircularProgress percentage={currentData.money} color="#FBBF24" label="Money" />
                        <CircularProgress percentage={currentData.health} color="#34D399" label="Health" />
                    </div>
                    {affirmation && <AffirmationCard affirmation={affirmation} />}
                </TabsContent>
            </Tabs>
        </div>
    );
}
