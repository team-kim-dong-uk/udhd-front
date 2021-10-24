import client from '../client';

export const getFeeds = () => {
    return client.get(`feeds`);
}

export const addComment = ({ feedId, content }) => {
  return client.put(`feeds/${feedId}/comment`, { content });
}

export const deleteComment = ({ feedId }) => {
  return client.delete(`feeds/${feedId}/comment`);
}