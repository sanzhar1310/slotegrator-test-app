import { useCallback, useState } from 'react';
import { request } from '../utils/request';

export const useLogin = (username, password) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const submit = useCallback(() => {
    setLoading(true);
    return request({
      url: 'http://localhost:3000/api/login',
      method: 'POST',
      body: { username, password },
    })
      .then((res) => {
        const { token } = res;
        localStorage.setItem('auth', token);
        setLoading(false);
        setSuccess(true);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [username, password]);

  const reset = () => {
    setSuccess(false);
    setLoading(false);
    setError(false);
  };
  return [success, loading, error, submit, reset];
};
