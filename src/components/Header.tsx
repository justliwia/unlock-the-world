
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, User, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== '/';
  
  return (
    <motion.header 
      className="glass sticky top-0 z-10 flex items-center justify-between p-4 mb-4"
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
            className="mr-2"
          >
            <ChevronLeft size={20} />
          </Button>
        ) : (
          <motion.div 
            className="text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Unlock The World
          </motion.div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
          <User size={20} />
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
