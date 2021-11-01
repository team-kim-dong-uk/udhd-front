import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import FeedItem from './FeedItem';
import { colors } from '../../util/style';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : []
* }
* */
export default function Feed({ data, loadMore }) {
  const { loading } = useSelector(state => state);
  const [ref, inView] = useInView();
  useEffect(() => {
      if (inView && !loading.data && loadMore){
          loadMore();
      }
  },[inView, loading, loadMore]);
  return (
    <S.Feed>
      {data.map((feedItem, index) => {
          return <FeedItem item={feedItem} rank={index+1} key={feedItem.id}/>
      })}
      <S.CheckForScroll ref={ref}/>
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
S.CheckForScroll = styled.div`
  width: 100%;
  margin-top:20px;
`;


