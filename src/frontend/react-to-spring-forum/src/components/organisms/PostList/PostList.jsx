import {useEffect} from "react";
import PostItem from "../../molecules/PostItem/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import NewPost from "../../molecules/NewPost/NewPost";
import s from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {appendPosts} from "../../../store/postSlice";
import {PostAPI} from "../../../api/PostAPI";
import Spinner from "react-bootstrap/Spinner";
import {v4} from "uuid";

const PostList = ({ scrollableTarget }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postSlice.posts);

    useEffect(() => {
        if (posts.length === 0) {
            fetchPosts();
        }
    }, [posts.length]);

    const fetchPosts = async () => {
        try {
            const response = await PostAPI.getAll();
            dispatch(appendPosts(response));
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    return (
        <div className={`${s.container} post_list`} id="post_list">
            <NewPost />

            <InfiniteScroll
                dataLength={posts.length}
                next={fetchPosts}
                hasMore={true}
                loader={
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                }
                endMessage={
                    <p style={{textAlign: "center"}}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                scrollableTarget={scrollableTarget}
            >
                {posts.map((post) => (
                    <PostItem key={v4()} post={post} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default PostList;