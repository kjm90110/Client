import React, { useState } from "react";
import Banner from "../components/Banner";
const Login = ({ onSignUp, onLogin }) => {
    const [signup, setSignup] = useState(false);
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const onSubmit = (event) => {
        event.preventDefault();
        if (signup) {
            onSignUp(userid, password, name, email, url).catch(setError);
        } else {
            onLogin(userid, password).catch(setError);
        }
    };
    const setError = (error) => {
        setText(error.toString());
        setIsAlert(true);
    };
    const onChange = (event) => {
        const {
            target: { name, value, checked },
        } = event;
        switch (name) {
            case "userid":
                return setUserid(value);
            case "password":
                return setPassword(value);
            case "name":
                return setName(value);
            case "email":
                return setEmail(value);
            case "url":
                return setUrl(value);
            case "signup":
                return setSignup(checked);
        }
    };
    return (
        <>
            <Banner text={text} isAlert={isAlert} />
            <form className="auth-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="userid"
                    placeholder="아이디를 입력하세요"
                    value={userid}
                    onChange={onChange}
                    className="form-input"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={onChange}
                    className="form-input"
                    required
                />
                {signup && (
                    <input
                        type="text"
                        name="name"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={onChange}
                        className="form-input"
                        required
                    />
                )}
                {signup && (
                    <input
                        type="text"
                        name="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={onChange}
                        className="form-input"
                        required
                    />
                )}
                {signup && (
                    <input
                        type="url"
                        name="url"
                        placeholder="프로필 이미지주소를 입력하세요"
                        value={url}
                        onChange={onChange}
                        className="form-input"
                        required
                    />
                )}
                <div className="form-signup">
                    <input
                        name="signup"
                        id="signup"
                        type="checkbox"
                        onChange={onChange}
                        checked={signup}
                    />
                    <label htmlFor="signup">회원가입을 하시겠습니까?</label>
                </div>
                <button className="form-btn auth-form-btn" type="submit">
                    {signup ? "회원가입" : "로그인"}
                </button>
            </form>
        </>
    );
};

export default Login;
