
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ChallengeCard from '@/components/ChallengeCard';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [todayChallenge, setTodayChallenge] = useState<any>(null);
  
  useEffect(() => {
    // Simulate loading of daily challenge
    const timer = setTimeout(() => {
      setTodayChallenge({
        id: '1',
        title: 'Find a Hidden Spot in Your City',
        description: "Discover a spot in your city you've never visited before. Take a photo that captures what makes it special.",
        expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 24 hours from now
        completed: false,
      });
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 pt-4 pb-20 max-w-md mx-auto w-full">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center">
            <motion.div
              className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-muted-foreground">Loading today's challenge...</p>
          </div>
        ) : (
          <>
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Unlock The World
              </motion.h1>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Complete today's challenge to see what your friends shared
              </motion.p>
            </motion.div>
          
            <ChallengeCard challenge={todayChallenge} />
            
            <motion.div 
              className="mt-8 px-4 py-6 glass rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="font-semibold mb-2">How it works:</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Complete the daily challenge with a photo</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Unlock your feed for a limited time window</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>See how friends completed the same challenge</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                  <span>React with voice messages or suggest real-world meetups</span>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
