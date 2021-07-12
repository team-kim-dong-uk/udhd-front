import Navbar from '../../common/Navbar';
import Bottombar from '../../common/BottomBar';
import styled from 'styled-components';
export default function HomeLayout({ children, ...props}) {
  return (
    <S.Container {...props}>
      <Navbar/>
      {children}
      <Bottombar/>
    </S.Container>
  );
}

const S = {};
S.Container = styled.div`
`;
