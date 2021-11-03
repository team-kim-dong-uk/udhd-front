import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Image from 'next/image'
import logo from '../../../assets/drawable-hdpi/symbol_black.webp';
import backIcon from '../../../assets/drawable-hdpi/5337.webp';
import { logout } from '../../core/redux/auth';
import { colors } from '../../util/style';
import {useCallback} from "react";
import { useRouter } from 'next/router';
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../util/amplitude';

const TopBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  const tryLogout = useCallback(() =>{
      if (confirm("로그아웃 하시겠습니까?"))
        initAmplitude();
        setAmplitudeUserId(auth.data?.userId);
        sendAmplitudeData("logout");
        dispatch(logout())
  }, []);
  
  return (
    <S.Navbar fixed="top" bg="light" expand="lg">
      <Navbar.Brand>
        {
          router.pathname.startsWith('/search/related') || router.pathname.startsWith('/mypage/')
          ?
          <S.BackButtonWrap>
              <S.Image src={backIcon} width={15} height={30} onClick={()=>router.back()}/>
              </S.BackButtonWrap>
            :
              <S.Image onClick={() => router.push('/feed')} src={logo} width={30} height={30}/>

        }
        </Navbar.Brand>

        <S.Text>Beta</S.Text>
        <Nav.Link onClick={() => window.open('https://the-form.io/forms/survey/response/7583c560-6af5-4cf7-a5d3-287bd1cc126a')}>
            <S.Login>문의</S.Login>
        </Nav.Link>
      <Nav>
        {auth.data ?
        <S.Logout onClick={tryLogout}>로그아웃</S.Logout>
        : <Link href="/login" passHref>
          <Nav.Link>
            <S.Login>로그인</S.Login>
          </Nav.Link>
        </Link>
        }
      </Nav>
    </S.Navbar>
  );
};

const S = {};
S.Navbar = styled(Navbar)`
  background-color: ${colors.white} !important;
  height:56px;
`;
S.Logout = styled.div`
  color: ${colors.grey};
`;
S.Login = styled.div`
  color: ${colors.orange};
`;
S.BackButtonWrap = styled.div`
  padding-right: 15px;
`;
S.Icon = styled.p`
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
S.Image = styled(Image)`
    cursor: pointer;
`;
S.Text = styled.div`
  flex-grow: 1;
  text-align: left;
  align-items: center;
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 7px;
`;
S.Opinion = styled.div`
  flex-grow: 1;
  text-align: right;
  padding-right: 1rem;
  
`;

export default TopBar;
