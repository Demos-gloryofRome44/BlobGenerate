import React from 'react';
import { HexColorPicker } from 'react-colorful';

const ControlsPanel = ({
  vertices,
  setVertices,
  smoothness,
  setSmoothness,
  color,
  setColor,
  isAnimated,
  setIsAnimated,
  showColorPicker,
  setShowColorPicker,
  regenerateBlob,
  animationFrames,
  setAnimationFrames
}) => {
  return (
    <div className="controls-panel">
      <div className="control-group">
        <label>
          Vertices: {vertices}
          <input
            type="range"
            min="3"
            max="15"
            value={vertices}
            onChange={(e) => setVertices(parseInt(e.target.value))}
          />
        </label>
      </div>
      
      <div className="control-group">
        <label>
          Shape: {smoothness < 30 ? 'Circle' : smoothness < 70 ? 'Smooth' : 'Spiky'}
          <input
            type="range"
            min="15"
            max="100"
            value={smoothness}
            onChange={(e) => setSmoothness(parseInt(e.target.value))}
          />
        </label>
      </div>

      <div className="control-group color-control">
        <button onClick={() => setShowColorPicker(!showColorPicker)}>
        Choose the blob color
        </button>
        {showColorPicker && (
          <div className="color-picker">
            <HexColorPicker 
              color={color} 
              onChange={setColor} 
            />
            <div className="color-preview" style={{ backgroundColor: color }} />
          </div>
        )}
      </div>
      
      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={isAnimated}
            onChange={(e) => setIsAnimated(e.target.checked)}
          />
          Animate Blob
        </label>
      </div>

      <div className="control-group regenerate-group">
        <button className="regenerate-button" onClick={regenerateBlob}>
          Regenerate Blob
        </button>
      </div>

      <div className="control-group">
        <label>
          Animation Frames: {animationFrames}
          <input
            type="range"
            min="3"
            max="20"
            value={animationFrames}
            onChange={(e) => setAnimationFrames(parseInt(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default ControlsPanel;