import client from '../client';

export const getFeeds = () => {
    return client.get(`feeds`);
}
export const getFeedsByType = ({type, userId, count, page}) => {
    let query = `users/${userId}/${type}?`
    query = createFeedsQuery({query, count, page})
    return client.get(query);
}

const createFeedsQuery = ({query, count, page}) => {
    if (count) query += `count=${count}&`
    if (page) query += `page=${page}&`
    return query
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
