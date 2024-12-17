import {useEffect} from "react";
import PostItem from "../../molecules/PostItem/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { appendMyPosts } from "../../../store/myPostSlice";
import { PostAPI } from "../../../api/PostAPI";
import Spinner from "react-bootstrap/Spinner";

const MyPostList = ({ scrollableTarget }) => {
    const dispatch = useDispatch();
    const { myPosts, hasMore, page } = useSelector((state) => state.myPostSlice);

    const fetchMyPosts = async () => {
        try {
            const response = await PostAPI.getMyPosts(page);
            dispatch(
                appendMyPosts({
                    posts: response.data,
                    hasMore: page < response.totalPages,
                    nextPage: page + 1
                })
            );
        } catch (error) {
            console.error("Error fetching my posts:", error);
        }
    };

    useEffect(() => {
        if (myPosts.length === 0) {
            fetchMyPosts();
        }
    }, [myPosts.length]);

    return (
        <div>
            <InfiniteScroll
                dataLength={myPosts.length}
                next={fetchMyPosts}
                hasMore={hasMore}
                loader={
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
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
                    <PostItem key={post.id} post={post} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default MyPostList;