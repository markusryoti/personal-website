import { useEffect, useState } from "react";

function getWindowDimensions() {
    // make sure your function is being called in client side only
    if (typeof window !== 'undefined') {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    }
    return {
      width: 0,
      height: 0,
    };
  }
  
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}

export default useWindowDimensions;