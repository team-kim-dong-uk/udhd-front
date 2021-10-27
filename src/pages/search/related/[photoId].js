import React, {useEffect, useLayoutEffect} from 'react';
import AppLayout from '../../../component/layout/AppLayout';
import HomeLayout from '../../../component/layout/HomeLayout';
import Feed from "../../../component/Feed";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from 'next/router';

export default function FeedPage() {
    const {auth, photos} = useSelector(state => state);
    const dispatch = useDispatch();
    const router = useRouter();
  const {query: {photoId}} = router;

    const feeds = [
        {
          id: "123123123123123",
          photo: {
            originalLink: "https://upload.wikimedia.org/wikipedia/commons/f/f8/190611_%EC%9D%B4%EB%82%98%EA%B2%BD.jpg",
            id: "123123123123123",
            tags: ['이런', '데이터' , '들이?','있겠조?','이나경!'],
          },
          comments: [{
            userId: '123',
            userName: '백동진',
            content: '너무 조아영'
          }]
        },
        {
          id: "123123123123124",
          photo: {
            originalLink: "https://png.pngtree.com/thumb_back/fh260/background/20190222/ourmid/pngtree-ink-landscape-advertising-ad-background-backgroundfreshhand-paintedlandscape-paintingmountain-image_61834.jpg",
            id: "123123123123124",
            tags: ['이런22', '데이터' , '들이?','있겠조?','이나경!22'],
          },
          comments: [{
            userId: '123',
            userName: '백동진',
            content: '너무 조아영22'
          }]
        },
    ]
  return (
    <>
      <AppLayout>
        <HomeLayout>
            <Feed data={feeds}/>
        </HomeLayout>
      </AppLayout>
    </>
  )
}
