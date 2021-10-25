import React from 'react';
import styled from 'styled-components';
import PhotoGrid from "../../PhotoGrid";
import HeartIcon from '../../../../assets/heart-icon.svg';
import HeartIconFilled from '../../../../assets/heart-icon-filled.svg';
import SaveIcon from '../../../../assets/save-icon.svg';
import SaveIconFilled from '../../../../assets/save-icon-filled.svg';


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : [],
*   comments: [],
* }
* */
export default function MyPhotos({item}) {

  return (
    <S.MyPhotos>
        <S.IconContainer>
            <S.Icon>
                <HeartIcon/>
            </S.Icon>
            <S.Icon>
                <SaveIcon/>
            </S.Icon>
        </S.IconContainer>
        <PhotoGrid/>
    </S.MyPhotos>
  );
}

MyPhotos.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.MyPhotos = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

S.IconContainer = styled.div`
  width: 100%;
  display: flex;
  align-content: space-between;
  justify-content: space-between;
`;

S.Icon = styled.span`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;
