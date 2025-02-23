import { useEffect, useState } from 'react';
import { QueueDisplay as Queue } from '../components/queue/QueueDisplay';

export const QueueDisplay = () => {
  const [, setRefreshKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(key => key + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6">
        <Queue />
      </div>
    </div>
  );
};