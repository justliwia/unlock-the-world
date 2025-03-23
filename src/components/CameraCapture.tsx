
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { CameraIcon, XIcon, CheckIcon, RefreshCwIcon } from 'lucide-react';

const CameraCapture: React.FC = () => {
  const [cameraReady, setCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraReady(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };
    
    setupCamera();
    
    return () => {
      // Cleanup camera stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);
      }
    }
  };
  
  const retakePhoto = () => {
    setCapturedImage(null);
  };
  
  const submitChallenge = async () => {
    if (!capturedImage) return;
    
    setIsSubmitting(true);
    
    try {
      // Here we would normally send the image to a server
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Navigate to success screen
      navigate('/challenge-complete');
    } catch (error) {
      console.error('Error submitting challenge:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div
      className="flex flex-col items-center relative h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-[70vh] overflow-hidden rounded-xl mb-4">
        {!capturedImage ? (
          <>
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              className={`w-full h-full object-cover ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
              onCanPlay={() => setCameraReady(true)}
            />
            {!cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-rotate-360">
                  <RefreshCwIcon size={32} className="text-primary" />
                </div>
              </div>
            )}
          </>
        ) : (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="w-full h-full object-cover"
          />
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      <motion.div 
        className="fixed bottom-8 left-0 right-0 flex justify-center items-center space-x-4 px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {!capturedImage ? (
          <Button 
            onClick={capturePhoto}
            className="w-16 h-16 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-lg"
            disabled={!cameraReady}
          >
            <CameraIcon size={24} className="text-primary" />
          </Button>
        ) : (
          <>
            <Button 
              onClick={retakePhoto}
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
                <div className="animate-rotate-360">
                  <RefreshCwIcon size={20} className="text-white" />
                </div>
              ) : (
                <CheckIcon size={24} className="text-white" />
              )}
            </Button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CameraCapture;
