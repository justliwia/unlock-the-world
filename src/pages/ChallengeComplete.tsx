
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const ChallengeComplete = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        className="flex flex-col items-center text-center max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle size={80} className="text-primary mb-6" />
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-4">Challenge Completed!</h1>
        <p className="text-muted-foreground mb-8">
          Congratulations! You've successfully unlocked your feed for the next 30 minutes. 
          See how your friends completed today's challenge.
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Button 
            onClick={() => navigate('/feed')} 
            className="bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg shadow-primary/20"
          >
            View Community Posts
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChallengeComplete;
