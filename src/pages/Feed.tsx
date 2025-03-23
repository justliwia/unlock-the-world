
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FeedPost from '@/components/FeedPost';
import TimeLimit from '@/components/TimeLimit';

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
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
          caption: 'Found this amazing hidden garden tucked away between buildings. Never knew it existed!',
          location: 'Secret Garden',
          timestamp: new Date(new Date().getTime() - 15 * 60 * 1000), // 15 minutes ago
          likes: 12,
          comments: 4,
        },
        {
          id: '2',
          user: {
            id: 'user2',
            name: 'Alex Chen',
            avatar: 'https://i.pravatar.cc/150?img=2',
          },
          image: 'https://images.unsplash.com/photo-1547150492-da7ff1742941',
          caption: 'This obscure coffee shop has the best brew in town. Can't believe I've walked past it so many times!',
          location: 'Hidden Brew Cafe',
          timestamp: new Date(new Date().getTime() - 40 * 60 * 1000), // 40 minutes ago
          likes: 24,
          comments: 7,
        },
        {
          id: '3',
          user: {
            id: 'user3',
            name: 'Maya Johnson',
            avatar: 'https://i.pravatar.cc/150?img=5',
          },
          image: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62',
          caption: 'Stumbled upon this street art in an alley I never explore. Our city has so many hidden gems!',
          location: 'Artist Alley',
          timestamp: new Date(new Date().getTime() - 55 * 60 * 1000), // 55 minutes ago
          likes: 18,
          comments: 3,
        },
      ]);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTimeEnd = () => {
    navigate('/time-up');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 pb-20">
        {loading ? (
          <div className="h-40 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-rotate-360" />
          </div>
        ) : (
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
        )}
        
        <TimeLimit timeLeft={timeLimitInSeconds} onTimeEnd={handleTimeEnd} />
      </main>
    </div>
  );
};

export default Feed;
