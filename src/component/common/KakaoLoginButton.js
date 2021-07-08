import KakaoBtn from 'react-kakao-login';

const token = 'fde11efb174aa8fbd00248c364fe7070';
const KakaoLoginButton = () => {
  return (
    <KakaoBtn
      token={token}
      onSuccess={console.log}
      onFail={console.log}
      onLogout={console.log}
    />
  );
};

export default KakaoLoginButton;
