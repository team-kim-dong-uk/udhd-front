import client from './client';

export const getPhoto = (photoId) => {
    return client.get(`photos/${photoId}`);
}