import React, {useEffect, useLayoutEffect} from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Feed from "../../component/Feed";
import {useDispatch, useSelector} from "react-redux";
import { loginSuccess } from '../../core/redux/auth';
import { getFeeds } from '../../core/redux/feed';

export default function FeedPage() {
    const { auth, feed, loading } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
      if (!auth.data) {
        dispatch(loginSuccess({
          accessToken: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MTU0MjVjYmY4MzgxMjM5OTgwNWVhODQiLCJleHAiOjE3MzQ5Nzg2MDU3NzZ9.ev_Rp6p3D2-ROwVBiZykjrgEDVIQ0f5OzovjWm76KAY`,
          userId: `615425cbf83812399805ea84`,
          refreshToken: `test`,
          nickname: `Udhd-test`,
        }));
      } else if (feed.feeds.data.length === 0 && !feed.feeds.error) {
        dispatch(getFeeds.request());

      }
    }, [feed, loading, auth])
  return (
    <>
      <AppLayout>
        <HomeLayout>
            <Feed data={feed.feeds.data}/>
        </HomeLayout>
      </AppLayout>
    </>
  )
}
