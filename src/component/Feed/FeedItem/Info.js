import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import HeartIcon from '../../../../assets/heart-icon.svg';
import HeartIconFilled from '../../../../assets/heart-icon-filled.svg';
import SaveIcon from '../../../../assets/save-icon.svg';
import SaveIconFilled from '../../../../assets/save-icon-filled.svg';
import {useDispatch, useSelector} from "react-redux";
import {addFeedLike, deleteFeedLike, saveFeed, unsaveFeed} from "../../../core/redux/feed";

export default function Info({feedData}) {
  const {feed} = useSelector(state => state);
  const [inLike, setInLike] = useState(false);
  const [inAlbum, setInAlbum] = useState(false);
  const dispatch = useDispatch();

  /*좋아요, 저장 추가 삭제 실패했으니 되돌리기*/
  useEffect(()=>{
    if (feed.error?.addLike != null) setInLike(false);
    else if (feed.error?.deleteLike != null) setInLike(true);
    else if (feed.error?.saveFeed != null) setInAlbum(false);
    else if (feed.error?.unsaveFeed != null) setInAlbum(true);
  }, [feed.error])

  const updateLike = useCallback(() => {
      inLike ? dispatch(deleteFeedLike.request({feedId: feedData?.id}))
          : dispatch(addFeedLike.request({feedId: feedData?.id}));
      setInLike(prev => !prev);
  }, [inLike])

  const updateAlbum = useCallback(() => {
      inAlbum ? dispatch(unsaveFeed.request({feedId: feedData?.id}))
          : dispatch(saveFeed.request({feedId: feedData?.id}));
      setInAlbum(prev => !prev);
  }, [inAlbum])

  return (
    <S.Info>
      <S.IconContainer>
          <S.Icon onClick={updateLike}>
              {!inLike && <HeartIcon/>}
              {inLike && <HeartIconFilled/>}
          </S.Icon>
          <S.LikeCount>
              {feedData?.likeCount ? feedData?.likeCount : 0}
               &nbsp;명이 좋아합니다.
          </S.LikeCount>
      </S.IconContainer>
      <S.IconContainer>
          <S.Icon onClick={updateAlbum}>
              {!inAlbum && <SaveIcon/>}
              {inAlbum && <SaveIconFilled/>}
          </S.Icon>
      </S.IconContainer>
    </S.Info>
  );
}

Info.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
S.LikeCount = styled.span`
  font-size: 14px;
  font-weight: bold;
`;
S.Footer = styled.div`
    height: 30px;
  background-color: whitesmoke;
`;
S.IconContainer = styled.div`
  overflow: auto;
  display: inline-flex;
  align-items: center;
  padding:5px;
  
`;
S.Icon = styled.p`
  margin: 5px;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


