
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, Heart, MessageCircle, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedPostProps {
  post: {
    id: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    image: string;
    caption: string;
    location?: string;
    timestamp: Date;
    likes: number;
    comments: number;
    hasLiked?: boolean;
  };
}

const FeedPost: React.FC<FeedPostProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.hasLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isRecording, setIsRecording] = useState(false);
  
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };
  
  const handleVoiceComment = () => {
    setIsRecording(!isRecording);
    // In a full implementation, we'd start/stop recording here
  };
  
  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };
  
  return (
    <motion.div 
      className="glass rounded-xl overflow-hidden mb-6 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.user.name}</div>
            <div className="text-xs text-muted-foreground flex items-center">
              {post.location && (
                <>
                  <MapPin size={12} className="mr-1" />
                  <span className="mr-2">{post.location}</span>
                </>
              )}
              <span>{getTimeAgo(post.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <img 
          src={post.image} 
          alt="Post" 
          className="w-full aspect-square object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="flex items-center space-x-1"
            >
              <Heart 
                size={20} 
                className={cn(
                  liked ? 'fill-red-500 text-red-500' : 'text-foreground',
                  "transition-colors duration-300"
                )} 
              />
              <span className="text-sm">{likeCount}</span>
            </motion.button>
            
            <button className="flex items-center space-x-1">
              <MessageCircle size={20} />
              <span className="text-sm">{post.comments}</span>
            </button>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleVoiceComment}
            className={cn(
              "p-2 rounded-full transition-colors duration-300",
              isRecording ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"
            )}
          >
            <Mic size={18} />
          </motion.button>
        </div>
        
        <p className="text-sm">
          <span className="font-medium">{post.user.name}</span>{' '}
          {post.caption}
        </p>
      </div>
    </motion.div>
  );
};

export default FeedPost;
