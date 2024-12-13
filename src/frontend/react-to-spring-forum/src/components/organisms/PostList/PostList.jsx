import React, { useState } from "react";
import PostItem from "../../molecules/PostItem/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import NewPost from "../../molecules/NewPost/NewPost";
import s from "./style.module.css";
import {useSelector} from "react-redux";
import { v4 } from "uuid";

const PostList = ({ loadMorePosts, hasMore }) => {
    const posts = useSelector((state) => state.postSlice.posts);

    return (
        <div className={`${s.container} post_list`} id="post_list">
            <NewPost />

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
        </div>
    );
};

export default PostList;