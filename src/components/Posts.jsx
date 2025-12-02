import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import NewPostForm from "./NewPostForm";
const Posts = memo(({ postService, userid, addable }) => {
    return (
        <>
            {addable && <NewPostForm postService={postService}></NewPostForm>}
            {/* {error && } */}
            {/* {Posts.length === 0 && <p className='posts-empty'>아직 포스트가 없습니다.</p>} */}
            <ul className="posts">포스트</ul>
        </>
    );
});
export default Posts;
