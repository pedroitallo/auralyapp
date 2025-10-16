import React, { useState } from 'react';
import { Users, Upload, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { UploadFile } from '@/api/integrations';

export default function CosmicMatchPage() {
    const [partnerName, setPartnerName] = useState('');
    const [partnerPhoto, setPartnerPhoto] = useState(null);
    const [partnerPhotoUrl, setPartnerPhotoUrl] = useState('');
    const [result, setResult] = useState(null);

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPartnerPhoto(file);
            setPartnerPhotoUrl(URL.createObjectURL(file));
        }
    };

    const handleCheckMatch = async () => {
        if (!partnerName) {
            alert('Please enter a name.');
            return;
        }

        let photoUrl = partnerPhotoUrl;
        if (partnerPhoto) {
            try {
                // This is a placeholder, in a real app you'd upload
                // const { file_url } = await UploadFile({ file: partnerPhoto });
                // photoUrl = file_url;
            } catch (error) {
                console.error("Error uploading file", error);
            }
        }
        
        const compatibility = Math.floor(Math.random() * 51) + 50; // 50-100%
        setResult({
            name: partnerName,
            photo: photoUrl,
            compatibility,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 px-4 pt-12 pb-8">
            <div className="max-w-md mx-auto">
                <div className="relative flex items-center justify-center mb-8">
                    <Link to={createPageUrl('reading')} className="absolute left-0 text-white hover:text-purple-300">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-light text-white flex items-center gap-2">
                        <Star className="text-yellow-300"/> Cosmic Match
                    </h1>
                </div>

                {!result ? (
                    <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow space-y-6">
                        <h2 className="text-lg font-semibold text-white text-center">Find your celestial connection</h2>
                        
                        <div className="flex justify-center">
                            <label htmlFor="photo-upload" className="cursor-pointer">
                                <div className="w-32 h-32 rounded-full bg-black/20 border-2 border-dashed border-purple-400/50 flex flex-col items-center justify-center text-purple-200 hover:bg-white/5">
                                    {partnerPhotoUrl ? (
                                        <img src={partnerPhotoUrl} alt="Partner" className="w-full h-full rounded-full object-cover"/>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 mb-2" />
                                            <span className="text-xs text-center">Upload Photo<br/>(optional)</span>
                                        </>
                                    )}
                                </div>
                                <input id="photo-upload" type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                            </label>
                        </div>
                        
                        <Input 
                            placeholder="Enter a name (partner, friend, celeb...)"
                            value={partnerName}
                            onChange={(e) => setPartnerName(e.target.value)}
                            className="bg-white/5 border-white/20 text-white placeholder:text-purple-200/70"
                        />
                        <Button onClick={handleCheckMatch} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                            Check Cosmic Match
                        </Button>
                    </div>
                ) : (
                    <div className="bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 cosmic-glow text-center animate-in fade-in space-y-4">
                        <div className="flex items-center justify-center space-x-4">
                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" alt="You" className="w-20 h-20 rounded-full object-cover border-2 border-blue-400" />
                            {result.photo ? (
                                <img src={result.photo} alt={result.name} className="w-20 h-20 rounded-full object-cover border-2 border-pink-400" />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-black/20 flex items-center justify-center border-2 border-pink-400 text-pink-300 text-3xl font-bold">{result.name.charAt(0)}</div>
                            )}
                        </div>
                        <h3 className="text-white text-lg">You & {result.name}</h3>

                        <div className="py-4">
                            <p className="text-6xl font-bold text-yellow-300">{result.compatibility}%</p>
                            <p className="text-purple-200">Cosmic Sincronicity</p>
                        </div>

                        <p className="text-white">You have a strong celestial connection! Your energies align to create a powerful and harmonious bond. 🌌💜</p>

                        <Button onClick={() => setResult(null)} variant="outline" className="w-full bg-white/5 border-white/20 text-purple-200 hover:bg-white/10">
                            Check another match
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}