import {useEffect, useState} from "react";
import PostItem from "../../molecules/PostItem/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import s from "./style.module.css";
import {PostAPI} from "../../../api/PostAPI";
import Spinner from "react-bootstrap/Spinner";
import {v4} from "uuid";

const MyPostList = ({ scrollableTarget, userId }) => {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await PostAPI.getPostsByUserId(userId, page);

            console.log(response);

            setPosts([...posts, ...response.data]);
            setPage(page + 1);
            setHasMore(page < response.totalPages);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMore}
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
    );
}

export default MyPostList;