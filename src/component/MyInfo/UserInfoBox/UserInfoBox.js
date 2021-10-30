import React from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux";
import Setting from '../../../../assets/setting.svg';
import Link from 'next/link'


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
    const {auth, feed} = useSelector(state => state);
    const updateProfile = () => {

    }
    // TODO: 설정 - 모달 만들기
  return (
    <S.UserInfoBox>
      <S.Top>
        <S.Nickname>{auth.data?.nickname}</S.Nickname>
          <Link href="/mypage/edit">
              <S.Icon>
                  <Setting onClick={updateProfile}/>
              </S.Icon>
          </Link>
      </S.Top>
      <S.Profile>
        <S.ImageBox>
            <S.Image src="https://upload.wikimedia.org/wikipedia/commons/f/f8/190611_%EC%9D%B4%EB%82%98%EA%B2%BD.jpg"/>
        </S.ImageBox>
        <S.TextContainer>
          <S.CountText>
              {feed.feedsLike.data?.length}<br/>
              like
          </S.CountText>
          <S.CountText>
              {feed.feedsSave.data?.length}<br/>
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
  justify-content: flex-start;
  overflow: hidden;
  padding-right: 30px;
`;
S.Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 70%;
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
