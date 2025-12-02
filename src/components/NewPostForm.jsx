import React, { useState } from "react";

const NewPostForm = ({ postService, onError }) => {
    const [post, setPost] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        postService
            .createPost(post)
            .then((created) => {
                setPost("");
            })
            .catch(onError);
    };

    const onChange = (e) => {
        setPost(e.target.value);
    };

    return (
        <form className="post-form" onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="포스트를 등록하세요"
                value={post}
                required
                autoFocus
                onChange={onChange}
                className="form-input post-input"
            />
            <button type="submit" className="form-btn">
                post
            </button>
        </form>
    );
};

export default NewPostForm;
