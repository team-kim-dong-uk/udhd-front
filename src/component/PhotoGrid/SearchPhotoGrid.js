import React from 'react';
import styled from 'styled-components';
import Thumbnail from './Thumbnail.js/index.js';

export default function SearchPhotoGrid({ data }) {
  return (
      <S.SearchPhotoGrid>
          {data?.map(photo => (
              <Thumbnail
              key={photo.photoId}
              photoId={photo.photoId}
              thumbnailLink={photo.thumbnailLink}
              moveTo={`/search/related/${photo.photoId}`}
              />
          ))}
          {/* {!photos.isEnd && <div ref={ref}>로딩중...</div>} */}
      </S.SearchPhotoGrid>
  );
}

SearchPhotoGrid.propTypes = {
};

const S = {};

S.SearchPhotoGrid = styled.div`
  width: 100%;
`;
