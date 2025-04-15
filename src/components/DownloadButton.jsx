import React from 'react';

const DownloadButton = ({ svgRef }) => {
  const downloadSVG = () => {
    try {
      const svgElement = svgRef.current?.getSvgElement();
      
      if (!svgElement) {
        throw new Error("SVG element not found");
      }

      const clonedSvg = svgElement.cloneNode(true);
      
      clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      clonedSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      
      const serializer = new XMLSerializer();
      let svgStr = serializer.serializeToString(clonedSvg);
      
      if (!svgStr.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgStr = svgStr.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      
      svgStr = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + svgStr;
      
      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `blob-${new Date().toISOString().slice(0, 10)}.svg`;
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
    } catch (error) {
      console.error("SVG Download Error:", error);
      alert("Failed to download SVG. Please try again.");
    }
  };

  return (
    <button 
      className="download-button"
      onClick={downloadSVG}
      aria-label="Download SVG"
    >
      Download SVG
    </button>
  );
};

export default DownloadButton;