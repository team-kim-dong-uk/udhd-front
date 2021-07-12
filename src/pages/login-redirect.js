import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../core/redux/auth";
import Link from 'next/link';

export default function LoginSuccessPage() {
    const router = useRouter();
  const { query: { userId, accessToken, refreshToken } } = router
    const dispatch = useDispatch();
    dispatch(loginSuccess({userId, accessToken, refreshToken}));
  return (
    <div>
        로그인 처리중입니다...
        <Link href='/photo/456'>사진</Link>
    </div>
  );
};