
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Music, Palette, Coffee, Camera, Map, 
  ArrowRight, Star, Check, Clock 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Map interest IDs to icons
const interestIcons: Record<string, any> = {
  reading: BookOpen,
  music: Music,
  art: Palette,
  coffee: Coffee,
  photography: Camera,
  travel: Map,
  exploration: Map,
  // Add more mappings as needed
};

const challenges = {
  reading: [
    {
      id: 'reading-1',
      title: 'Find a Reading Nook',
      description: 'Discover a new spot in your area perfect for reading. Take a photo and share what makes it special.',
      type: 'photo',
      difficulty: 'easy',
    },
    {
      id: 'reading-2',
      title: 'Book Recommendation',
      description: 'Write a short review of a book you recently read and would recommend to others.',
      type: 'text',
      difficulty: 'medium',
    }
  ],
  art: [
    {
      id: 'art-1',
      title: 'Street Art Hunt',
      description: 'Find an interesting piece of street art or mural in your city and capture it.',
      type: 'photo',
      difficulty: 'easy',
    },
    {
      id: 'art-2',
      title: 'Create a Sketch',
      description: 'Draw something that represents your current mood and share it with the community.',
      type: 'photo',
      difficulty: 'medium',
    }
  ],
  music: [
    {
      id: 'music-1',
      title: 'Song of the Day',
      description: 'Share the song that\'s been on repeat for you today and why it resonates.',
      type: 'text',
      difficulty: 'easy',
    },
    {
      id: 'music-2',
      title: 'Local Music Venue',
      description: 'Find a local music venue or spot where musicians perform and share it.',
      type: 'photo',
      difficulty: 'medium',
    }
  ],
  photography: [
    {
      id: 'photography-1',
      title: 'Morning Light',
      description: 'Capture something beautiful in the morning light today.',
      type: 'photo',
      difficulty: 'easy',
    },
    {
      id: 'photography-2',
      title: 'Shadows & Reflections',
      description: 'Find an interesting shadow or reflection and photograph it creatively.',
      type: 'photo',
      difficulty: 'medium',
    }
  ],
  exploration: [
    {
      id: 'exploration-1',
      title: 'Hidden Spot',
      description: 'Find a hidden or lesser-known spot in your city that you\'ve never visited before.',
      type: 'photo',
      difficulty: 'medium',
    },
    {
      id: 'exploration-2',
      title: 'New Route Home',
      description: 'Take a different route home today and share something interesting you discovered.',
      type: 'photo',
      difficulty: 'easy',
    }
  ],
  // Add more interests and their challenges
};

const ChallengeSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInterests, setUserInterests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  
  useEffect(() => {
    // Load user interests from local storage
    const userData = JSON.parse(localStorage.getItem('vibe_user') || '{}');
    const interests = userData.interests || [];
    
    if (interests.length === 0) {
      // If no interests found, redirect to customize page
      toast({
        title: "No interests found",
        description: "Please set up your interests first.",
        variant: "destructive",
      });
      navigate('/customize');
    } else {
      setUserInterests(interests);
      setLoading(false);
    }
  }, [navigate, toast]);
  
  const handleChallengeSelect = (challengeId: string) => {
    setSelectedChallenge(challengeId);
  };
  
  const handleStartChallenge = () => {
    if (!selectedChallenge) {
      toast({
        title: "No challenge selected",
        description: "Please select a challenge to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // Find the selected challenge details
    let challengeDetails = null;
    Object.keys(challenges).forEach(interestKey => {
      const interestChallenges = challenges[interestKey as keyof typeof challenges];
      const found = interestChallenges.find(c => c.id === selectedChallenge);
      if (found) {
        challengeDetails = {
          ...found,
          interest: interestKey
        };
      }
    });
    
    if (!challengeDetails) {
      toast({
        title: "Challenge not found",
        description: "There was an error selecting this challenge.",
        variant: "destructive",
      });
      return;
    }
    
    // Save the selected challenge to local storage
    localStorage.setItem('vibe_current_challenge', JSON.stringify({
      ...challengeDetails,
      selectedAt: new Date().toISOString(),
      completed: false
    }));
    
    // Navigate to the capture page
    navigate('/capture');
  };
  
  const renderInterestChallenges = (interest: any) => {
    const interestId = interest.id;
    const interestChallenges = challenges[interestId as keyof typeof challenges] || [];
    
    // If no challenges for this interest, return null
    if (interestChallenges.length === 0) {
      return null;
    }
    
    const IconComponent = interestIcons[interestId] || Star;
    
    return (
      <motion.div
        key={interestId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-[hsl(var(--deep-blue))]">
            <IconComponent size={16} className="text-white" />
          </div>
          <h2 className="text-lg font-semibold">{interest.name}</h2>
        </div>
        
        <div className="space-y-4">
          {interestChallenges.map(challenge => (
            <motion.button
              key={challenge.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChallengeSelect(challenge.id)}
              className={`w-full text-left p-4 rounded-xl transition-all border-2 
                ${selectedChallenge === challenge.id 
                  ? 'border-[hsl(var(--teal-green))] bg-[hsl(var(--teal-green))]/10 retro-glow'
                  : 'border-muted bg-white hover:border-[hsl(var(--teal-green))]/30'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                  
                  <div className="flex items-center mt-3 space-x-3">
                    <div className="flex items-center text-xs bg-[hsl(var(--deep-blue))]/10 text-[hsl(var(--deep-blue))] px-2 py-1 rounded-full">
                      {challenge.type === 'photo' ? <Camera size={12} className="mr-1" /> : <BookOpen size={12} className="mr-1" />}
                      {challenge.type === 'photo' ? 'Photo' : 'Text'}
                    </div>
                    
                    <div className="flex items-center text-xs bg-[hsl(var(--warm-brown))]/10 text-[hsl(var(--warm-brown))] px-2 py-1 rounded-full">
                      <Star size={12} className="mr-1" />
                      {challenge.difficulty}
                    </div>
                    
                    <div className="flex items-center text-xs bg-[hsl(var(--teal-green))]/10 text-[hsl(var(--teal-green))] px-2 py-1 rounded-full">
                      <Clock size={12} className="mr-1" />
                      ~15 min
                    </div>
                  </div>
                </div>
                
                {selectedChallenge === challenge.id && (
                  <div className="w-6 h-6 rounded-full bg-[hsl(var(--teal-green))] flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[hsl(var(--soft-cream))]">
        <div className="w-10 h-10 border-4 border-[hsl(var(--teal-green))] border-t-transparent rounded-full animate-rotate-360" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[hsl(var(--soft-cream))] p-4">
      <div className="max-w-md mx-auto pt-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-gradient mb-2">Daily Challenge</h1>
          <p className="text-muted-foreground">
            Select a challenge to unlock today's feed
          </p>
        </motion.div>
        
        <div className="glass rounded-2xl p-5 mb-6">
          {userInterests.map(interest => renderInterestChallenges(interest))}
        </div>
        
        <Button
          onClick={handleStartChallenge}
          disabled={!selectedChallenge}
          className="w-full btn-primary"
        >
          Start Challenge
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ChallengeSelection;
