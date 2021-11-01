import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import Setting from '../../../../assets/setting.svg';
import Link from 'next/link'
import logo from '../../../../assets/drawable-xhdpi/symbol_black.webp'
import Image from "next/image";
import {getFeedsLike} from "../../../core/redux/feed";
import {getUser} from "../../../core/redux/auth";


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : [],
*   comments: [],
* }
* */
export default function UserInfoBox({item}) {
    const dispatch = useDispatch();
    const {auth, feed} = useSelector(state => state);
    useEffect(() => {
        dispatch(getUser.request({userId: auth.data?.userId}));
    }, [])

  return (
    <S.UserInfoBox>
      <S.Top>
        <S.Nickname>{auth.data?.nickname}</S.Nickname>
          <Link href="/mypage/edit">
              <S.Icon>
                  <Setting/>
              </S.Icon>
          </Link>
      </S.Top>
      <S.Profile>
        <S.ImageBox onClick={() => {alert("프로필 사진은 준비 중 입니다.")}}>
            <S.Image src={logo} width={50} height={50}/>
        </S.ImageBox>

        <S.TextContainer>
          <S.CountText>
              {auth.data?.numLikePhotos}<br/>
              like
          </S.CountText>
          <S.CountText>
              {auth.data?.numSavePhotos}<br/>
              save
          </S.CountText>
        </S.TextContainer>
      </S.Profile>
    </S.UserInfoBox>
  );
}

UserInfoBox.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.UserInfoBox = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
S.Top = styled.div`
  display: flex;
  justify-content: center;
    width: 100%;
    height: 40px;
  padding-right: 15px;
`;

S.Nickname = styled.div`
  flex-grow: 1;
  text-align: left;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  padding-top: 5px;
  padding-left: 20px;
`;
S.Profile = styled.div`
  width: 100%;
  display: flex;
  align-content: space-between;
  justify-content: space-between;
  padding: 10px;
`;
S.ImageBox = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding-right: 30px;
`;
/*S.Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 70%;
`;*/
S.Image = styled(Image)`
`;
S.TextContainer = styled.div`
  flex-grow: 4;
  display: flex;
  justify-content: space-between;
`;
S.CountText = styled.span`
  flex-grow: 1;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
S.Icon = styled.p`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
