import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import Tag from "./Tag";


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : []
* }
* */
export default function Tags({data, style, activeTags}) {
  let inAlbum = true;

  if (!activeTags)
      activeTags = []
  if (!Array.isArray(activeTags)) {
      activeTags = activeTags.split(',')
  }
  return (
      <S.Tags style={style}>
        {data?.tags?.map(tag => {
              return <Tag key={tag} text={tag} active={(() => {
                  const t = activeTags.find(e => e === tag);
                  return t !== undefined
              })(tag)
              }/>
          })}
      </S.Tags>
  );
}

Tags.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin-top: 15px;
`;
