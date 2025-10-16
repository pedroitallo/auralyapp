import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import ContentArchive from "../components/reading/ContentArchive";
import AuralyLogo from "../components/common/AuralyLogo";
import { useMixpanel } from '../components/analytics/useMixpanel';

export default function GuidesPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const contentId = urlParams.get('id');
  
  const { track } = useMixpanel();

  useEffect(() => {
    track('view_guides');
  }, [track]);

  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-md mx-auto">
        <AuralyLogo className="mb-6" />
        <ContentArchive contentId={contentId} />
      </div>
    </div>
  );
}