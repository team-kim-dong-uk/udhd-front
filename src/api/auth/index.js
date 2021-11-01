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

export const setNickname = async ({userId, nickname}) => {
  return client.put(`/users/${userId}/nickname`, {nickname});
}

export const getUser = ({userId}) => {
    return client.get(`/users/${userId}`);
}

export const updateUser = async ({userId, nickname, group}) => {
    const data = {
        nickname: nickname,
        group: group
    }
    return client.patch(`/users/${userId}`, data);
}
