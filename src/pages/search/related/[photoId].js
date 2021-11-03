import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import AppLayout from '../../../component/layout/AppLayout';
import HomeLayout from '../../../component/layout/HomeLayout';
import Feed from "../../../component/Feed";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from 'next/router';
import { getMoreFeedsRelated, getNewFeedsRelated } from '../../../core/redux/feed';
import styled from "styled-components";
import {colors} from "../../../util/style";
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../../util/amplitude';

export default function FeedPage() {
  const { feed, auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const {query: {photoId}} = router;

  useEffect(() => {
      initAmplitude();
      setAmplitudeUserId(auth.data?.userId);
      sendAmplitudeData("related feed", {"photoId": photoId});
      dispatch(getNewFeedsRelated.request({photoId}));
  }, [photoId]);

  const loadMore = useCallback(() => {
    const data = feed.feeds.data;
    //console.log("DATA == " + JSON.stringify(data, null , 2));
    //console.log("파라미터가  : " + data.length > 0 ? data[data.length-1].photo.id : 0);
    sendAmplitudeData("related feed more", {"photoId": photoId});
    dispatch(getMoreFeedsRelated.request({
      photoId: data.length > 0 ? data[data.length-1].photo.id : photoId
    }));
  }, [feed, photoId])

  return (
    <>
      <AppLayout>
        <HomeLayout>
            <S.Title>연관 사진</S.Title>
            <Feed
              data={feed.feeds.data}
              loadMore={loadMore}
              isEnd={feed.feeds.isEnd}
            />
        </HomeLayout>
      </AppLayout>
    </>
  )
}
const S = {};
S.Title = styled.div`
  height: 40px;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  background-color: white;
  font-size: 20px;
  font-weight: bold;
`;
