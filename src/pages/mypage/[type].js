import React, {useEffect, useState} from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Feed from "../../component/Feed";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from 'next/router';
import { setFeeds } from '../../core/redux/feed';

export default function FeedPage() {
    const dispatch = useDispatch();
    const {auth, feed} = useSelector(state => state);
    const router = useRouter();
    const {query: {type, index}} = router;

    useEffect(() => {
      dispatch(setFeeds({
        feeds: type === 'like' ? feed.feedsLike.data.slice(index) : feed.feedsSave.data.slice(index)
      }));
    }, []);
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
