import client from '../client';

export const getFeeds = () => {
    return client.get(`feeds`);
}