import Axios from 'axios';

export async function request({ url, method = 'GET', body, headers, handleSuccess, handleError }) {
  return Axios(url, {
    method,
    headers,
    data: body,
  })
    .then((response) => (handleSuccess ? handleSuccess(response.data) : response.data))
    .catch((error) => (handleError ? handleError(error) : Promise.reject(error)));
}
