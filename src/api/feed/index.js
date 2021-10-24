import client from '../client';

export const getFeeds = () => {
    return client.get(`feeds`);
}

export const addFeedList = ({feedId}) => {
    return client.put(`feeds/${feedId}/like`)
}

export const deleteFeedList = ({feedId}) => {
    return client.delete(`feeds/${feedId}/like`)
}
