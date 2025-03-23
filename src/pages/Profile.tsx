
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Calendar, Award } from 'lucide-react';

const Profile = () => {
  const user = {
    name: "Jamie Smith",
    username: "jamiesmith",
    avatar: "https://i.pravatar.cc/150?img=3",
    completedChallenges: 14,
    streak: 7,
  };
  
  const achievements = [
    { name: "Explorer", description: "Completed 10 challenges", unlocked: true },
    { name: "Social Butterfly", description: "Sent 20 voice reactions", unlocked: true },
    { name: "Early Bird", description: "Completed 5 challenges before noon", unlocked: false },
    { name: "City Expert", description: "Found 15 hidden spots", unlocked: false },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        <motion.div 
          className="flex flex-col items-center text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
          
          <div className="flex items-center mt-4 mb-6 space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold">{user.completedChallenges}</div>
              <div className="text-xs text-muted-foreground">Challenges</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">{user.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Settings size={16} className="mr-1" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <LogOut size={16} className="mr-1" />
              Sign Out
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          className="glass rounded-xl p-5 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <Calendar size={18} className="mr-2 text-primary" />
            <h2 className="text-lg font-semibold">Challenge History</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Today</span>
              <span className="text-green-500 text-sm">Completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Yesterday</span>
              <span className="text-green-500 text-sm">Completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Feb 12, 2024</span>
              <span className="text-green-500 text-sm">Completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Feb 11, 2024</span>
              <span className="text-muted-foreground text-sm">Missed</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="glass rounded-xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <Award size={18} className="mr-2 text-primary" />
            <h2 className="text-lg font-semibold">Achievements</h2>
          </div>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg transition-all ${achievement.unlocked ? 'bg-secondary' : 'bg-muted/50 opacity-60'}`}
              >
                <div className="font-medium">{achievement.name}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
