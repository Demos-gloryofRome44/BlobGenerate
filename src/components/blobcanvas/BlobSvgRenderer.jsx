import React from 'react';

const BlobSvgRenderer = React.forwardRef(({ 
  path, 
  color, 
  strokeColor, 
  strokeWidth,
  width,
  height
}, ref) => (
  <svg 
    ref={ref}
    width={width} 
    height={height} 
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {path && (
      <path
        id="blob-path"
        d={path}
        fill={color}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    )}
  </svg>
));

export default BlobSvgRenderer;