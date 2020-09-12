import { useEffect, useState } from 'react';
import { request } from '../utils/request';

export function useFetch({
  url,
  method,
  data,
  headers,
  initialData = null,
  deps = [],
  conditionally = true,
}) {
  const [data, setData] = useState(initialData);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(() => {
        setError(null);
        return true;
      });
      const response = await request({
        url,
        method,
        data,
        headers,
      });
      setLoading(() => {
        setData(response);
        return false;
      });
    } catch (_error) {
      setLoading(() => {
        setError(_error);
        return false;
      });
    }
  };

  useEffect(() => {
    if (conditionally) {
      getData();
    }
  }, deps);

  return [data, isLoading, error, setData];
}
