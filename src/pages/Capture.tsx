
import React from 'react';
import Header from '@/components/Header';
import CameraCapture from '@/components/CameraCapture';

const Capture = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto mb-4">
          <h2 className="text-xl font-semibold mb-2">Today's Challenge</h2>
          <p className="text-muted-foreground mb-2">Find a hidden spot in your city you've never visited before.</p>
          <p className="text-xs text-muted-foreground">If camera access is unavailable, you can still demo the app in showcase mode.</p>
        </div>
        
        <CameraCapture />
      </main>
    </div>
  );
};

export default Capture;
