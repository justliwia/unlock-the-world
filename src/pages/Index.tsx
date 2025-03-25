
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, MessageCircle, Clock, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [showDemoDialog, setShowDemoDialog] = React.useState(false);
  
  const handleCreateAccount = () => {
    navigate('/signup');
  };
  
  const handleDemoNavigation = () => {
    setShowDemoDialog(true);
  };
  
  const handleProceedToDemo = () => {
    setShowDemoDialog(false);
    toast.info("You are in demo mode. Some features are limited.");
    navigate('/feed');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-[hsl(var(--soft-cream))] overflow-y-auto">
      <div className="w-full max-w-md px-4 pt-16 pb-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl font-bold mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-gradient">Vibe</span> Journal
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Connect meaningfully through daily discovery challenges
          </motion.p>
        </motion.div>
        
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="relative rounded-2xl overflow-hidden h-56 mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--deep-blue))]/90 to-[hsl(var(--teal-green))]/90 z-0" />
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
              <Camera size={42} className="mb-4 opacity-90" />
              <h2 className="text-xl font-bold mb-2">Complete Daily Challenges</h2>
              <p className="text-center text-sm opacity-90">
                Explore your city, discover new experiences, and share them with friends
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="retro-card p-5 flex flex-col items-center text-center">
              <Clock size={28} className="mb-3 text-[hsl(var(--warm-brown))]" />
              <h3 className="font-medium mb-1">Time-Limited</h3>
              <p className="text-xs text-muted-foreground">
                30-minute access to friend content after completing challenges
              </p>
            </div>
            
            <div className="retro-card p-5 flex flex-col items-center text-center">
              <MessageCircle size={28} className="mb-3 text-[hsl(var(--coral-red))]" />
              <h3 className="font-medium mb-1">Voice Reactions</h3>
              <p className="text-xs text-muted-foreground">
                Respond to friends' posts with voice messages
              </p>
            </div>
            
            <div className="retro-card p-5 flex flex-col items-center text-center">
              <Heart size={28} className="mb-3 text-[hsl(var(--deep-blue))]" />
              <h3 className="font-medium mb-1">Interest-Based</h3>
              <p className="text-xs text-muted-foreground">
                Discover challenges based on your interests
              </p>
            </div>
            
            <div className="retro-card p-5 flex flex-col items-center text-center">
              <div className="font-mono text-2xl mb-1 text-[hsl(var(--teal-green))]">5/5</div>
              <h3 className="font-medium mb-1">Engagement Score</h3>
              <p className="text-xs text-muted-foreground">
                Track your growth and achievements
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            onClick={handleCreateAccount}
            className="w-full btn-primary h-12"
          >
            Create Account
            <ArrowRight size={16} className="ml-2" />
          </Button>
          
          <div className="text-center">
            <button 
              onClick={handleDemoNavigation} 
              className="text-[hsl(var(--deep-blue))] hover:underline text-sm font-medium"
            >
              Demo without signing up
            </button>
          </div>
        </motion.div>
      </div>
      
      <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Demo Mode Limitations</DialogTitle>
            <DialogDescription>
              You cannot complete a challenge without signing up. You will only see the feed page in demo mode.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDemoDialog(false)}>
              Create Account
            </Button>
            <Button onClick={handleProceedToDemo} className="sm:ml-2">
              Proceed Regardless
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
