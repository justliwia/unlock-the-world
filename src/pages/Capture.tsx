
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CameraCapture from '@/components/CameraCapture';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Capture = () => {
  const navigate = useNavigate();
  
  // Get current challenge from localStorage
  const currentChallenge = JSON.parse(localStorage.getItem('vibe_current_challenge') || '{}');
  const { title, description, type, interest } = currentChallenge;
  
  const handleGoBack = () => {
    navigate('/challenge-selection');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2"
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Challenges
          </Button>
          
          <h2 className="text-xl font-semibold mb-2">{title || "Today's Challenge"}</h2>
          <p className="text-muted-foreground mb-2">{description || "Complete this challenge to unlock your feed."}</p>
          
          <div className="flex items-center mb-4">
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              {type === 'photo' ? 'Photo Challenge' : 'Journal Entry'}
            </span>
            {interest && (
              <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--teal-green))]/10 text-[hsl(var(--teal-green))] ml-2">
                {interest.charAt(0).toUpperCase() + interest.slice(1)}
              </span>
            )}
          </div>
          
          {type === 'photo' && (
            <p className="text-xs text-muted-foreground">
              In demo mode, you can select from our library of images instead of using your camera.
            </p>
          )}
        </div>
        
        <CameraCapture />
      </main>
    </div>
  );
};

export default Capture;
