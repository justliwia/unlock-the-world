
import React, { useEffect, useRef } from 'react';

interface Interest {
  id: string;
  name: string;
  rating: number;
}

interface InterestPentagramProps {
  interests: Interest[];
}

const InterestPentagram: React.FC<InterestPentagramProps> = ({ interests }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Ensure we have at least 5 interests, padding with defaults if needed
  const normalizedInterests = () => {
    const result = [...interests];
    while (result.length < 5) {
      result.push({ id: `placeholder-${result.length}`, name: 'Interest', rating: 0 });
    }
    // Only use the first 5 if there are more
    return result.slice(0, 5);
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const size = Math.min(300, window.innerWidth - 40);
    canvas.width = size;
    canvas.height = size;
    
    // Define colors
    const bgColor = '#F4F1E4';
    const lineColor = '#555EAD';
    const accentColor = '#57AF98';
    const fillColor = 'rgba(87, 175, 152, 0.2)';
    const textColor = '#333';
    
    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    
    // Calculate center and radius
    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = (size / 2) * 0.8;
    
    // Draw background pentagon
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    
    // Draw the pentagon levels (1-5)
    for (let level = 1; level <= 5; level++) {
      const radius = (maxRadius / 5) * level;
      ctx.beginPath();
      
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.stroke();
      
      // Add level numbers
      if (level === 1 || level === 3 || level === 5) {
        ctx.fillStyle = '#999';
        ctx.font = '10px sans-serif';
        ctx.fillText(level.toString(), centerX + 5, centerY - radius + 12);
      }
    }
    
    // Draw lines from center to each point
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const x = centerX + maxRadius * Math.cos(angle);
      const y = centerY + maxRadius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Add interest labels
      const labelRadius = maxRadius + 20;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);
      
      ctx.fillStyle = textColor;
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Adjust text position based on angle
      let interestText = normalizedInterests()[i].name;
      // Limit text length
      if (interestText.length > 10) {
        interestText = interestText.substring(0, 8) + '...';
      }
      
      ctx.fillText(interestText, labelX, labelY);
    }
    
    // Draw user's interest levels
    ctx.beginPath();
    const userInterests = normalizedInterests();
    
    for (let i = 0; i < 5; i++) {
      const rating = userInterests[i].rating;
      const radius = (maxRadius / 5) * rating;
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw points at each interest level
    for (let i = 0; i < 5; i++) {
      const rating = userInterests[i].rating;
      const radius = (maxRadius / 5) * rating;
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = accentColor;
      ctx.fill();
    }
    
  }, [interests]);
  
  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        className="mx-auto retro-border p-1"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default InterestPentagram;
