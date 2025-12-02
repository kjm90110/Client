import { React, memo } from "react";

const Header = memo(({ userid, onLogout, onMyPosts, onAllPosts }) => {
    return (
        <header className="header">
            <div className="logo">
                <img src="./logo.png" alt="X Logo" className="logo-img" />
                <h1 className="logo-name">X</h1>
                {userid && <span className="logo-user">@{userid}</span>}
            </div>
            {userid && (
                <nav className="menu">
                    <button onClick={onAllPosts}>All Posts</button>
                    <button onClick={onMyPosts}>My Posts</button>
                    <button className="menu-item" onClick={onLogout}>
                        Logout
                    </button>
                </nav>
            )}
        </header>
    );
});

export default Header;
