
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { CameraIcon, XIcon, CheckIcon, ImageIcon, PenIcon } from 'lucide-react';
import { toast } from "sonner";

const CameraCapture: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [textInput, setTextInput] = useState("");
  const navigate = useNavigate();
  
  // Get current challenge
  const currentChallenge = JSON.parse(localStorage.getItem('vibe_current_challenge') || '{}');
  const isPhotoChallenge = currentChallenge.type === 'photo';
  
  const selectMockImage = () => {
    // Use placeholder images for mock capture
    const mockImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f',
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad',
      'https://images.unsplash.com/photo-1507608616040-a5cc07d189b9',
    ];
    const randomIndex = Math.floor(Math.random() * mockImages.length);
    setCapturedImage(mockImages[randomIndex]);
    toast.success("Photo added to your journal!");
  };
  
  const resetCapture = () => {
    setCapturedImage(null);
    setTextInput("");
  };
  
  const submitChallenge = async () => {
    if ((!capturedImage && isPhotoChallenge) || (!textInput && !isPhotoChallenge)) return;
    
    setIsSubmitting(true);
    
    try {
      // Here we would normally send the data to a server
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Mark the challenge as completed in localStorage
      localStorage.setItem('vibe_current_challenge', JSON.stringify({
        ...currentChallenge,
        completed: true,
        completedAt: new Date().toISOString()
      }));
      
      // Navigate to success screen
      navigate('/challenge-complete');
    } catch (error) {
      console.error('Error submitting challenge:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderPhotoChallenge = () => (
    <>
      <div className="relative w-full h-[70vh] overflow-hidden rounded-xl mb-4">
        {!capturedImage ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
            <div className="text-center p-4">
              <ImageIcon size={64} className="mx-auto mb-4 text-gray-400" />
              <p className="text-muted-foreground mb-1">Demo Mode</p>
              <p className="text-xs text-muted-foreground mb-4">Select an image from our library</p>
              <Button 
                onClick={selectMockImage}
                className="bg-primary text-white"
              >
                Choose Image
              </Button>
            </div>
          </div>
        ) : (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <motion.div 
        className="fixed bottom-8 left-0 right-0 flex justify-center items-center space-x-4 px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {!capturedImage ? (
          <Button 
            onClick={selectMockImage}
            className="w-16 h-16 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-lg"
          >
            <CameraIcon size={24} className="text-primary" />
          </Button>
        ) : (
          <>
            <Button 
              onClick={resetCapture}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full"
            >
              <XIcon size={20} />
            </Button>
            
            <Button 
              onClick={submitChallenge}
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <CheckIcon size={24} className="text-white" />
              )}
            </Button>
          </>
        )}
      </motion.div>
    </>
  );
  
  const renderTextChallenge = () => (
    <>
      <div className="w-full overflow-hidden rounded-xl mb-4">
        <textarea 
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Write your thoughts about this challenge..."
          className="w-full min-h-[250px] p-4 rounded-xl border border-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>
      
      <motion.div 
        className="fixed bottom-8 left-0 right-0 flex justify-center items-center space-x-4 px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {textInput ? (
          <>
            <Button 
              onClick={resetCapture}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full"
            >
              <XIcon size={20} />
            </Button>
            
            <Button 
              onClick={submitChallenge}
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg"
              disabled={isSubmitting || textInput.trim() === ""}
            >
              {isSubmitting ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <CheckIcon size={24} className="text-white" />
              )}
            </Button>
          </>
        ) : (
          <Button 
            className="w-16 h-16 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-lg"
            disabled={true}
          >
            <PenIcon size={24} className="text-primary" />
          </Button>
        )}
      </motion.div>
    </>
  );
  
  return (
    <motion.div
      className="flex flex-col items-center relative h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isPhotoChallenge ? renderPhotoChallenge() : renderTextChallenge()}
    </motion.div>
  );
};

export default CameraCapture;
