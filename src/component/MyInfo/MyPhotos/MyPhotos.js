import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import PhotoGrid from "../../PhotoGrid";
import HeartIcon from '../../../../assets/heart-icon.svg';
import HeartIconFilled from '../../../../assets/heart-icon-filled.svg';
import SaveIcon from '../../../../assets/save-icon.svg';
import SaveIconFilled from '../../../../assets/save-icon-filled.svg';
import {getFeeds, getFeedsLike, getFeedsSave} from "../../../core/redux/feed";
import {useDispatch, useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";
import NoImageIcon from '../../../../assets/no-image-icon.svg';

/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : [],
*   comments: [],
* }
* */
export default function MyPhotos({item}) {
    const {auth, feed} = useSelector(state => state);
    const dispatch = useDispatch();
    const [photoType, setPhotoType] = useState('like');
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView){
            if (photoType === 'like'){
                dispatch(getFeedsLike.request({
                    type: 'like',
                    userId: auth.data?.userId,
                    page: feed.feedsLike.page+1
                }))
            } else if (photoType === 'save'){
                dispatch(getFeedsSave.request({
                    type: 'save',
                    userId: auth.data?.userId,
                    page: feed.feedsSave.page+1
                }))
            }
        }
    },[inView])

    const showLike = useCallback(() => {
        if (photoType === 'like')
            dispatch(getFeedsLike.request({
                type: photoType,
                userId: auth.data?.userId,
                page: 0,
            }))
        setPhotoType('like');
    }, [photoType]);
    const showSave = useCallback(() => {
        if (photoType === 'save')
            dispatch(getFeedsSave.request({
                type: photoType,
                userId: auth.data?.userId,
                page: 0,
            }))
        setPhotoType('save');
    }, [photoType])

    useEffect(() => {
        if (auth.data) {
            if (photoType === 'like') {
                if (feed.feedsLike?.data?.length === 0)
                    dispatch(getFeedsLike.request({
                        type: photoType,
                        userId: auth.data?.userId
                    }))
            } else if (photoType === 'save') {
                if(feed.feedsSave?.data?.length === 0)
                    dispatch(getFeedsSave.request({
                        type: photoType,
                        userId: auth.data?.userId
                    }))
            }
        }
    }, [dispatch, auth, photoType])

    return (
    <S.MyPhotos>
        <S.IconContainer>
            <S.Icon onClick={showLike}>
                {photoType === 'like' ? <HeartIconFilled/> : <HeartIcon/>}
            </S.Icon>
            <S.Icon onClick={showSave}>
                {photoType === 'save' ? <SaveIconFilled/> : <SaveIcon/>}
            </S.Icon>
        </S.IconContainer>
        {photoType === 'like' && feed.feedsLike.data.length !== 0 && (
            <PhotoGrid feeds={feed.feedsLike.data} moveTo="mypage/like" ref={ref} inView={inView}/>
        )}
        {photoType === 'save' && (
            <PhotoGrid feeds={feed.feedsSave.data} moveTo="mypage/save" ref={ref} inView={inView}/>
        )}
        {
            ((photoType === 'like' && feed.feedsLike.data.length === 0) ||
                (photoType === 'save' && feed.feedsSave.data.length === 0)) &&  (
                <div>
                    <NoImageIcon width='100%'  viewBox='0 0 200 200'/>
                    <S.Text>보여줄 사진이 없어요!</S.Text>
                </div>
            )}

    </S.MyPhotos>
  );
}

MyPhotos.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.MyPhotos = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
`;

S.IconContainer = styled.div`
  width: 100%;
  display: flex;
  align-content: space-between;
  justify-content: space-between;
  padding: 10px;
  padding-bottom: 10%;
`;

S.Icon = styled.span`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;
S.LineContainer = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  background-color: black;
  display: flex;
`;
S.Text = styled.div`
    text-align: center;
    margin: 10% 0 30% 0;
`;
