import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AllPosts from "./pages/AllPosts";
import MyPosts from "./pages/MyPosts";
import { useAuth } from "./context/AuthContext";
function App({ postService }) {
    // postService main.jsx에서 오는것
    const history = useNavigate();
    const { user, logOut } = useAuth();
    const onAllPosts = () => {
        history("/");
    };
    const onMyPosts = () => {
        history(`/${user.userid}`);
    };
    const onLogout = () => {
        if (window.confirm("로그아웃을 하시겠습니까?")) {
            logOut();
            history("/");
        }
    };
    return (
        <div className="app">
            <Header
                userid={user.userid}
                onLogout={onLogout}
                onAllPosts={onAllPosts}
                onMyPosts={onMyPosts}
            />
            <Routes>
                (
                <>
                    <Route
                        exact
                        path="/"
                        element={<AllPosts postService={postService} />}
                    ></Route>
                    <Route
                        exact
                        path="/:userid"
                        element={<MyPosts postService={postService} />}
                    ></Route>
                </>
                )
            </Routes>
        </div>
    );
}
export default App;
