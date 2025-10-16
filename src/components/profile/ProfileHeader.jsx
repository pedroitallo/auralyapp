import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';

export default function ProfileHeader({ user, onEditClick }) {
    if (!user) {
        return (
            <div className="text-center space-y-4 animate-pulse">
                <div className="w-24 h-24 rounded-full bg-white/10 mx-auto border-4 border-white/20"></div>
                <div className="space-y-2">
                    <div className="h-7 bg-white/20 rounded-md w-3/4 mx-auto"></div>
                    <div className="h-4 bg-white/10 rounded-md w-1/2 mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center space-y-4">
            <div className="relative inline-block">
                <img 
                    src={user.profile_picture_url || `https://ui-avatars.com/api/?name=${user.full_name}&background=8B5CF6&color=fff&size=128`} 
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white/20 shadow-lg object-cover"
                />
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800/80 border-white/20 rounded-full"
                    onClick={onEditClick}
                >
                    <Edit2 className="w-4 h-4 text-white" />
                </Button>
            </div>
            
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-white">{user.full_name || "Spiritual Seeker"}</h1>
                <p className="text-sm text-purple-200">{user.email}</p>
            </div>
        </div>
    );
}