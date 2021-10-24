import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Nav } from 'react-bootstrap';
import FeedIcon from '../../../assets/feed-icon.svg';
import FeedIconActive from '../../../assets/feed-icon-active.svg';
import SearchIcon from '../../../assets/search-icon.svg';
import SearchIconActive from '../../../assets/search-icon-active.svg';
import MypageIcon from '../../../assets/mypage-icon.svg';
import MypageIconActive from '../../../assets/mypage-icon-active.svg';
import styled from 'styled-components';

const Bottombar = () => {
  const router = useRouter();
  return (
    <S.Navbar fixed="bottom">
      <S.Nav justify="true" activeKey={router.pathname}>
        <Link href="/feed" passHref>
          <Nav.Link>
            {
              router.pathname === '/feed'
              ? <FeedIconActive/>
              : <FeedIcon/>
            }
          </Nav.Link>
        </Link>
        <Link href="/search" passHref>
          <Nav.Link>
            {
              router.pathname === '/search'
              ? <SearchIconActive/>
              : <SearchIcon/>
            }
          </Nav.Link>
        </Link>
        <Link href="/mypage" passHref>
          <Nav.Link>
            {
              router.pathname === '/mypage'
              ? <MypageIconActive/>
              : <MypageIcon/>
            }
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
