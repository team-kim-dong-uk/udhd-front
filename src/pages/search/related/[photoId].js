import React, {useEffect, useLayoutEffect} from 'react';
import AppLayout from '../../../component/layout/AppLayout';
import HomeLayout from '../../../component/layout/HomeLayout';
import Feed from "../../../component/Feed";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from 'next/router';
import { getNewFeedsRelated } from '../../../core/redux/feed';

export default function FeedPage() {
  const { feed, loading } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
      if (!loading.data && feed.feedsRelated.data.length === 0 && !feed.feedsRelated.error) {
        dispatch(getNewFeedsRelated.request());
      }
    }, [feed, loading]);

  return (
    <>
      <AppLayout>
        <HomeLayout>
            <Feed data={feed.feedsRelated.data}/>
        </HomeLayout>
      </AppLayout>
    </>
  )
}
