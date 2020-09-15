import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetch } from './useFetch';

export const useReduxFetch = ({ dispatch, action, selector, url, method = 'GET' }) => {
  const selectedData = useSelector(selector);
  const [data, loading, error] = useFetch({
    url,
    method,
  });

  useEffect(() => {
    if (data && !loading && !error) {
      dispatch(action(data));
    }
  }, [data]);

  return [selectedData, loading, error];
};
