import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Nav } from 'react-bootstrap';
import { BsImages, BsSearch, BsPerson } from 'react-icons/bs';
import styled from 'styled-components';

const Bottombar = () => {
  const router = useRouter();
  return (
    <S.Navbar fixed="bottom">
      <S.Nav justify="true" activeKey={router.pathname}>
        <Link href="/feed" passHref>
          <Nav.Link>
            <BsImages />
            <div>피드</div>
          </Nav.Link>
        </Link>
        <Link href="/search" passHref>
          <Nav.Link>
            <BsSearch />
            <div>검색</div>
          </Nav.Link>
        </Link>
        <Link href="/mypage" passHref>
          <Nav.Link>
            <BsPerson />
            <div>내 정보</div>
          </Nav.Link>
        </Link>
      </S.Nav>
    </S.Navbar>
  );
};

const S = {};
S.Navbar = styled(Navbar)`
box-shadow: 0px -3px rgba(100, 100, 100, 0.25);
background-color: white;
`;

S.Nav = styled(Nav)`
width: 100%;
`;

export default Bottombar;
