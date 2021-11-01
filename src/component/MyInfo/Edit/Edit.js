import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import useInput from "../../../hooks/useInput";
import {updateUser} from "../../../core/redux/auth";


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : [],
*   comments: [],
* }
* */
export default function Edit({data}) {
    const dispatch = useDispatch();
    const [nickname, onChangeNickname, setNickname] = useInput('');
    const onSubmit = useCallback(() => {
        dispatch(updateUser.request({
            userId: data?.userId,
            nickname: nickname,
            group: "테스트"
        }))
    }, [nickname])

    useEffect(() => {
      setNickname(data?.nickname);
    }, [])

  return (
<S.UserEdit>
    <S.ProfileData>
        <S.Line>
            <S.Text>{data?.nickname}입니당</S.Text>
            <S.Input value={nickname} onChange={onChangeNickname}/>
        </S.Line>
    </S.ProfileData>
    <S.ButtonContainer>
        <S.Button onClick={onSubmit}>제출</S.Button>
    </S.ButtonContainer>
</S.UserEdit>
  );
}

Edit.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.UserEdit = styled.div`
  display: flex !important;
  flex-direction: column;
  width: 100%;
`;
S.ProfileData = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;
S.Line = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

S.Text = styled.div`
  display: flex;
  flex-grow: 1;
  text-align: left;
  align-items: center;
  width: 100%;
  font-weight: bold;
  font-size: 1.5rem;
  padding-left: 5%;
  margin-bottom: 5px;
`;
S.Input = styled.input`
  display: flex;
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  width: 90%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  height: 2rem;
  padding: 12px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 18px;
  line-height: 1.33333333;

  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    //box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;
S.ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  padding: 5%;
`;
S.Button = styled.button`
  margin-bottom: 12px;
  width: 50px;
  height: 33px;
  max-width: 100%;
  color: #fff;
  background-color: #fbae17;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  
  //padding: 0 16px 3px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #fbae17;
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;
