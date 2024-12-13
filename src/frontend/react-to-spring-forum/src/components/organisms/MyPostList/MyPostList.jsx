import React, { useEffect, useState } from "react";
import PostItem from "../../molecules/PostItem/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import NewPost from "../../molecules/NewPost/NewPost";
import PostForm from "../../molecules/PostForm/PostForm";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { setMyPosts } from "../../../store/myPostSlice";
import { PostAPI } from "../../../api/PostAPI";
import { OrbitProgress } from "react-loading-indicators";
import { v4 } from "uuid";

const MyPostList = ({ scrollableTarget }) => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const myPosts = useSelector((state) => state.myPostSlice.myPosts);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const response = await PostAPI.getMyPosts(page);
                if (response.length === 0) {
                    setHasMore(false);
                } else {
                    dispatch(setMyPosts([...myPosts, ...response]));
                }
            } catch (error) {
                console.error("Error fetching my posts:", error);
            }
        };

        fetchMyPosts().then(() => setLoading(false));
    }, [page]);

    const loadMorePosts = () => {
        setPage((prevPage) => prevPage + 1);
    };

    if (loading) {
        return (
            <div className="text-center">
                <OrbitProgress variant="disc" dense color="#000000" size="small" text="" textColor="" />
            </div>
        );
    }

    return (
        <div>
            <NewPost />

            <InfiniteScroll
                dataLength={myPosts.length}
                next={loadMorePosts}
                hasMore={hasMore}
                loader={
                    <div className="text-center">
                        <OrbitProgress variant="disc" dense color="#000000" size="small" text="" textColor="" />
                    </div>
                }
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                scrollableTarget={scrollableTarget}
            >
                {myPosts.map((post) => (
                    <PostItem key={v4()} post={post} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default MyPostList;