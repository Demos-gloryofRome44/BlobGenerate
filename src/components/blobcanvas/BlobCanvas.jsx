import React, {
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';
import { generateBlobPath } from '../../utils/BlobGenerator';
import { useMorphingPath } from '../../hooks/useMorphingPath';
import { useAnimatedPaths } from '../../hooks/useAnimatedPaths';
import BlobSvgRenderer from './BlobSvgRenderer';

const BlobCanvas = forwardRef((props, ref) => {
  const {
    vertices,
    smoothness,
    color,
    strokeColor,
    strokeWidth = 2,
    width,
    height,
    isAnimated,
    animationFrames
  } = props;

  const svgRef = useRef(null);

  const { currentPath, prevPath, setCurrentPath, setPrevPath } = useMorphingPath(
    () => generateBlobPath({ vertices, smoothness, width, height }),
    [vertices, smoothness, width, height]
  );

  const animatedPaths = useAnimatedPaths(
    generateBlobPath,
    { vertices, smoothness, width, height }, animationFrames
  );

  useImperativeHandle(ref, () => ({
    getSvgElement: () => svgRef.current,
    regenerateBlob: () => {
      setPrevPath(currentPath);
      setCurrentPath(generateBlobPath({ vertices, smoothness, width, height }));
    }
  }));

  return (
    <BlobSvgRenderer
      ref={svgRef}
      path={currentPath}
      prevPath={prevPath}
      animatedPaths={isAnimated ? animatedPaths : []}
      isAnimated={isAnimated}
      color={color}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      width={width}
      height={height}
    />
  );
});

export default BlobCanvas;
