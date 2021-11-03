import React, {useCallback} from 'react';
import styled from 'styled-components';
import HeartIcon from '../../../../assets/heart-icon.svg';
import HeartIconFilled from '../../../../assets/heart-icon-filled.svg';
import SaveIcon from '../../../../assets/save-icon.svg';
import SaveIconFilled from '../../../../assets/save-icon-filled.svg';
import {useDispatch, useSelector} from "react-redux";
import {addFeedLike, deleteFeedLike, saveFeed, unsaveFeed} from "../../../core/redux/feed";
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../../util/amplitude';

export default function Info({feedData}) {
  const {auth, feed} = useSelector(state => state);
  const inLike = feedData.liked;
  const inAlbum = feedData.saved;
  const dispatch = useDispatch();

  const updateLike = useCallback(() => {
      initAmplitude();
      setAmplitudeUserId(auth.data?.userId);
      sendAmplitudeData(inLike ? "delete like" : "add like", {"feedId": feedData.id});
      inLike ? dispatch(deleteFeedLike.request({
                            feedId: feedData?.id,
                            authData: auth?.data
                }))
          : dispatch(addFeedLike.request({
                            feedId: feedData?.id,
                            authData: auth?.data
                }));
  }, [inLike])

  const updateAlbum = useCallback(() => {
      initAmplitude();
      setAmplitudeUserId(auth.data?.userId);
      sendAmplitudeData(inAlbum ? "delete save" : "add save", {"feedId": feedData.id});
      inAlbum ? dispatch(unsaveFeed.request({feedId: feedData?.id}))
          : dispatch(saveFeed.request({feedId: feedData?.id}));
  }, [inAlbum])

  return (
    <S.Info>
      <S.IconContainer>
          <S.Icon onClick={updateLike}>
              {!inLike && <HeartIcon/>}
              {inLike && <HeartIconFilled/>}
          </S.Icon>
          <S.LikeCount>
              {feedData?.likes.length}
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
  margin-left: 5px;
`;
S.Footer = styled.div`
    height: 30px;
  background-color: whitesmoke;
`;
S.IconContainer = styled.div`
  overflow: auto;
  display: inline-flex;
  align-items: center;
  padding-top: 5px;
`;
S.Icon = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


