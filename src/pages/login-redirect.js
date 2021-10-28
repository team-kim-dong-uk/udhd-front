import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../core/redux/auth";
import { useEffect } from "react";

export default function LoginSuccessPage() {
  const router = useRouter();
  const { query: { userId, accessToken, refreshToken, nickname, isNewUser } } = router
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(!router.isReady) return;
    dispatch(loginSuccess({userId, accessToken, refreshToken, nickname, isNewUser}));
}, [router.isReady, dispatch]);

  return (
    <div>
        로그인 처리중입니다...
    </div>
  );
};