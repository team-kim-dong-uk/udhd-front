import client from '../client';

export const getFeeds = () => {
    return client.get(`feeds/list`);
}
export const getFeedsRelated = ({photoId}) => {
    return client.get(`feeds/related/${photoId}`);
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
export const addComment = ({ feedId, content }) => {
  return client.put(`feeds/${feedId}/comment`, { content });
}

export const deleteComment = ({ feedId, commentId }) => {
  return client.delete(`feeds/${feedId}/comment/${commentId}`);
}
