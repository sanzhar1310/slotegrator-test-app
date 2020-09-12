import { PING_API_URL } from '../constants/api';
import { request } from './request';

export async function checkAuth(context) {
  try {
    const { success } = await request({
      url: PING_API_URL,
      serverContext: context,
    });
    return success;
  } catch (error) {
    return false;
  }
}
