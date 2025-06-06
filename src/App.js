import React, { useState, useRef, useMemo, useEffect } from 'react';
import BlobCanvas from './components/blobcanvas/BlobCanvas';
import ControlsPanel from './components/ControlsPanel';
import DownloadButton from './components/DownloadButton';
import './styles/App.css';
import { shadeColor } from './utils/ColorUtils';

function App() {
  const [color, setColor] = useState('#544F5E');
  const strokeColor = useMemo(() => {
    try {
      return shadeColor(color, -20);
    } catch (e) {
      console.error('Error shading color:', e);
      return '#000000'; 
    }
  }, [color]);

  const [vertices, setVertices] = useState(8);
  const [smoothness, setSmoothness] = useState(70);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isAnimated, setIsAnimated] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const regenerateBlob = () => {
    if (svgRef.current && svgRef.current.regenerateBlob) {
      svgRef.current.regenerateBlob();
    }
  };
  
  const svgRef = useRef(null);
  const canvasSize = 400;

  useEffect(() => {
    console.log('SVG Ref:', svgRef.current);
  }, []);

  return (
    <div className="app">
    <h1>Blob Generator</h1>
    
    <div className="blob-container">
      <BlobCanvas
        ref={svgRef}
        vertices={vertices}
        smoothness={smoothness}
        color={color}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        width={canvasSize}
        height={canvasSize}
        isAnimated={isAnimated}
      />
    </div>
    
    <ControlsPanel
      vertices={vertices}
      setVertices={setVertices}
      smoothness={smoothness}
      setSmoothness={setSmoothness}
      color={color}
      setColor={setColor}
      strokeWidth={strokeWidth}
      setStrokeWidth={setStrokeWidth}
      isAnimated={isAnimated}
      setIsAnimated={setIsAnimated}
      showColorPicker={showColorPicker}
      setShowColorPicker={setShowColorPicker}
      regenerateBlob={regenerateBlob}
    />
    
    <DownloadButton svgRef={svgRef} />
  </div>
  );
}

export default App;