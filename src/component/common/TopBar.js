import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../core/redux/auth';

const TopBar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Navbar.Brand>Brand</Navbar.Brand>
      <Navbar.Toggle>Toggle</Navbar.Toggle>
      <Nav>
        {auth.data ? 
        <button onClick={()=>dispatch(logout())}>로그아웃</button>
        : <Link href="/login" passHref>
          <Nav.Link>
            <div>로그인</div>
          </Nav.Link>
        </Link>
        
        }
      </Nav>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link> Test </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
