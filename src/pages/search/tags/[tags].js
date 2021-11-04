import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import AppLayout from '../../../component/layout/AppLayout';
import HomeLayout from '../../../component/layout/HomeLayout';
import Feed from "../../../component/Feed";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from 'next/router';
import { getMorePhotosTagged, getNewPhotosTagged } from '../../../core/redux/photos';
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../../util/amplitude';
import SearchPhotoGrid from "../../../component/PhotoGrid/SearchPhotoGrid";
import Tags from "../../../component/Feed/FeedItem/Tags";

export default function FeedPage() {
    const { photos, auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const router = useRouter();
    let {query: {tags}} = router;
    console.log(photos);
    const [tagsData, setTagsData] = useState( {
        tags: [
            '단체', "효정", '미미', '유아', '승희', '지호', '비니', '아린'
        ].concat(['직찍', '인별', '비하인드', '공식', '화보', '네이버포스트', 'MV'].sort(() => Math.random() - 0.5).slice(0, 3))
    });

    useEffect(() => {
        if(!router.isReady) return;

        const nTags = tags.split(',').filter(tag => {
            return tagsData.tags.find(t => t === tag) === undefined;
        });
        if (nTags.length > 0) setTagsData({...tagsData, tags: [...tagsData.tags, ...nTags]});
        initAmplitude();
        setAmplitudeUserId(auth.data?.userId);
        sendAmplitudeData("tags feed", {"tags": tags});
        dispatch(getNewPhotosTagged.request({tags}));
    }, [router.isReady, tags]);

    const loadMore = useCallback(() => {
        //console.log("DATA == " + JSON.stringify(data, null , 2));
        //console.log("파라미터가  : " + data.length > 0 ? data[data.length-1].photo.id : 0);
        sendAmplitudeData("tags feed more", {"tags": tags});
        dispatch(getMorePhotosTagged.request({ tags, page: photos.page }));
    }, [photos, tags])

    return (
        <>
            <AppLayout>
                <HomeLayout>
                    <Tags style={{padding: 10}} data={tagsData} activeTags={tags}/>
                    <SearchPhotoGrid data={photos.data} loadMore={loadMore} />
                </HomeLayout>
            </AppLayout>
        </>
    )
}
