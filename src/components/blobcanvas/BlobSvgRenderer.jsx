import React, { useEffect, useRef, useCallback } from 'react';

const BlobSvgRenderer = React.forwardRef(({ 
  path, 
  color, 
  strokeColor, 
  strokeWidth,
  width,
  height
}, ref) => {
  const pathRef = useRef(null);
  const prevPath = useRef(path);
  const prevColor = useRef(color);
  const animationQueue = useRef([]);

  const cleanupAnimations = useCallback(() => {
    if (pathRef.current) {
      const existingAnimations = pathRef.current.querySelectorAll('animate');
      existingAnimations.forEach(anim => anim.remove());
    }
    animationQueue.current = [];
  }, []);

  const animatePath = useCallback((newPath) => {
    cleanupAnimations();
    
    const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate.setAttribute("attributeName", "d");
    animate.setAttribute("values", `${prevPath.current};${newPath}`);
    animate.setAttribute("dur", "0.8s");
    animate.setAttribute("fill", "freeze");
    animate.setAttribute("calcMode", "spline");
    animate.setAttribute("keySplines", "0.25 0.1 0.25 1");
    
    const onFinish = () => {
      pathRef.current?.removeChild(animate);
      animationQueue.current = animationQueue.current.filter(a => a !== animate);
    };
    
    animate.addEventListener('endEvent', onFinish);
    pathRef.current?.appendChild(animate);
    animate.beginElement();
    animationQueue.current.push(animate);
    
    prevPath.current = newPath;
  }, [cleanupAnimations]);

  const animateColor = useCallback((newColor) => {
    const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate.setAttribute("attributeName", "fill");
    animate.setAttribute("values", `${prevColor.current};${newColor}`);
    animate.setAttribute("dur", "0.6s");
    animate.setAttribute("fill", "freeze");
    
    const onFinish = () => {
      pathRef.current?.removeChild(animate);
      animationQueue.current = animationQueue.current.filter(a => a !== animate);
    };
    
    animate.addEventListener('endEvent', onFinish);
    pathRef.current?.appendChild(animate);
    animate.beginElement();
    animationQueue.current.push(animate);
    
    prevColor.current = newColor;
  }, []);

  useEffect(() => {
    if (pathRef.current && path !== prevPath.current) {
      requestAnimationFrame(() => animatePath(path));
    }
  }, [path, animatePath]); 

  useEffect(() => {
    if (pathRef.current && color !== prevColor.current) {
      requestAnimationFrame(() => animateColor(color));
    }
  }, [color, animateColor]); 

  return (
    <svg 
      ref={ref}
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: 'geometricPrecision' }}
    >
      {path && (
        <path
          id="blob-path"
          ref={pathRef}
          d={path}
          fill={color}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
});

export default BlobSvgRenderer;