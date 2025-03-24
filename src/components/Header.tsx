
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, User, ChevronLeft, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== '/' && 
                         location.pathname !== '/feed' &&
                         location.pathname !== '/profile' && 
                         location.pathname !== '/challenge-selection';
  
  return (
    <motion.header 
      className="sticky top-0 z-10 flex items-center justify-between p-4 mb-4 bg-[hsl(var(--soft-cream))]/80 backdrop-blur-md border-b border-[hsl(var(--deep-blue))]/10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        {showBackButton ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2 text-[hsl(var(--deep-blue))]"
          >
            <ChevronLeft size={20} />
          </Button>
        ) : (
          <motion.div 
            className="text-xl font-bold text-gradient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Vibe
          </motion.div>
        )}
      </div>
      
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" onClick={() => navigate('/feed')} className="text-[hsl(var(--deep-blue))]">
          <Home size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')} className="text-[hsl(var(--deep-blue))]">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate('/profile')} className="text-[hsl(var(--deep-blue))]">
          <User size={20} />
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
