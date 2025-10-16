
import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Settings, Star, Moon, BookOpen, ChevronRight, Download } from "lucide-react";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { UploadFile } from "@/api/integrations";
import { useMixpanel } from '../components/analytics/useMixpanel';

import AuralyLogo from "../components/common/AuralyLogo"; // Added import for AuralyLogo
import ProfileHeader from "../components/profile/ProfileHeader";
import SettingsPanel from "../components/profile/SettingsPanel";
import SupportSection from "../components/profile/SupportSection";
import AddToHomeScreenPopup from "../components/common/AddToHomeScreenPopup";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddToHomePopup, setShowAddToHomePopup] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { track } = useMixpanel();

  useEffect(() => {
    // Track page view
    track('view_profile');

    loadProfile();
    
    // Recarregar perfil quando voltar para a página
    const handleFocus = () => {
      loadProfile();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [track]);

  const loadProfile = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleProfileUpdate = async (data) => {
    const { formData, file } = data; // Destructure form data and file
    setIsSaving(true);
    try {
      const dataToUpdate = { ...formData };
      
      // Handle file upload if a new file is provided
      if (file) {
        // Use the UploadFile integration to upload the file to storage
        const uploadResult = await UploadFile({ file: file });
        
        // If upload is successful and returns a URL, add it to the update data
        if (uploadResult && uploadResult.file_url) {
          dataToUpdate.profile_picture_url = uploadResult.file_url;
        } else {
          console.error("File upload did not return a valid URL.");
        }
      }
      
      // Update the user's data with the new information
      await User.updateMyUserData(dataToUpdate);
      
      // Refresh the user profile on the page to show changes
      await loadProfile();
      
      // Close the settings panel
      setShowSettings(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optionally, show an error message to the user here
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadClick = () => {
    track('DownloadApp_Button_Clicked', { location: 'profile_page' });
    setShowAddToHomePopup(true);
  };

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-xs mx-auto space-y-12">
        <AuralyLogo className="mb-4" /> {/* Added AuralyLogo */}
        
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center space-x-2">
            <Star className="w-6 h-6 text-purple-300" />
            <h1 className="text-2xl font-light text-white">Your Profile</h1>
            <Moon className="w-6 h-6 text-yellow-300" />
          </div>
          <p className="text-purple-200 text-sm">
            Your spiritual journey and insights
          </p>
        </div>

        {!showSettings ? (
          <div className="space-y-8">
            <ProfileHeader user={user} onEditClick={() => setShowSettings(true)} />
            
            <div className="px-1">
              <Button 
                variant="outline" 
                className="w-full bg-white/5 border-white/20 text-purple-200 hover:bg-white/10 rounded-xl"
                onClick={handleDownloadClick}
              >
                <Download className="w-4 h-4 mr-2" />
                Download App
              </Button>
            </div>

            <SupportSection />
          </div>
        ) : (
          <SettingsPanel 
            user={user}
            onSave={handleProfileUpdate}
            onCancel={() => setShowSettings(false)}
            isSaving={isSaving}
          />
        )}
      </div>
       <AddToHomeScreenPopup 
        isOpen={showAddToHomePopup}
        onClose={() => setShowAddToHomePopup(false)}
      />
    </div>
  );
}
