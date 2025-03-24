
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface TimeLimitProps {
  timeLimit: number; // in seconds
  onTimeEnd: () => void;
}

const TimeLimit: React.FC<TimeLimitProps> = ({ timeLimit, onTimeEnd }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWarning, setIsWarning] = useState(false);
  
  useEffect(() => {
    if (elapsedTime >= timeLimit) {
      onTimeEnd();
      return;
    }
    
    // Set warning when less than 1 minute left
    if (timeLimit - elapsedTime <= 60 && !isWarning) {
      setIsWarning(true);
    }
    
    const timer = setTimeout(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [elapsedTime, timeLimit, onTimeEnd, isWarning]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const percentElapsed = (elapsedTime / timeLimit) * 100;
  
  return (
    <motion.div 
      className="fixed top-20 right-4 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="glass px-3 py-1.5 rounded-full shadow-md flex items-center">
        <Clock size={14} className="mr-1.5 text-primary" />
        <div className="w-24 h-1.5 bg-secondary/30 rounded-full overflow-hidden mr-2">
          <motion.div 
            className={cn(
              "h-full rounded-full",
              isWarning ? "bg-red-500" : "bg-primary"
            )}
            initial={{ width: '0%' }}
            animate={{ width: `${percentElapsed}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className={cn(
          "font-medium text-xs",
          isWarning ? "text-red-500" : "text-foreground"
        )}>
          {formatTime(elapsedTime)}
        </span>
      </div>
    </motion.div>
  );
};

export default TimeLimit;
