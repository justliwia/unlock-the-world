
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name) {
        toast({
          variant: "destructive",
          title: "Name required",
          description: "Please enter your name to continue.",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        toast({
          variant: "destructive",
          title: "Valid email required",
          description: "Please enter a valid email address.",
        });
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.password || formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }
    
    // In a real app, we would send the data to an API
    localStorage.setItem('vibe_user', JSON.stringify({ 
      ...formData, 
      id: 'user123', 
      avatar: 'https://i.pravatar.cc/150?img=3' 
    }));
    
    toast({
      title: "Account created!",
      description: "Welcome to Vibe. Let's customize your experience.",
    });
    
    navigate('/customize');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">What's your name?</h2>
              <p className="text-sm text-muted-foreground mt-1">We'll use this for your profile</p>
            </div>
            
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                className="pl-10 py-6"
              />
            </div>
            
            <Button 
              onClick={handleNext}
              className="w-full btn-primary"
            >
              Continue
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">What's your email?</h2>
              <p className="text-sm text-muted-foreground mt-1">We'll use this to sign you in</p>
            </div>
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 py-6"
              />
            </div>
            
            <Button 
              onClick={handleNext}
              className="w-full btn-primary"
            >
              Continue
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Create a password</h2>
              <p className="text-sm text-muted-foreground mt-1">Make it secure and memorable</p>
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 py-6"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <Button 
              onClick={handleSubmit}
              className="w-full btn-primary"
            >
              Create Account
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[hsl(var(--soft-cream))]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gradient mb-2">Vibe</h1>
          <p className="text-muted-foreground">Your social journal for meaningful connections</p>
        </div>
        
        <div className="glass rounded-2xl p-6 mb-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 w-10 rounded-full ${
                    i <= step ? 'bg-[hsl(var(--teal-green))]' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Step {step} of 3</div>
          </div>
          
          <form onSubmit={(e) => e.preventDefault()}>
            {renderStep()}
          </form>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="text-[hsl(var(--deep-blue))] hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
