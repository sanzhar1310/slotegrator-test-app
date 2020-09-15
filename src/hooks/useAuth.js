import { useEffect, useState } from 'react';

export const useAuth = () => {
  const auth = localStorage.getItem('auth');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [auth]);
  // some api request
  return [!!auth, loading];
};
