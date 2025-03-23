
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimeLimitProps {
  timeLeft: number; // in seconds
  onTimeEnd: () => void;
}

const TimeLimit: React.FC<TimeLimitProps> = ({ timeLeft, onTimeEnd }) => {
  const [remainingTime, setRemainingTime] = useState(timeLeft);
  const [isWarning, setIsWarning] = useState(false);
  
  useEffect(() => {
    if (remainingTime <= 0) {
      onTimeEnd();
      return;
    }
    
    // Set warning when less than 1 minute left
    if (remainingTime <= 60 && !isWarning) {
      setIsWarning(true);
    }
    
    const timer = setTimeout(() => {
      setRemainingTime(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [remainingTime, onTimeEnd, isWarning]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const percentLeft = (remainingTime / timeLeft) * 100;
  
  return (
    <motion.div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="glass px-4 py-2 rounded-full shadow-md flex items-center">
        <div className="w-36 h-2 bg-secondary rounded-full overflow-hidden mr-3">
          <motion.div 
            className={cn(
              "h-full rounded-full",
              isWarning ? "bg-red-500" : "bg-primary"
            )}
            initial={{ width: '100%' }}
            animate={{ width: `${percentLeft}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className={cn(
          "font-medium text-sm",
          isWarning ? "text-red-500" : "text-foreground"
        )}>
          {formatTime(remainingTime)}
        </span>
      </div>
    </motion.div>
  );
};

export default TimeLimit;
