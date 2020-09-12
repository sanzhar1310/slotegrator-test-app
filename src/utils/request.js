import Axios from 'axios';
import { parseCookies } from 'nookies';

const getRequestOptions = ({ method = 'GET', data = null, extraHeaders = {}, serverContext }) => {
  const baseHeaders = { 'Content-Type': 'application/json' };
  const reqCookies = isServer ? serverContext : null;
  const token = parseCookies(reqCookies)[COOKIE_KEYS.TOKEN];

  const headers = {
    ...baseHeaders,
    authorization: `Bearer ${token}`,
    ...extraHeaders,
  };

  return {
    method,
    headers,
    data: data && JSON.stringify(data),
  };
};

export async function request({ url, method, data, headers, handleSuccess, handleError }) {
  return Axios(url, getRequestOptions({ method, data, headers }))
    .then((response) => (handleSuccess ? handleSuccess(response.data) : response.data))
    .catch((error) => (handleError ? handleError(error) : Promise.reject(error)));
}
