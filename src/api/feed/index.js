import client from '../client';

export const getFeeds = () => {
    return client.get(`feeds`);
}

export const addFeedLike = ({feedId}) => {
    return client.put(`feeds/${feedId}/like`)
}
export const deleteFeedLike = ({feedId}) => {
    return client.delete(`feeds/${feedId}/like`)
}

export const saveFeed = ({feedId}) => {
    return client.put(`feeds/${feedId}/save`)
}
export const unsaveFeed = ({feedId}) => {
    return client.delete(`feeds/${feedId}/save`)
}
