import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import Tag from "../Tag";
import {HeartIcon} from '../../../assets/heart-icon.svg';
import {useDispatch, useSelector} from "react-redux";
import {getPhotos} from "../../core/redux/photos";
import {addToAlbum, removeFromAlbum} from "../../core/redux/album";
//import HeartIconFilled from '../../../assets/heart-icon-filled.svg';

export default function Feed({ children, ...props }) {
    const {auth} = useSelector(state => state);
    const dispatch = useDispatch();
    const [inAlbum, setInAlbum] = useState(false);

    // TODO: photo 받아오기 만들기
    const updateAlbum = useCallback(() => {
        if (inAlbum){
            dispatch(removeFromAlbum.request({
                userId: auth.data.userId,
                //albumId: photoSimpleInfo?.albumId
            }))
        } else {
            dispatch(addToAlbum.request({
                userId: auth.data.userId,
                //photoId: photoSimpleInfo?.photoId
            }))
        }
        setInAlbum(prev => !prev);
    }, [inAlbum])

  return (
      <S.Feed>
          <S.Header/>
          <div style={{background: 'orange'}}>
          <S.ImageBox>
              <img src={props.feed?.img_url}/>
          </S.ImageBox>
          </div>
        <S.IconContainer>
            <S.Icon>
                {inAlbum && (
                    <button>[꽓]</button>
                )}
                {!inAlbum && (
                    <button onClick={}>[  ]</button>
                )}
                {/*<HeartIcon width='25' height='25' viewBox='0 0 25 25'/>*/}
                {/*<img src={HeartIcon} />*/}
            </S.Icon>
            <S.Icon>
                다운?
            </S.Icon>
        </S.IconContainer>
        <S.TagContainer>
            {props.feed?.tags.map(tag => {
                return <Tag>{tag}</Tag>
            })}

        </S.TagContainer>
      </S.Feed>
  );
}

Feed.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Feed = styled.div`
`;
S.Header = styled.div`
    height: 30px;
  background-color: aliceblue;
`;
S.IconContainer = styled.div`
  overflow: auto;
  display: inline-flex;
  padding:5px;
  
`;
S.Icon = styled.p`
  //background-color: pink;
    margin: 5px;
    width: 40px;
    height: 40px;
  
`;
S.ImageBox = styled.div`
  overflow: auto;
    img{
      width: 100%;
      height: auto;
    }
`;
S.TagContainer = styled.div`
    padding: 10px;
`;


