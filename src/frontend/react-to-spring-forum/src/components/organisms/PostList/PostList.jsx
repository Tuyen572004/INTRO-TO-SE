import React, { useContext, useState, useEffect } from "react";
import PostItem from "../../molecules/PostItem/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { postListContext } from "../../pages/Dashboard/Dashboard";
import NewPost from "../../molecules/NewPost/NewPost";
import PostForm from "../../molecules/PostForm/PostForm";
import s from "./style.module.css";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

const PostList = ({ loadMorePosts, hasMore }) => {
    const { posts, setPosts } = useContext(postListContext);
    const newPost = useSelector((state) => state.postSlice.post);

    const [isPostPopup, setIsPostPopup] = useState(false);

    const toggleIsPostPopup = () => {
        setIsPostPopup(!isPostPopup);
    };

    useEffect(() => {
        if (newPost && Object.keys(newPost).length > 0) {
            setPosts((prevPosts) => [newPost, ...prevPosts]);
        }
    }, [newPost, setPosts]);

    return (
        <div className={`${s.container} post_list`} id="post_list">
            <NewPost toggleIsPostPopup={toggleIsPostPopup} />

            <InfiniteScroll
                dataLength={posts.length}
                next={loadMorePosts}
                hasMore={hasMore}
                loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                scrollableTarget="post_list"
            >
                {posts.map((post, index) => (
                    <PostItem key={post.id || index} post={post} />
                ))}
            </InfiniteScroll>

            <AnimatePresence>
                {isPostPopup && <PostForm toggleIsPostPopup={toggleIsPostPopup} />}
            </AnimatePresence>
        </div>
    );
};

export default PostList;