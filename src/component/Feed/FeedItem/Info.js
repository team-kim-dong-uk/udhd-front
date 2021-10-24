import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import HeartIcon from '../../../../assets/heart-icon.svg';
import HeartIconFilled from '../../../../assets/heart-icon-filled.svg';
import SaveIcon from '../../../../assets/save-icon.svg';
import {useDispatch, useSelector} from "react-redux";
import {addFeedLike, deleteFeedLike} from "../../../core/redux/feed";


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : []
* }
* */
export default function Info({feedData}) {
  const {feed} = useSelector(state => state);
  const [inAlbum, setInAlbum] = useState(false);
  const dispatch = useDispatch();

  /*좋아요 추가 삭제 실패했으니 되돌리기*/
  useEffect(()=>{
    if (feed.error?.addLike != null) setInAlbum(false);
    else if (feed.error?.deleteLike != null) setInAlbum(true);
  }, [feed.error])

  const updateAlbum = useCallback(() => {
      inAlbum ? dispatch(deleteFeedLike.request({feedId: feedData?.id}))
          : dispatch(addFeedLike.request({feedId: feedData?.id}));
      setInAlbum(prev => !prev);
  }, [inAlbum])

  return (
    <S.Info>
      <S.IconContainer>
          <S.Icon onClick={updateAlbum}>
              {!inAlbum && <HeartIcon/>}
              {inAlbum && <HeartIconFilled/>}
          </S.Icon>
          <S.LikeCount>
              {feedData?.likeCount ? feedData?.likeCount : 0}
               &nbsp;명이 좋아합니다.
          </S.LikeCount>
      </S.IconContainer>
      <S.IconContainer>
          <S.Icon>
            <SaveIcon/>
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


