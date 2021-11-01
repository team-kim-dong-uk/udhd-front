import styled from 'styled-components';
export default function DesktopLayout({ children, ...props }) {
    return (
        <S.Container {...props}>
            <S.Mobile>
                {children}
            </S.Mobile>
        </S.Container>
    );
}

const S = {};
S.Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //padding: 40px;
  background-color: #fafafa; 
  min-height: 100%;
`;
S.Mobile = styled.div`
  position: relative;
  flex: 1;
  background-color:#fafafa;
  max-width: 400px;
  //border: solid #ababab;
`;
