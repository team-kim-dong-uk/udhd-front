import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Image from 'next/image'
import logo from '../../../assets/drawable-xhdpi/symbol_black.webp';
import { logout } from '../../core/redux/auth';
import { colors } from '../../util/style';

const TopBar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  return (
    <S.Navbar fixed="top" bg="light" expand="lg">
      <Navbar.Brand>
        <S.Image src={logo} width={30} height={30}/>
      </Navbar.Brand>
      <Nav>
        {auth.data ? 
        <S.Logout onClick={()=>dispatch(logout())}>로그아웃</S.Logout>
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
`;
S.Logout = styled.div`
  color: ${colors.grey};
`;
S.Login = styled.div`
  color: ${colors.orange};
`;
S.Image = styled(Image)`
`;

export default TopBar;
