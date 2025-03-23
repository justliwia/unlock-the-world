
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FeedPost from '@/components/FeedPost';
import TimeLimit from '@/components/TimeLimit';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from '@/hooks/use-mobile';

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // 30 minutes in seconds
  const timeLimitInSeconds = 30 * 60;
  
  useEffect(() => {
    // Simulate loading posts
    const timer = setTimeout(() => {
      setPosts([
        {
          id: '1',
          user: {
            id: 'user1',
            name: 'Emma Wilson',
            avatar: 'https://i.pravatar.cc/150?img=1',
          },
          image: 'https://images.unsplash.com/photo-1607560105214-0ddef7080cb0',
          caption: "Found this amazing hidden garden tucked away between buildings. Never knew it existed!",
          location: 'Secret Garden',
          timestamp: new Date(new Date().getTime() - 15 * 60 * 1000), // 15 minutes ago
          likes: 12,
          comments: 4,
          commentsList: [
            {
              id: 'c1',
              user: {
                id: 'user5',
                name: 'Olivia Martinez',
                avatar: 'https://i.pravatar.cc/150?img=5',
              },
              text: "This looks amazing! Where exactly is it?",
              timestamp: new Date(new Date().getTime() - 10 * 60 * 1000),
            },
            {
              id: 'c2',
              user: {
                id: 'user6',
                name: 'Noah Williams',
                avatar: 'https://i.pravatar.cc/150?img=8',
              },
              isVoiceMessage: true,
              voiceDuration: 8,
              timestamp: new Date(new Date().getTime() - 5 * 60 * 1000),
            },
          ],
        },
        {
          id: '2',
          user: {
            id: 'user2',
            name: 'Alex Chen',
            avatar: 'https://i.pravatar.cc/150?img=2',
          },
          image: 'https://images.unsplash.com/photo-1547150492-da7ff1742941',
          caption: "This obscure coffee shop has the best brew in town. Can't believe I've walked past it so many times!",
          location: 'Hidden Brew Cafe',
          timestamp: new Date(new Date().getTime() - 40 * 60 * 1000), // 40 minutes ago
          likes: 24,
          comments: 7,
          commentsList: [
            {
              id: 'c3',
              user: {
                id: 'user7',
                name: 'Ethan Brown',
                avatar: 'https://i.pravatar.cc/150?img=12',
              },
              text: "I walk by there every day! Need to check it out",
              timestamp: new Date(new Date().getTime() - 30 * 60 * 1000),
            },
            {
              id: 'c4',
              user: {
                id: 'user8',
                name: 'Sophia Garcia',
                avatar: 'https://i.pravatar.cc/150?img=9',
              },
              isVoiceMessage: true,
              voiceDuration: 15,
              timestamp: new Date(new Date().getTime() - 20 * 60 * 1000),
            },
            {
              id: 'c5',
              user: {
                id: 'user9',
                name: 'Liam Johnson',
                avatar: 'https://i.pravatar.cc/150?img=11',
              },
              text: "Their cold brew is amazing, definitely try it!",
              timestamp: new Date(new Date().getTime() - 15 * 60 * 1000),
            },
          ],
        },
        {
          id: '3',
          user: {
            id: 'user3',
            name: 'Maya Johnson',
            avatar: 'https://i.pravatar.cc/150?img=5',
          },
          image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62',
          caption: "Stumbled upon this street art in an alley I never explore. Our city has so many hidden gems!",
          location: 'Artist Alley',
          timestamp: new Date(new Date().getTime() - 55 * 60 * 1000), // 55 minutes ago
          likes: 18,
          comments: 3,
          commentsList: [
            {
              id: 'c6',
              user: {
                id: 'user10',
                name: 'Ava Taylor',
                avatar: 'https://i.pravatar.cc/150?img=7',
              },
              text: "This is part of the new urban art initiative! Love seeing these pop up",
              timestamp: new Date(new Date().getTime() - 40 * 60 * 1000),
            },
            {
              id: 'c7',
              user: {
                id: 'user11',
                name: 'Jackson Lee',
                avatar: 'https://i.pravatar.cc/150?img=6',
              },
              isVoiceMessage: true,
              voiceDuration: 10,
              timestamp: new Date(new Date().getTime() - 20 * 60 * 1000),
            },
          ],
        },
      ]);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTimeEnd = () => {
    navigate('/time-up');
  };
  
  const renderContent = () => (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Today's Community Posts</h2>
        <p className="text-sm text-muted-foreground">See how others found hidden spots in their cities</p>
      </div>
      
      <div className="space-y-6 pb-16">
        {posts.map(post => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 pb-20 overflow-hidden">
        {loading ? (
          <div className="h-40 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-rotate-360" />
          </div>
        ) : isMobile ? (
          <ScrollArea className="h-[calc(100vh-8rem)] pr-2">
            {renderContent()}
          </ScrollArea>
        ) : (
          renderContent()
        )}
        
        <TimeLimit timeLeft={timeLimitInSeconds} onTimeEnd={handleTimeEnd} />
      </main>
    </div>
  );
};

export default Feed;
