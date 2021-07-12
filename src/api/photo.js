import client from './client';

export const getPhoto = (photoId) => {
    return client.get(`users/123/album/${photoId}`);
}