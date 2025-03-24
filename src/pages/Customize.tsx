
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, Music, Palette, Coffee, Camera, Map, 
  Compass, Utensils, Heart, Dumbbell, Code, Leaf, Star 
} from 'lucide-react';

const interestAreas = [
  { id: 'reading', name: 'Reading', icon: BookOpen, color: 'hsl(var(--warm-brown))' },
  { id: 'music', name: 'Music', icon: Music, color: 'hsl(var(--deep-blue))' },
  { id: 'art', name: 'Art', icon: Palette, color: 'hsl(var(--coral-red))' },
  { id: 'coffee', name: 'Coffee', icon: Coffee, color: 'hsl(29, 45%, 40%)' },
  { id: 'photography', name: 'Photography', icon: Camera, color: 'hsl(var(--teal-green))' },
  { id: 'travel', name: 'Travel', icon: Map, color: 'hsl(215, 50%, 50%)' },
  { id: 'exploration', name: 'Exploration', icon: Compass, color: 'hsl(var(--deep-blue))' },
  { id: 'cooking', name: 'Cooking', icon: Utensils, color: 'hsl(var(--coral-red))' },
  { id: 'wellness', name: 'Wellness', icon: Heart, color: 'hsl(340, 80%, 55%)' },
  { id: 'fitness', name: 'Fitness', icon: Dumbbell, color: 'hsl(200, 60%, 50%)' },
  { id: 'coding', name: 'Coding', icon: Code, color: 'hsl(210, 50%, 40%)' },
  { id: 'gardening', name: 'Gardening', icon: Leaf, color: 'hsl(120, 40%, 45%)' },
];

const Customize = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [interestRatings, setInterestRatings] = useState<Record<string, number>>({});
  const [step, setStep] = useState(1);
  
  const handleSelectInterest = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(prev => prev.filter(id => id !== interestId));
      
      // Also remove the rating
      const newRatings = { ...interestRatings };
      delete newRatings[interestId];
      setInterestRatings(newRatings);
    } else {
      if (selectedInterests.length >= 5) {
        toast({
          title: "Maximum interests reached",
          description: "You can only select up to 5 interest areas.",
          variant: "default",
        });
        return;
      }
      setSelectedInterests(prev => [...prev, interestId]);
      
      // Initialize rating to 3 (medium)
      setInterestRatings(prev => ({ ...prev, [interestId]: 3 }));
    }
  };
  
  const handleRatingChange = (interestId: string, rating: number) => {
    setInterestRatings(prev => ({ ...prev, [interestId]: rating }));
  };
  
  const handleNext = () => {
    if (step === 1) {
      if (selectedInterests.length < 3) {
        toast({
          title: "Select more interests",
          description: "Please select at least 3 interest areas to continue.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else {
      // Save the user preferences
      const userData = JSON.parse(localStorage.getItem('vibe_user') || '{}');
      localStorage.setItem('vibe_user', JSON.stringify({
        ...userData,
        interests: selectedInterests.map(id => ({
          id,
          name: interestAreas.find(area => area.id === id)?.name,
          rating: interestRatings[id] || 3
        }))
      }));
      
      toast({
        title: "Preferences saved!",
        description: "Your Vibe experience is now personalized.",
      });
      
      // Navigate to the daily challenge selection
      navigate('/challenge-selection');
    }
  };
  
  const renderRatingSelector = (interestId: string) => {
    const rating = interestRatings[interestId] || 3;
    
    return (
      <div className="mt-4">
        <p className="text-sm text-center mb-2">How interested are you in this topic?</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Less</span>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                onClick={() => handleRatingChange(interestId, value)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${rating === value 
                    ? 'bg-[hsl(var(--teal-green))] text-white' 
                    : 'bg-muted hover:bg-muted/80'}`}
              >
                {value}
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[hsl(var(--soft-cream))]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md pt-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Personalize Your Vibe</h1>
          {step === 1 ? (
            <p className="text-muted-foreground">Choose up to 5 interest areas</p>
          ) : (
            <p className="text-muted-foreground">Rate your selected interests</p>
          )}
        </div>
        
        {step === 1 ? (
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              {interestAreas.map(interest => (
                <motion.button
                  key={interest.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectInterest(interest.id)}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center h-32 transition-all
                    ${selectedInterests.includes(interest.id)
                      ? 'bg-[hsl(var(--deep-blue))] text-white retro-glow'
                      : 'bg-white border border-muted hover:border-[hsl(var(--teal-green))]/50'}`}
                >
                  <interest.icon 
                    size={28} 
                    style={{ 
                      color: selectedInterests.includes(interest.id) 
                        ? 'white' 
                        : interest.color
                    }} 
                  />
                  <span className="mt-2 font-medium">{interest.name}</span>
                  {selectedInterests.includes(interest.id) && (
                    <div className="mt-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      Selected
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 mb-6">
            {selectedInterests.map(interestId => {
              const interest = interestAreas.find(area => area.id === interestId);
              if (!interest) return null;
              
              return (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{ backgroundColor: interest.color }}
                    >
                      <interest.icon size={20} color="white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{interest.name}</h3>
                      <p className="text-xs text-muted-foreground">Set your interest level</p>
                    </div>
                  </div>
                  
                  {renderRatingSelector(interest.id)}
                </motion.div>
              );
            })}
          </div>
        )}
        
        <div className="flex space-x-4">
          {step === 2 && (
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className={`flex-1 ${step === 1 ? 'btn-primary' : 'btn-accent'}`}
          >
            {step === 1 ? 'Continue' : 'Complete Setup'}
          </Button>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-3">
            <div className={`h-2.5 w-2.5 rounded-full ${step === 1 ? 'bg-[hsl(var(--teal-green))]' : 'bg-muted'}`} />
            <div className={`h-2.5 w-2.5 rounded-full ${step === 2 ? 'bg-[hsl(var(--teal-green))]' : 'bg-muted'}`} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Customize;
