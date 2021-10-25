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
export default function Tags({data}) {
  let inAlbum = true;

  return (
      <S.Tags>
        {data?.tags?.map(tag => {
              return <Tag key={tag} text={tag}></Tag>
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