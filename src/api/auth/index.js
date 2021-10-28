import client from '../client';

export const refreshToken = () => {
    const token = window.localStorage.getItem('refreshToken');
    if (!token) {
        throw {
            response: {
                status: 401
            }
        }
    }
    return client.post('/auth/refresh-token', {refreshToken: token});
}
