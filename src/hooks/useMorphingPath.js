import { useState, useEffect } from 'react';
export function useMorphingPath(generateBlobShape, deps) {
  const [currentPath, setCurrentPath] = useState(null);
  const [prevPath, setPrevPath] = useState(null);

  useEffect(() => {
    setPrevPath(currentPath);
    setCurrentPath(generateBlobShape());
    // eslint-disable-next-line
  }, deps);

  return { currentPath, prevPath, setCurrentPath, setPrevPath };
}