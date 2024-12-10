import React, { useState } from "react";
import PostItem from "../../molecules/PostItem/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import NewPost from "../../molecules/NewPost/NewPost";
import PostForm from "../../molecules/PostForm/PostForm";
import s from "./style.module.css";
import {useSelector} from "react-redux";
import { AnimatePresence } from "framer-motion";
import { v4 } from "uuid";

const PostList = ({ loadMorePosts, hasMore }) => {
    const posts = useSelector((state) => state.postSlice.posts);

    const [isPostPopup, setIsPostPopup] = useState(false);

    const toggleIsPostPopup = () => {
        setIsPostPopup(!isPostPopup);
    };

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
                    <PostItem key={v4()} post={post} />
                ))}
            </InfiniteScroll>

            <AnimatePresence>
                {isPostPopup && <PostForm toggleIsPostPopup={toggleIsPostPopup} />}
            </AnimatePresence>
        </div>
    );
};

export default PostList;