import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import AppLayout from '../../../component/layout/AppLayout';
import HomeLayout from '../../../component/layout/HomeLayout';
import Feed from "../../../component/Feed";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from 'next/router';
import { getMorePhotosTagged, getNewPhotosTagged } from '../../../core/redux/photos';
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../../util/amplitude';
import SearchPhotoGrid from "../../../component/PhotoGrid/SearchPhotoGrid";

export default function FeedPage() {
    const { photos, auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const router = useRouter();
    const {query: {tags}} = router;
    const [page, setPage] = useState(0);

    useEffect(() => {
        if(!router.isReady) return;
        initAmplitude();
        setAmplitudeUserId(auth.data?.userId);
        sendAmplitudeData("tags feed", {"tags": tags});
        dispatch(getNewPhotosTagged.request({tags, page}));
        setPage(page + 1);
    }, [router.isReady, tags]);

    const loadMore = useCallback(() => {
        //console.log("DATA == " + JSON.stringify(data, null , 2));
        //console.log("파라미터가  : " + data.length > 0 ? data[data.length-1].photo.id : 0);
        sendAmplitudeData("tags feed more", {"tags": tags});
        dispatch(getMorePhotosTagged.request({ tags, page }));
        setPage(page + 1);
    }, [photos, tags])

    return (
        <>
            <AppLayout>
                <HomeLayout>
                    <SearchPhotoGrid data={photos.data} loadMore={loadMore} />
                </HomeLayout>
            </AppLayout>
        </>
    )
}
