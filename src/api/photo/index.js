import client from '../client';

export const getRandomPhotos = () => {
    return client.get(`photos/random`);
}

