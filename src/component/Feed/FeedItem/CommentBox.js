import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : []
* }
* */
export default function CommentBox({comments}) {
  return (
      <S.CommentBox>
        {comments?.map(comment => (
          <S.Comment>
          <S.Writer>{comment.userName}</S.Writer>
          <S.Content>{comment.content}</S.Content>
          </S.Comment>
        ))}
        <S.CommentInput placeholder='댓글을 입력해주세요'/>
      </S.CommentBox>
  );
}

CommentBox.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.CommentBox = styled.div`
  width: 100%;
  margin-top: 10px;
`;
S.Comment = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 5px;
`;
S.Writer = styled.div`
  width: 90px;
  font-weight: bold;
`;
S.Content = styled.div`
  width: 80%;
`;
S.CommentInput = styled.input`
  width: 80%;
  padding: 5px;
`;


