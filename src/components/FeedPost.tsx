
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, Heart, MessageCircle, MapPin, Send, X, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  text?: string;
  isVoiceMessage?: boolean;
  voiceDuration?: number;
  timestamp: Date;
}

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
    commentsList?: Comment[];
  };
}

const FeedPost: React.FC<FeedPostProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.hasLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isRecording, setIsRecording] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  
  // Sample comments data if not provided in the post
  const comments = post.commentsList || [
    {
      id: 'c1',
      user: {
        id: 'user4',
        name: 'Jordan Smith',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      text: "I've been there! Hidden gem indeed!",
      timestamp: new Date(new Date().getTime() - 10 * 60 * 1000), // 10 minutes ago
    },
    {
      id: 'c2',
      user: {
        id: 'user5',
        name: 'Taylor Reed',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      isVoiceMessage: true,
      voiceDuration: 12, // 12 seconds
      timestamp: new Date(new Date().getTime() - 25 * 60 * 1000), // 25 minutes ago
    },
  ];
  
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
  
  const togglePlayVoice = (commentId: string) => {
    if (isPlaying === commentId) {
      setIsPlaying(null);
    } else {
      setIsPlaying(commentId);
    }
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
  
  const handleSendComment = () => {
    if (commentText.trim() !== "") {
      // In a real app, we would send the comment to the server
      alert("Comment would be sent: " + commentText);
      setCommentText("");
    }
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
            
            <button 
              className="flex items-center space-x-1"
              onClick={() => setShowComments(!showComments)}
            >
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
        
        {showComments && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Comments</h4>
            
            <ScrollArea className="max-h-[200px] pr-4">
              <div className="space-y-3">
                {comments.map(comment => (
                  <div key={comment.id} className="flex items-start space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-xs font-medium">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {getTimeAgo(comment.timestamp)}
                        </span>
                      </div>
                      
                      {comment.isVoiceMessage ? (
                        <div className="bg-muted mt-1 p-2 rounded-lg flex items-center space-x-2">
                          <button 
                            onClick={() => togglePlayVoice(comment.id)}
                            className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white"
                          >
                            {isPlaying === comment.id ? <Pause size={14} /> : <Play size={14} />}
                          </button>
                          
                          <div className="flex-1 space-y-1">
                            <div className="h-2 bg-primary/20 rounded-full">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: isPlaying === comment.id ? '70%' : '0%', transition: 'width 0.1s linear' }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{comment.voiceDuration}s</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm mt-1 bg-muted p-2 rounded-lg inline-block">
                          {comment.text}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="mt-3 flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full text-sm bg-muted px-3 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                {isRecording && (
                  <div className="absolute inset-0 flex items-center justify-between bg-red-500 rounded-full px-3">
                    <span className="text-white text-sm animate-pulse">Recording...</span>
                    <button 
                      onClick={handleVoiceComment}
                      className="text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleSendComment}
                className="p-2 bg-primary text-white rounded-full"
                disabled={commentText.trim() === ""}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FeedPost;
