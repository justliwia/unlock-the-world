
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Music, Palette, Coffee, Camera, Map, 
  ArrowRight, Star, Check, Clock, PenLine
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const interestIcons: Record<string, any> = {
  reading: BookOpen,
  music: Music,
  art: Palette,
  coffee: Coffee,
  photography: Camera,
  travel: Map,
  exploration: Map,
};

// Simplified challenges - just 3 total that will always fit on one page
const featuredChallenges = [
  {
    id: 'challenge-1',
    title: 'Daily Reflection',
    description: 'Write about a moment from today that made you pause and appreciate your surroundings.',
    type: 'text',
    difficulty: 'easy',
    interest: 'exploration',
    interestName: 'Mindfulness'
  },
  {
    id: 'challenge-2',
    title: 'Morning Light',
    description: 'Capture something beautiful in the morning light today.',
    type: 'photo',
    difficulty: 'easy',
    interest: 'photography',
    interestName: 'Photography'
  },
  {
    id: 'challenge-3',
    title: 'Creative Inspiration',
    description: 'Describe what inspires your creativity today and how you plan to channel it.',
    type: 'text',
    difficulty: 'medium',
    interest: 'art',
    interestName: 'Creativity'
  }
];

const ChallengeSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
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
    const challengeDetails = featuredChallenges.find(c => c.id === selectedChallenge);
    
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
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[hsl(var(--soft-cream))]">
        <div className="w-10 h-10 border-4 border-[hsl(var(--teal-green))] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[hsl(var(--soft-cream))] p-4">
      <div className="max-w-md mx-auto pt-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-gradient mb-2">Daily Challenge</h1>
          <p className="text-muted-foreground">
            Select a challenge to unlock today&apos;s feed
          </p>
        </motion.div>
        
        <div className="glass rounded-2xl p-5 mb-4">
          <div className="space-y-4">
            {featuredChallenges.map(challenge => {
              const IconComponent = interestIcons[challenge.interest] || Star;
              
              return (
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
                    <div className="w-full">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-[hsl(var(--deep-blue))]">
                          <IconComponent size={14} className="text-white" />
                        </div>
                        <span className="text-xs text-muted-foreground">{challenge.interestName}</span>
                      </div>
                      
                      <h3 className="font-medium">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                      
                      <div className="flex items-center mt-3 space-x-3 flex-wrap">
                        <div className="flex items-center text-xs bg-[hsl(var(--deep-blue))]/10 text-[hsl(var(--deep-blue))] px-2 py-1 rounded-full mb-1">
                          {challenge.type === 'photo' ? <Camera size={12} className="mr-1" /> : <PenLine size={12} className="mr-1" />}
                          {challenge.type === 'photo' ? 'Photo' : 'Text'}
                        </div>
                        
                        <div className="flex items-center text-xs bg-[hsl(var(--warm-brown))]/10 text-[hsl(var(--warm-brown))] px-2 py-1 rounded-full mb-1">
                          <Star size={12} className="mr-1" />
                          {challenge.difficulty}
                        </div>
                        
                        <div className="flex items-center text-xs bg-[hsl(var(--teal-green))]/10 text-[hsl(var(--teal-green))] px-2 py-1 rounded-full mb-1">
                          <Clock size={12} className="mr-1" />
                          ~15 min
                        </div>
                      </div>
                    </div>
                    
                    {selectedChallenge === challenge.id && (
                      <div className="w-6 h-6 rounded-full bg-[hsl(var(--teal-green))] flex items-center justify-center shrink-0 ml-2">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
        
        <Button
          onClick={handleStartChallenge}
          disabled={!selectedChallenge}
          className="w-full btn-primary mt-4"
        >
          Start Challenge
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ChallengeSelection;
