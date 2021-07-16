import client from './client';

export const getPhoto = (photoId) => {
    return client.get(`photos/${photoId}`);
}

export const getPhotos = (userId, tags) => {
    return client.get(`users/${userId}/search?tags=오마이걸`);
}