
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { CameraIcon, ClockIcon } from 'lucide-react';

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    expiresAt: Date;
    completed?: boolean;
  };
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const navigate = useNavigate();
  const isExpired = new Date() > challenge.expiresAt;
  const timeLeft = getTimeLeft(challenge.expiresAt);
  
  function getTimeLeft(expiresAt: Date): string {
    const diff = expiresAt.getTime() - new Date().getTime();
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  }

  return (
    <motion.div 
      className="challenge-card max-w-md mx-auto my-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${challenge.completed ? 'bg-green-500 pulse-light' : 'bg-primary'}`}></div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            {challenge.completed ? 'Completed' : 'Daily Challenge'}
          </span>
        </div>
        <div className="flex items-center">
          <ClockIcon size={14} className="text-muted-foreground mr-1" />
          <span className="text-xs text-muted-foreground">{timeLeft}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
      <p className="text-muted-foreground mb-6">{challenge.description}</p>
      
      {challenge.completed ? (
        <Button 
          onClick={() => navigate('/feed')} 
          className="w-full bg-gradient-to-r from-primary to-blue-500 text-white"
        >
          View Community Posts
        </Button>
      ) : (
        <Button 
          onClick={() => navigate('/capture')} 
          className="w-full" 
          disabled={isExpired}
        >
          <CameraIcon size={18} className="mr-2" />
          Complete Challenge
        </Button>
      )}
    </motion.div>
  );
};

export default ChallengeCard;
