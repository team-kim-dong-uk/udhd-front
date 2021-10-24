import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import HeartIcon from '../../../../assets/heart-icon.svg';
import HeartIconFilled from '../../../../assets/heart-icon-filled.svg';
import SaveIcon from '../../../../assets/save-icon.svg';


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : []
* }
* */
export default function Info({data}) {
  const [inAlbum, setInAlbum] = useState(false);

  const updateAlbum = useCallback(() => {
      if (inAlbum) {
        // TODO: remove from album
      } else {

      }
      setInAlbum(prev => !prev);
  }, [inAlbum])
  return (
    <S.Info>
      <S.Uploader>Nickname</S.Uploader>
      <S.IconContainer>
          <S.Icon onClick={updateAlbum}>
              {!inAlbum && <HeartIcon/>}
              {inAlbum && <HeartIconFilled/>}
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
  margin: 5px;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


