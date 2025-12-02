import {
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useState,
    createContext,
    createRef,
    useMemo,
} from "react";

import Header from "../components/Header";
import Login from "../pages/Login";

// 전역 인증 저장소
const AuthContext = createContext({});

// 외부에서 토큰 접근 서포트
const contextRef = createRef();

export function AuthProvider({ authService, authErrorEventBus, children }) {
    // 로그인 사용자의 상태 저장
    const [user, setUser] = useState(undefined);

    // 토큰을 외부에서 꺼냄
    useImperativeHandle(contextRef, () => (user ? user.token : undefined));

    // 인증 에러 발생 시 자동으로 로그아웃 되도록
    useEffect(() => {
        authErrorEventBus.listen((err) => {
            console.log(err);
            setUser(undefined);
        });
    }, [authErrorEventBus]); // authErrorEventBus가 있을 때만 갱신

    // 새로고침 또는 내 정보 요청 시 로그인 유지 확인
    useEffect(() => {
        authService.me().then(setUser).catch(console.error);
    }, [authService]);

    /* useCallback */

    const signUp = useCallback(
        async (userid, password, name, email, url) =>
            authService
                .signup(userid, password, name, email, url)
                .then((user) => setUser(user)),
        [authService]
    );

    const logIn = useCallback(
        async (userid, password) =>
            authService.login(userid, password).then((user) => setUser(user)),
        [authService]
    );

    const logOut = useCallback(
        async () => authService.logout().then(() => setUser(undefined)),
        [authService]
    );

    // 리렌더링 방지
    const context = useMemo(
        () => ({ user, signUp, logIn, logOut }),
        [user, signUp, logIn, logOut]
    );

    return (
        <AuthContext.Provider value={context}>
            {user ? (
                children
            ) : (
                <div className="app">
                    <Header />
                    <Login onSignUp={signUp} onLogin={logIn} />
                </div>
            )}
        </AuthContext.Provider>
    );
}

export class AuthErrorEventBus {
    listen(callback) {
        this.callback = callback;
    }
    notify(error) {
        this.callback(error);
    }
}

export default AuthContext;
export const useAuth = () => useContext(AuthContext); // hook
export const fetchToken = () => contextRef.current;
