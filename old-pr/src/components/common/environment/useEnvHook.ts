import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { connectionState } from '../../../stores/ConnectionStore';

export default function useEnvHook() {
  const [isOnline, setIsOnline] = useRecoilState(connectionState);
  useEffect(() => {
  // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);
  return { isOnline };
}
