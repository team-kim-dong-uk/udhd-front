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
          <Nav.Link style={{padding: 0}}>
            <S.Icon>
            {
              router.pathname.startsWith('/feed')
              ? <FeedIconActive/>
              : <FeedIcon/>
            }
            </S.Icon>
          </Nav.Link>
        </Link>
        <Link href="/search" passHref>
          <Nav.Link style={{padding: 0}}>
            <S.Icon>
            {
              router.pathname.startsWith('/search')
              ? <SearchIconActive/>
              : <SearchIcon/>
            }
            </S.Icon>
          </Nav.Link>
        </Link>
        <Link href="/mypage" passHref>
          <Nav.Link style={{padding: 0}}>
          <S.Icon>
            {
              router.pathname.startsWith('/mypage')
              ? <MypageIconActive/>
              : <MypageIcon/>
            }
          </S.Icon>
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
  height: 30px;
`;
S.Icon = styled.p`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Bottombar;
