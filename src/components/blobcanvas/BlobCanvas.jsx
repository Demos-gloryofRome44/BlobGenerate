import React, { 
    useEffect, 
    useRef, 
    useImperativeHandle,
    forwardRef,
    useCallback,
    useState
  } from 'react';
  import { generateBlobPath } from '../../utils/BlobGenerator';
  import BlobSvgRenderer from './BlobSvgRenderer';
  
  const BlobCanvas = forwardRef(({
    vertices,
    smoothness,
    color,
    strokeColor,
    strokeWidth = 2,
    width,
    height,
    isAnimated
  }, ref) => {
    const svgRef = useRef(null);
    const [currentPath, setCurrentPath] = useState(null);
    const animationRef = useRef(null);
  
    const generateBlobShape = useCallback(() => {
      return generateBlobPath({ vertices, smoothness, width, height });
    }, [vertices, smoothness, width, height]);
  
    const updateBlobShape = useCallback(() => {
      const path = generateBlobShape();
      setCurrentPath(path);
    }, [generateBlobShape]);
  
    const updateStyles = useCallback(() => {
      if (!svgRef.current) return;
      const blobPath = svgRef.current.querySelector('#blob-path');
      if (blobPath) {
        blobPath.setAttribute('fill', color);
        blobPath.setAttribute('stroke', strokeColor);
        blobPath.setAttribute('stroke-width', strokeWidth);
      }
    }, [color, strokeColor, strokeWidth]);
  
    useEffect(() => {
      updateBlobShape();
    }, [updateBlobShape]);
  
    useEffect(() => {
      if (!isAnimated) {
        updateBlobShape();
      }
    }, [vertices, smoothness, isAnimated, updateBlobShape]);
  
    useEffect(() => {
      updateStyles();
    }, [updateStyles]);
  
    useEffect(() => {
      if (isAnimated) {
        animationRef.current = setInterval(updateBlobShape, 100);
        return () => clearInterval(animationRef.current);
      }
    }, [isAnimated, updateBlobShape]);
  
    useImperativeHandle(ref, () => ({
      getSvgElement: () => svgRef.current,
      regenerateBlob: updateBlobShape
    }));
  
    return (
      <BlobSvgRenderer
        ref={svgRef}
        path={currentPath}
        color={color}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        width={width}
        height={height}
      />
    );
  });
  
  export default BlobCanvas;