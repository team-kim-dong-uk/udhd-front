import React, {useEffect, useLayoutEffect} from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Feed from "../../component/Feed";
import {useDispatch, useSelector} from "react-redux";
import { loginSuccess } from '../../core/redux/auth';
import { getFeeds } from '../../core/redux/feed';

export default function FeedPage() {
    const { feed, loading } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFeeds.request());
    }, [])
  return (
    <>
      <AppLayout>
        <HomeLayout>
            <Feed data={feed?.feeds?.data ? feed.feeds.data : []}/>
        </HomeLayout>
      </AppLayout>
    </>
  )
}
