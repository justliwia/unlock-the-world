
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
    <ScrollArea className={`w-full ${className}`} style={{ maxHeight }}>
      {children}
    </ScrollArea>
  );
};

export default ScrollableContent;
