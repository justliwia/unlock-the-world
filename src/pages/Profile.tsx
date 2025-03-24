
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Calendar, Award, Image, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import InterestPentagram from '@/components/InterestPentagram';
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [moodboardItems, setMoodboardItems] = useState<any[]>([
    {
      id: '1',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      caption: 'My happy place'
    },
    {
      id: '2',
      type: 'text',
      content: 'Remember that book recommendation from Maya - "The Midnight Library"',
      backgroundColor: 'hsl(var(--coral-red))'
    },
    {
      id: '3',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1547150492-da7ff1742941',
      caption: 'Coffee shop discovery'
    },
    {
      id: '4',
      type: 'text',
      content: 'Next week goal: Find a new hiking trail',
      backgroundColor: 'hsl(var(--teal-green))'
    },
  ]);
  
  useEffect(() => {
    // Load user data from local storage
    const userData = JSON.parse(localStorage.getItem('vibe_user') || '{}');
    
    if (Object.keys(userData).length > 0) {
      setUser({
        ...userData,
        completedChallenges: 14, // Mock data
        streak: 7, // Mock data
      });
    } else {
      // Mock user data if not found in local storage
      setUser({
        id: 'user123',
        name: 'Jamie Smith',
        username: 'jamiesmith',
        avatar: 'https://i.pravatar.cc/150?img=3',
        completedChallenges: 14,
        streak: 7,
        interests: [
          { id: 'reading', name: 'Reading', rating: 4 },
          { id: 'art', name: 'Art', rating: 5 },
          { id: 'exploration', name: 'Exploration', rating: 3 },
          { id: 'photography', name: 'Photography', rating: 2 },
          { id: 'music', name: 'Music', rating: 4 },
        ]
      });
    }
  }, []);
  
  const achievements = [
    { name: "Explorer", description: "Completed 10 challenges", unlocked: true, icon: '🧭' },
    { name: "Social Butterfly", description: "Sent 20 voice reactions", unlocked: true, icon: '🦋' },
    { name: "Early Bird", description: "Completed 5 challenges before noon", unlocked: false, icon: '🐦' },
    { name: "City Expert", description: "Found 15 hidden spots", unlocked: false, icon: '🏙️' },
  ];
  
  const handleAddMoodboardItem = () => {
    // In a real app, this would open a modal to add content
    const randomItem = Math.random() > 0.5 
      ? {
          id: Date.now().toString(),
          type: 'text',
          content: 'New thought added to my mood board!',
          backgroundColor: 'hsl(var(--deep-blue))'
        }
      : {
          id: Date.now().toString(),
          type: 'image',
          content: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62',
          caption: 'New discovery'
        };
        
    setMoodboardItems(prev => [randomItem, ...prev]);
    
    toast({
      title: "Item added!",
      description: "New item added to your mood board.",
    });
  };
  
  const handleDeleteItem = (id: string) => {
    setMoodboardItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "Item removed from your mood board.",
    });
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[hsl(var(--soft-cream))]">
        <div className="w-10 h-10 border-4 border-[hsl(var(--teal-green))] border-t-transparent rounded-full animate-rotate-360" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--soft-cream))]">
      <Header />
      
      <main className="flex-1 p-4 max-w-md mx-auto w-full pb-20">
        <motion.div 
          className="flex flex-col items-center text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="w-24 h-24 mb-4 retro-border">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold text-gradient">{user.name}</h1>
          <p className="text-muted-foreground">@{user.username || 'username'}</p>
          
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
            <Button variant="outline" size="sm" className="border-[hsl(var(--deep-blue))]/30 text-[hsl(var(--deep-blue))]">
              <Settings size={16} className="mr-1" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="border-[hsl(var(--coral-red))]/30 text-[hsl(var(--coral-red))]">
              <LogOut size={16} className="mr-1" />
              Sign Out
            </Button>
          </div>
        </motion.div>
        
        <Tabs defaultValue="moodboard" className="w-full">
          <TabsList className="w-full mb-6 bg-[hsl(var(--deep-blue))]/10 p-1">
            <TabsTrigger 
              value="moodboard" 
              className="text-[hsl(var(--deep-blue))] data-[state=active]:bg-[hsl(var(--deep-blue))] data-[state=active]:text-white rounded-md"
            >
              Mood Board
            </TabsTrigger>
            <TabsTrigger 
              value="interests" 
              className="text-[hsl(var(--deep-blue))] data-[state=active]:bg-[hsl(var(--deep-blue))] data-[state=active]:text-white rounded-md"
            >
              Interests
            </TabsTrigger>
            <TabsTrigger 
              value="achievements" 
              className="text-[hsl(var(--deep-blue))] data-[state=active]:bg-[hsl(var(--deep-blue))] data-[state=active]:text-white rounded-md"
            >
              Achievements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="moodboard" className="focus-visible:outline-none">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Mood Board</h2>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddMoodboardItem}
                className="border-[hsl(var(--teal-green))]/30 text-[hsl(var(--teal-green))]"
              >
                <PlusCircle size={16} className="mr-1" />
                Add Item
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100vh-22rem)]">
              <div className="grid grid-cols-2 gap-4 pb-16">
                {moodboardItems.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`relative rounded-xl overflow-hidden ${
                      item.type === 'text'
                        ? 'p-4 min-h-[120px] flex items-center justify-center'
                        : ''
                    }`}
                    style={{ 
                      backgroundColor: item.type === 'text' ? item.backgroundColor : undefined
                    }}
                  >
                    {item.type === 'image' ? (
                      <>
                        <img 
                          src={item.content} 
                          alt={item.caption || 'Mood board item'} 
                          className="w-full h-48 object-cover"
                        />
                        {item.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                            {item.caption}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-white text-sm text-center font-medium">{item.content}</p>
                    )}
                    
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
                    >
                      <Trash2 size={14} />
                    </button>
                    
                    <button
                      className="absolute top-2 left-2 bg-black/60 text-white p-1 rounded-full"
                    >
                      <Edit size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="interests" className="focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass rounded-xl p-5 mb-6"
            >
              <h2 className="text-lg font-semibold mb-4">Interest Pentagram</h2>
              
              {user.interests && user.interests.length >= 3 ? (
                <div className="flex justify-center py-4">
                  <InterestPentagram interests={user.interests} />
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Not enough interests selected to generate pentagram.</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-4 border-[hsl(var(--teal-green))]/30 text-[hsl(var(--teal-green))]"
                    onClick={() => {/* Navigate to customize page */}}
                  >
                    Add Interests
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="achievements" className="focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex items-center mb-4">
                <Award size={18} className="mr-2 text-[hsl(var(--deep-blue))]" />
                <h2 className="text-lg font-semibold">Achievements</h2>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg transition-all ${
                      achievement.unlocked 
                        ? 'bg-[hsl(var(--teal-green))]/10 border border-[hsl(var(--teal-green))]/30' 
                        : 'bg-muted/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{achievement.icon}</div>
                      <div>
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
