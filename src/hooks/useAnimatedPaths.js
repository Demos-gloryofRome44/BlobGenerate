import { useMemo } from 'react';

export function useAnimatedPaths(generateBlobPath, { vertices, smoothness, width, height }, frames = 4) {
  return useMemo(() => {
    console.log(`Generating ${frames} animation paths`);
    const paths = [];
    for (let i = 0; i < frames; i++) {
      paths.push(generateBlobPath({
        vertices,
        smoothness: smoothness + Math.sin(i / frames * Math.PI * 2) * 10,
        width,
        height
      }));
    }
    console.log('Generated paths:', paths); 
    return paths;
  }, [vertices, smoothness, width, height, frames, generateBlobPath]);
}
