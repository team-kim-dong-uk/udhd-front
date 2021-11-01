import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import AppLayout from '../../../component/layout/AppLayout';
import HomeLayout from '../../../component/layout/HomeLayout';
import Feed from "../../../component/Feed";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from 'next/router';
import { getMoreFeedsRelated, getNewFeedsRelated } from '../../../core/redux/feed';

export default function FeedPage() {
  const { feed, loading } = useSelector(state => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const {query: {photoId}} = router;

  useEffect(() => {
      dispatch(getNewFeedsRelated.request({photoId}));
  }, [photoId]);

  const loadMore = useCallback(() => {
    const data = feed.feeds.data;
    console.log(data);
    console.log(data.length > 0 ? data[data.length-1].photo.id : 0);
    dispatch(getMoreFeedsRelated.request({
      photoId: data.length > 0 ? data[data.length-1].photo.id : photoId
    }));
  }, [feed, photoId])

  return (
    <>
      <AppLayout>
        <HomeLayout>
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
