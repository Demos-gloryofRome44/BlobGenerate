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
            min="0"
            max="100"
            value={smoothness}
            onChange={(e) => setSmoothness(parseInt(e.target.value))}
          />
        </label>
      </div>

      <div className="control-group color-control">
        <button onClick={() => setShowColorPicker(!showColorPicker)}>
          Выбрать цвет блоба
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
    </div>
  );
};

export default ControlsPanel;