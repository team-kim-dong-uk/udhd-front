import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import Tag from "../Tag";
import HeartIcon from '../../../assets/heart-icon.svg';
import HeartIconFilled from '../../../assets/heart-icon-filled.svg';
import {useDispatch, useSelector} from "react-redux";
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
      {data.map((feedItem) => {
          return <FeedItem item={feedItem} key={feedItem.id}/>
      })}
    </S.Feed>
  );
}

Feed.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Feed = styled.div`
  display: 'flex' !important;
  flex-direction: 'column';
  align-items: 'center';
  border: 1px solid ${colors.orange}
`;


