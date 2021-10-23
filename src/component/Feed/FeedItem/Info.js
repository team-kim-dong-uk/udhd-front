import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import Tag from "../../Tag";
import HeartIcon from '../../../../assets/heart.svg';
import SaveIcon from '../../../../assets/save-icon.svg';
import {useDispatch, useSelector} from "react-redux";


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : []
* }
* */
export default function Info({data}) {
  let inAlbum = true;

  return (
    <S.Info>
      <S.Uploader>Nickname</S.Uploader>
      <S.IconContainer>
          <S.Icon>
            <HeartIcon/>
          </S.Icon>
          <S.Icon>
            <SaveIcon/>
          </S.Icon>
      </S.IconContainer>
    </S.Info>
  );
}

Info.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
S.Uploader = styled.span`
  font-weight: bold;
`;
S.Footer = styled.div`
    height: 30px;
  background-color: whitesmoke;
`;
S.IconContainer = styled.div`
  overflow: auto;
  display: inline-flex;
  align-items: center;
  padding:5px;
  
`;
S.Icon = styled.p`
  //background-color: pink;
    margin: 5px;
    min-width: 40px;
    height: 40px;
  
`;


