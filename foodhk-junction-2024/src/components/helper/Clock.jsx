import  { useEffect, useState } from 'react';

function RealTimeClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="flex items-center justify-center  ">
      <div className="text-4xl font-bold text-[#94A3B8]">
        {formattedTime}
      </div>
    </div>
  );
}

export default RealTimeClock;
