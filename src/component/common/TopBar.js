import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Image from 'next/image'
import logo from '../../../assets/drawable-xhdpi/symbol_black.webp';
import { logout } from '../../core/redux/auth';
import { colors } from '../../util/style';
import {useCallback} from "react";

const TopBar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const tryLogout = useCallback(() =>{
      if (confirm("로그아웃 하시겠습니까?"))
        dispatch(logout())
  }, [])
  return (
    <S.Navbar fixed="top" bg="light" expand="lg">
      <Navbar.Brand>
        <S.Image src={logo} width={30} height={30}/>
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
S.Image = styled(Image)`
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
