import client from './client';

export const refreshToken = () => {
    const token = window.localStorage.getItem('refreshToken');
    return client.post('/auth/refresh-token', {refreshToken: token});
}