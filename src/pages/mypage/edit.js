import React, {useEffect, useState} from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import {useSelector} from "react-redux";
import {useRouter} from 'next/router';
import Edit from "../../component/MyInfo/Edit";
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../util/amplitude';

export default function FeedPage() {
    const {auth, feed} = useSelector(state => state);
    const router = useRouter();
    const {query: {type}} = router;
    const [feeds, setFeeds] = useState(type === 'like' ? feed.feedsLike.data : feed.feedsSave.data);

    useEffect(() => {
      initAmplitude();
      setAmplitudeUserId(auth.data?.userId);
      sendAmplitudeData("change nickname");
    }, []);
    return (
    <>
      <AppLayout>
        <HomeLayout>
            <Edit data={auth.data}/>
        </HomeLayout>
      </AppLayout>
    </>
  )
}
