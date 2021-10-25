import React from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux";


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
    const {auth} = useSelector(state => state);

  return (
    <S.UserInfoBox>
      <S.Nickname>{auth.data?.nickname}</S.Nickname>
      <S.Profile>
        <S.ImageBox>
            <S.Image src="https://upload.wikimedia.org/wikipedia/commons/f/f8/190611_%EC%9D%B4%EB%82%98%EA%B2%BD.jpg"/>
        </S.ImageBox>
          <S.TextContainer>
              <S.CountText>
                  12 <br/>
                  like
              </S.CountText>
              <S.CountText>
                  10 <br/>
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
S.Nickname = styled.div`
  width: 100%;
  text-align: left;
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
