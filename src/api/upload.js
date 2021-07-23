import client from './client';

export const getPresignedURLs = (checksums) => {
    let url = `upload/presigned-url`;
    return client.post(url, { checksums });
}