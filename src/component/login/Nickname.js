import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap'; 
import logo from '../../../assets/drawable-xxxhdpi/symbol_black.webp';
import brandText from '../../../assets/drawable-xxxhdpi/brand_text.webp';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../../core/redux/auth';

export default function Nickname({ children, ...props }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const [nicknameInput, setNicknameInput] = useState('');

  const onBtnClick = () => {
    dispatch(setNickname.request({
      userId: auth.data.userId,
      nickname: nicknameInput,
    }));
  };

  const onChangeText = (e) => {
    setNicknameInput(e.target.value);
  }

  return (
      <S.Nickname>
        <S.InfoContainer>
        <S.Info>
        <div>이메일</div>
        <S.Input
          value={auth.data?.email}
          readOnly
        />
        </S.Info>
        <S.Info>
        <div>닉네임</div>
        <S.Input
          placeholder='닉네임을 입력해주세요'
          onChange={onChangeText}
        />
        {auth.error}
        </S.Info>
      </S.InfoContainer>
      <S.ButtonContainer>
        <S.Button
          onClick={()=>onBtnClick()}
          disabled={nicknameInput.length === 0}
        >
          다음
        </S.Button>
      </S.ButtonContainer>
      </S.Nickname>
  );
}

Nickname.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};

S.Nickname = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

S.Input = styled.input`
  width: 100%;
  height: 40px;
  align-self: center;
  margin-top: 5px;
  padding: 5px;
`;

S.InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

S.Info = styled.div`
  width: 90%;
  margin-top: 20px;
`;

S.ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
  margin-bottom: 20px;
  width: 100%;
`;

S.Button = styled(Button)`
  width: 90%;
`;