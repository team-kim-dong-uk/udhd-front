import React from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Feed from "../../component/Feed";

export default function AlbumPage() {
    const feeds = [
        {
            img_url: "https://upload.wikimedia.org/wikipedia/commons/f/f8/190611_%EC%9D%B4%EB%82%98%EA%B2%BD.jpg",
            tags: ['이런', '데이터' , '들이?','있겠조?','이나경!']
        },
        {
            img_url: "https://upload.wikimedia.org/wikipedia/commons/f/f8/190611_%EC%9D%B4%EB%82%98%EA%B2%BD.jpg",
            tags: ['이런', '데이터' , '들이?','있겠조?','이나경!']
        },
    ]
  return (
    <>
      <AppLayout>
        <HomeLayout>
            {feeds.map((feed) => {
                return <Feed feed={feed}/>
            })}
        </HomeLayout>
      </AppLayout>
    </>
  )
}
