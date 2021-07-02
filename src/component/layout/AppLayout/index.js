import styled from 'styled-components';
export default function AppLayout({ children, ...props}) {
  return <S.Container {...props}>{children}</S.Container>;
}

const S = {};
S.Container = styled.div`
`;
