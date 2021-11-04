import client from '../client';

export const getRandomPhotos = () => {
    return client.get(`photos/random`);
}

export const getFeedsTagged = ({tags, page}) => {
    if (page === null || page === undefined)
        page = 0;
    return client.get(`photos/tags?tags=${tags}&page=${page}`);
}


