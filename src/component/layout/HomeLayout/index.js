import Bottombar from '../../common/BottomBar';
import styled from 'styled-components';
import TopBar from '../../common/TopBar';
export default function HomeLayout({ children, ...props}) {
  return (
    <S.Container {...props}>
    <TopBar/>
      {children}
    <Bottombar/>
    </S.Container>
  );
}

const S = {};
S.Container = styled.div`
padding-top: 56px;
padding-bottom: 80px;
& .picker {
  height: 100% !important;
  width: 100% !important;
  top: 0 !important;
  color: red;
}
`;
