
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Mic, Heart, MessageCircle } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: '1',
      type: 'voice',
      user: {
        name: 'Alex Chen',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      message: 'sent you a voice reaction to your challenge',
      time: '10m ago',
      read: false,
    },
    {
      id: '2',
      type: 'like',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      message: 'liked your challenge completion',
      time: '1h ago',
      read: false,
    },
    {
      id: '3',
      type: 'challenge',
      user: {
        name: 'Unlock The World',
        avatar: '',
      },
      message: 'New challenge available: "Find a hidden spot in your city"',
      time: '6h ago',
      read: true,
    },
    {
      id: '4',
      type: 'comment',
      user: {
        name: 'Maya Johnson',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      message: 'suggested meeting up at the spot you discovered',
      time: '1d ago',
      read: true,
    },
  ];
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'voice':
        return <Mic size={16} className="text-purple-500" />;
      case 'like':
        return <Heart size={16} className="text-red-500" />;
      case 'comment':
        return <MessageCircle size={16} className="text-blue-500" />;
      case 'challenge':
        return <Bell size={16} className="text-primary" />;
      default:
        return <Bell size={16} className="text-primary" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your community</p>
        </motion.div>
        
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              className={`flex items-center p-4 rounded-xl ${notification.read ? 'glass-dark opacity-80' : 'glass'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              {notification.type === 'challenge' ? (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
              ) : (
                <Avatar className="mr-3">
                  <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                  <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium">{notification.user.name}</span>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-primary ml-2"></span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              
              <div className="ml-2">
                {getNotificationIcon(notification.type)}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
