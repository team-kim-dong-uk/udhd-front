import React, {useState} from 'react';
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
    const [photoType, setPhotoType] = useState('like');
  return (
    <S.MyPhotos>
        <S.IconContainer>
            <S.Icon onClick={() => setPhotoType('like')}>
                {photoType === 'like' ? <HeartIconFilled/> : <HeartIcon/>}
            </S.Icon>
            <S.Icon onClick={() => setPhotoType('save')}>
                {photoType === 'save' ? <SaveIconFilled/> : <SaveIcon/>}
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
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;
S.LineContainer = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  background-color: black;
  display: flex;
`;
