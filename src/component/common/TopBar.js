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

export default TopBar;
