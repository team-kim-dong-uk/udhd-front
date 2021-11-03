import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addFeedComment, deleteFeedComment } from '../../../core/redux/feed';
import { colors } from '../../../util/style';
import useInput from "../../../hooks/useInput";
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../../util/amplitude';

export default function CommentBox({data}) {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const [comment, onCommentChange, setComment] = useInput('');
  const [commentDisabled, setCommentDisabled] = useState(true);
  const [showAllComments, setShowAllComments] = useState(data.comments?.length <= 2);

  useEffect(() => {
    let clearComment = comment.replace(/\s/g, "");
    let isDisable = !(clearComment != '' && clearComment != null)
    setCommentDisabled(isDisable);
  }, [comment, commentDisabled])

  const onAddComment = (feedId) => {
    initAmplitude();
    setAmplitudeUserId(auth.data?.userId);
    sendAmplitudeData("add comment", {"feedId": feedId});
    dispatch(addFeedComment.request({ feedId: feedId, content: comment}));
    setComment('');
  }

  const onDeleteComment = (feedId, commentId) => {
    initAmplitude();
    setAmplitudeUserId(auth.data?.userId);
    sendAmplitudeData("delete comment", {"feedId": feedId});
    dispatch(deleteFeedComment.request({ feedId, commentId }));
  }

  return (
      <S.CommentBox>
        {!showAllComments && (
            data.comments?.slice(0,2).map(comment => (
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
            ))
        )}
        {showAllComments && (
            data.comments?.map(comment => (
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
            ))
        )}

        {!showAllComments && data.comments?.length !== 0 &&
          <S.SmallTextButton onClick={() => setShowAllComments(true)}>{data.comments?.length}개의 댓글 모두 보기</S.SmallTextButton>
        }
        {showAllComments && data.comments?.length > 2 &&
          <S.SmallTextButton onClick={() => setShowAllComments(false)}>댓글 접기</S.SmallTextButton>
        }
        <S.Line/>
        <S.NewComment>
          <S.CommentInput
            placeholder='댓글 달기...'
            value={comment}
            onChange={onCommentChange}
          />
          {commentDisabled && <S.DisabledComment disabled={true}>등록</S.DisabledComment>}
          {!commentDisabled && <S.SubmitComment onClick={() => onAddComment(data.id)} disabled={commentDisabled}>등록</S.SubmitComment>}
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
  &:focus {
    outline: none;
  }
`;
S.SubmitComment = styled.button`
  //border-top-right-radius: 5px;
  //border-bottom-right-radius: 5px;
  border: none;
  height: 2rem;
  color: ${colors.orange};
  //border-color: ${colors.orange};
  //background-color: ${colors.orange};
  background-color: ${colors.white};
  padding: 0.5rem;
`;
S.DisabledComment = styled.button`
  border: none;
  height: 2rem;
  color: ${colors.grey};
  background-color: ${colors.white};
  padding: 0.5rem;
`;
S.DeleteBtn = styled.button`
  border: none;
  //border: 1px solid;
  border-radius: 5px;
  background-color: ${colors.white};
  color: ${colors.grey};
`;
S.Line = styled.div`
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #d0d0d0;
`;
S.SmallTextButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${colors.white};
  color: ${colors.grey};
  padding-left: 0px;
  font-size: 0.9rem;
`;
