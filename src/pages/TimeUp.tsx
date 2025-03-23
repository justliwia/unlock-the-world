
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ClockIcon } from 'lucide-react';

const TimeUp = () => {
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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <ClockIcon size={80} className="text-muted-foreground mb-6" />
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-4">Time's Up!</h1>
        <p className="text-muted-foreground mb-8">
          Your viewing session has ended. Come back tomorrow for a new challenge 
          and another opportunity to connect with friends in the real world!
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Button 
            onClick={() => navigate('/')} 
            className="bg-gradient-to-r from-muted to-secondary text-foreground"
          >
            Return Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TimeUp;
