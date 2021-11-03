import React, {useEffect, useLayoutEffect} from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Feed from "../../component/Feed";
import {useDispatch, useSelector} from "react-redux";
import { loginSuccess } from '../../core/redux/auth';
import { getFeeds } from '../../core/redux/feed';
import styled from 'styled-components';
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../util/amplitude';

export default function FeedPage() {
  const { feed, auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
      initAmplitude();
      setAmplitudeUserId(auth.data?.userId);
      sendAmplitudeData("weekly feed");
      dispatch(getFeeds.request());
    }, [])
  return (
    <>
      <AppLayout>
        <HomeLayout>
            <S.Title>Weekly 20</S.Title>
            <Feed data={feed?.feeds?.data ? feed.feeds.data : []} showTitle={true}/>
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
