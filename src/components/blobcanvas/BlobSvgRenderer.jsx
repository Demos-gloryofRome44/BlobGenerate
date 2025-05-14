import React, { forwardRef, useRef, useEffect } from 'react';

const BlobSvgRenderer = forwardRef(({
  path,
  prevPath,
  isAnimated,
  animatedPaths = [],
  color,
  strokeColor,
  strokeWidth,
  width,
  height,
  animationDuration = 10
}, ref) => {
  const pathRef = useRef(null);

  // Анимация между двумя состояниями (при изменении параметров)
  useEffect(() => {
    if (!isAnimated && prevPath && path && prevPath !== path && pathRef.current) {
      pathRef.current.querySelectorAll('animate').forEach(a => a.remove());

      const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animate.setAttribute("attributeName", "d");
      animate.setAttribute("values", `${prevPath};${path}`);
      animate.setAttribute("dur", "0.6s");
      animate.setAttribute("fill", "freeze");

      animate.addEventListener('endEvent', () => {
        if (pathRef.current) {
          pathRef.current.setAttribute('d', path);
          animate.remove();
        }
      });

      pathRef.current.appendChild(animate);
      animate.beginElement();
    }
  }, [path, prevPath, isAnimated]);

  const animateValues = animatedPaths.length > 1
    ? animatedPaths.concat([animatedPaths[0]]).join(';')
    : '';

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: 'geometricPrecision' }}
    >
      {isAnimated && animatedPaths.length > 1 ? (
        <path
          id="blob-path"
          ref={pathRef}
          d={animatedPaths[0]}
          fill={color}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            dur={`${animationDuration}s`}
            repeatCount="indefinite"
            values={animateValues}
          />
        </path>
      ) : (
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
