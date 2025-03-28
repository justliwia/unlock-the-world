
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScrollableContentProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

const ScrollableContent = ({
  children,
  className = "",
  maxHeight = "calc(100vh - 80px)",
}: ScrollableContentProps) => {
  return (
    <div style={{ maxHeight, overflow: 'hidden' }} className={`w-full ${className}`}>
      <ScrollArea className="h-full w-full">
        {children}
      </ScrollArea>
    </div>
  );
};

export default ScrollableContent;
