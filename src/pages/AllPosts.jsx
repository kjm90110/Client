import React from "react";
import Posts from "../components/Posts";

const AllPosts = ({ postService }) => {
    return <Posts postService={postService} addable={true} />;
};

export default AllPosts;
