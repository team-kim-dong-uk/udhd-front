import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import PhotoGrid from "../../PhotoGrid";
import HeartIcon from '../../../../assets/heart-icon.svg';
import HeartIconFilled from '../../../../assets/heart-icon-filled.svg';
import SaveIcon from '../../../../assets/save-icon.svg';
import SaveIconFilled from '../../../../assets/save-icon-filled.svg';
import {getFeeds, getFeedsLike, getFeedsSave} from "../../../core/redux/feed";
import {useDispatch, useSelector} from "react-redux";


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

    const showLike = useCallback(() => {
        if (photoType === 'like')
            dispatch(getFeedsLike.request({
                type: photoType,
                userId: auth.data?.userId
            }))
        setPhotoType('like');
    }, []);
    const showSave = useCallback(() => {
        if (photoType === 'save')
            dispatch(getFeedsSave.request({
                type: photoType,
                userId: auth.data?.userId
            }))
        setPhotoType('save');
    }, [])

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
        {photoType === 'like' && (
            <PhotoGrid feeds={feed.feedsLike.data}/>
        )}
        {photoType === 'save' && (
            <PhotoGrid feeds={feed.feedsSave.data}/>
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
