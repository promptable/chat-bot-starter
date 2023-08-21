// src/components/ui/Stopwatch/Stopwatch.tsx

import { useEffect, useState } from 'react';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      Seconds: {seconds}
    </div>
  );
};

export default Stopwatch;
