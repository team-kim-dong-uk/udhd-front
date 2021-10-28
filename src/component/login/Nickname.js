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
        <div>
      <div>
        <div>이메일</div>
        <input
          value={auth.data?.email}
          readOnly
        />
      </div>
      <div>
        <div>닉네임</div>
        <input
          placeholder='닉네임을 입력해주세요'
          onChange={onChangeText}
        />
        {auth.error}
      </div>
      <div>
        <S.Button
          onClick={()=>onBtnClick()}
          disabled={nicknameInput.length === 0}
        >
          다음
        </S.Button>
      </div>
    </div>

      </S.Nickname>
  );
}

Nickname.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};

S.Nickname = styled.div`
display: flex;
flex-direction: 'column';
`;

S.Button = styled(Button)`

`;