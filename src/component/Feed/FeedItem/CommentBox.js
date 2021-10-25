import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addFeedComment, deleteFeedComment } from '../../../core/redux/feed';
import { colors } from '../../../util/style';

export default function CommentBox({data}) {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const [comment, setComment] = useState('');

  const onCommentChange = useCallback((e) => {
    setComment(e.target.value);
  }, [setComment]);

  const onAddComment = (feedId) => {
    dispatch(addFeedComment.request({ feedId: feedId, content: comment}));
    setComment('');
  }
  
  const onDeleteComment = (feedId, commentId) => {
    dispatch(deleteFeedComment.request({ feedId, commentId }));
  }

  return (
      <S.CommentBox>
        {data.comments?.map(comment => (
          <S.Comment key={comment.id}>
            <div>
              <S.Writer>{comment.userName}</S.Writer>
              <S.Content>{comment.content}</S.Content>
            </div>
            {
              auth?.data?.userId === comment.userId
              ? <S.DeleteBtn onClick={()=>onDeleteComment(data.id, comment.id)}>x</S.DeleteBtn>
              : null
            }
          </S.Comment>
        ))}
        <S.NewComment>
          <S.CommentInput
            placeholder='댓글 달기...'
            value={comment}
            onChange={onCommentChange}
          />
          <S.SubmitComment onClick={() => onAddComment(data.id)}>등록</S.SubmitComment>
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
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
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
  border-color: ${colors.orange};
  background-color: ${colors.orange};
  padding: 0.5rem;
`;
S.DeleteBtn = styled.button`
  border: 1px solid;
  border-radius: 5px;
  background-color: ${colors.white};
`;


