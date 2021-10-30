import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import FeedItem from './FeedItem';
import { colors } from '../../util/style';


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : []
* }
* */
export default function Feed({ data }) {
  return (
    <S.Feed>
      {data.map((feedItem, index) => {
          return <FeedItem item={feedItem} rank={index+1} key={feedItem.id}/>
      })}
    </S.Feed>
  );
}

Feed.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Feed = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  background-color: #FAFAFA;
  //border: 1px solid ${colors.orange}
`;


