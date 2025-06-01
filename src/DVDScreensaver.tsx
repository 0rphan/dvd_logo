import React, { useState, useEffect, useRef } from 'react';

const DVDScreensaver = () => {
  const [color, setColor] = useState('#ff6b6b');
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const animationRef = useRef(null);
  
  // Use refs to store current position and velocity to avoid state update issues
  const positionRef = useRef({ x: 50, y: 50 });
  const velocityRef = useRef({ x: 2, y: 1.5 });

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9'
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating || !containerRef.current || !logoRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const containerWidth = container.width;
      const containerHeight = container.height;
      const logoWidth = 150;
      const logoHeight = 150;

      // Skip if container dimensions aren't ready
      if (containerWidth === 0 || containerHeight === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Get current values
      const currentPos = positionRef.current;
      const currentVel = velocityRef.current;

      // Calculate new position
      let newX = currentPos.x + currentVel.x;
      let newY = currentPos.y + currentVel.y;
      let newVelX = currentVel.x;
      let newVelY = currentVel.y;

      // Check horizontal boundaries
      if (newX <= 0) {
        newX = 0;
        newVelX = Math.abs(currentVel.x);
        setColor(getRandomColor());
      } else if (newX >= containerWidth - logoWidth) {
        newX = containerWidth - logoWidth;
        newVelX = -Math.abs(currentVel.x);
        setColor(getRandomColor());
      }

      // Check vertical boundaries
      if (newY <= 0) {
        newY = 0;
        newVelY = Math.abs(currentVel.y);
        setColor(getRandomColor());
      } else if (newY >= containerHeight - logoHeight) {
        newY = containerHeight - logoHeight;
        newVelY = -Math.abs(currentVel.y);
        setColor(getRandomColor());
      }

      // Update refs
      positionRef.current = { x: newX, y: newY };
      velocityRef.current = { x: newVelX, y: newVelY };

      // Update DOM directly for smooth animation
      if (logoRef.current) {
        logoRef.current.style.left = `${newX}px`;
        logoRef.current.style.top = `${newY}px`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay to ensure DOM is ready
    const startAnimation = () => {
      animationRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, 100);

    return () => {
      isAnimating = false;
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const containerStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'wait',
    userSelect: 'none'
  };

  const logoStyle = {
    position: 'absolute',
    left: '50px',
    top: '50px',
    width: '150px',
    height: '150px',
    pointerEvents: 'none',
    transition: 'none'
  };

  const svgStyle = {
    filter: `hue-rotate(${Math.random() * 360}deg) saturate(1.5) brightness(1.2)`,
    dropShadow: '0 10px 8px rgb(0 0 0 / 0.04), 0 4px 3px rgb(0 0 0 / 0.1)'
  };

  const centerTextStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // pointerEvents: 'none',
    textAlign: 'center'
  };

  const comingSoonStyle = {
    color: 'white',
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    opacity: 0.3,
    letterSpacing: '0.1em',
    fontFamily: 'Arial, sans-serif'
  };

  const contactStyle = {
    color: 'white',
    fontSize: '1.25rem',
    opacity: 0.2,
    fontFamily: 'Arial, sans-serif'
  };

  const instructionsStyle = {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    color: 'white',
    fontSize: '0.875rem',
    opacity: 0.6,
    pointerEvents: 'none'
  };

  const footerStyle = {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    color: 'white',
    fontSize: '0.75rem',
    opacity: 0.4,
    pointerEvents: 'none'
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div ref={logoRef} style={logoStyle}>
        <svg
          width="150"
          height="150"
          viewBox="0 0 1080 1080"
          style={svgStyle}
        >
          <polygon 
            points="854.19 211.82 224.07 841.93 224.07 843.67 612.62 843.67 855.93 600.36 855.93 211.82 854.19 211.82"
            fill={color}
          />
          <path 
            d="M219.48,235.96v585.7l287.06-287.06c3.72-3.72,5.87-8.73,6.01-13.99h0c3.89-146.19-107.31-269.86-253.09-281.47l-39.98-3.18Z"
            fill={color}
          />
        </svg>
      </div>
      
      {/* Center text */}
      <div style={centerTextStyle}>
        <h1 style={comingSoonStyle}>
          COMING SOON
        </h1>
        <p style={contactStyle}>
          Contact us at <a href="mailto:Founders@unfold.com">Founders@unfold.com</a>
        </p>
      </div>
    </div>
  );
};

export default DVDScreensaver;