import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import { colors } from '../../../util/style';

export default function CommentBox({comments}) {
  const [comment, setComment] = useState('');

  const onCommentChange = useCallback((e) => {
    setComment(e.target.value);
  }, [setComment]);
  
  return (
      <S.CommentBox>
        {comments?.map(comment => (
          <S.Comment>
            <S.Writer>{comment.userName}</S.Writer>
            <S.Content>{comment.content}</S.Content>
          </S.Comment>
        ))}
        <S.NewComment>
          <S.CommentInput
            placeholder='댓글 달기...'
            value={comment}
            onChange={onCommentChange}
          />
          <S.SubmitComment>등록</S.SubmitComment>
        </S.NewComment>
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
S.Writer = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;
S.Content = styled.span`
`;
S.NewComment = styled.div`
  display: flex;
`;
S.CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  height: 2rem;
  border-radius: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-color: ${colors.grey};
  border-width: 0;
`;
S.SubmitComment = styled.button`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 2rem;
  color: ${colors.white};
  background-color: ${colors.orange};
  padding: 0.5rem;
`;


