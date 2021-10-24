import React from 'react';
import styled from 'styled-components';
import {colors} from '../../util/style';
import UserInfoBox from "./UserInfoBox";
import PhotoGrid from "../PhotoGrid";


export default function MyInfo({ data }) {
  return (
    <S.Mypage>
      <UserInfoBox/>
      <PhotoGrid/>
    </S.Mypage>
  );
}

MyInfo.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Mypage = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
//  border: 1px solid ${colors.orange}
`;

S.Nickname = styled.div`
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 1.5rem;
  padding-top: 5px;
  padding-left: 10px;
`;


