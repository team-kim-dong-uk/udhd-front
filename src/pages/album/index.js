import React, {useEffect} from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Feed from "../../component/Feed";
import {getPhotos} from "../../core/redux/photos";
import {useDispatch, useSelector} from "react-redux";

export default function AlbumPage() {
    const {auth, photos} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!photos.error) {
            dispatch(getPhotos.request({
                type: "album",
                userId: auth.data?.userId,
            }));
        }
    }, []);
    console.log(photos)
    const feeds = [
        {
            img_url: "https://upload.wikimedia.org/wikipedia/commons/f/f8/190611_%EC%9D%B4%EB%82%98%EA%B2%BD.jpg",
            tags: ['이런', '데이터' , '들이?','있겠조?','이나경!']
        },
        {
            img_url: "https://png.pngtree.com/thumb_back/fh260/background/20190222/ourmid/pngtree-ink-landscape-advertising-ad-background-backgroundfreshhand-paintedlandscape-paintingmountain-image_61834.jpg",
            tags: ['가로', '데이터' , '들이?','맛있는 것','얍','길어지면', '어떻게되나요']
        },
    ]
  return (
    <>
      <AppLayout>
        <HomeLayout>
            {photos.data?.map((photo) => {

            })
            }
            {feeds.map((feed) => {
                return <Feed feed={feed}/>
            })}
        </HomeLayout>
      </AppLayout>
    </>
  )
}
