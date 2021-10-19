import React from 'react';
import styled from 'styled-components';
import Tag from "../Tag";

export default function Feed({ children, ...props }) {

  return (
      <S.Feed>
          <S.Header/>
          <div style={{background: 'orange'}}>
          <S.ImageBox>
              <img src={props.feed?.img_url}/>
          </S.ImageBox>
          </div>
        <S.IconContainer>
            <S.Icon>
                공유
            </S.Icon>
            <S.Icon>
                다운?
            </S.Icon>
        </S.IconContainer>
        <S.TagContainer>
            {props.feed?.tags.map(tag => {
                return <Tag>{tag}</Tag>
            })}

        </S.TagContainer>
      </S.Feed>
  );
}

Feed.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Feed = styled.div`
`;
S.Header = styled.div`
    height: 30px;
  background-color: aliceblue;
`;
S.IconContainer = styled.div`
  overflow: auto;
  display: inline-flex;
  padding:5px;
  
`;
S.Icon = styled.p`
  background-color: pink;
    margin: 5px;
    width: 40px;
    height: 40px;
  
`;
S.ImageBox = styled.div`
  overflow: auto;
  
    img{
      width: 100%;
      height: auto;
    }
`;
S.TagContainer = styled.div`
    padding: 10px;
`;


