import { useEffect } from "react";
import PostItem from "../../molecules/PostItem/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { appendMyPosts } from "../../../store/myPostSlice";
import { PostAPI } from "../../../api/PostAPI";
import Spinner from "react-bootstrap/Spinner";
import Loading from "../../atoms/Loading/Loading";

const MyPostList = ({ scrollableTarget }) => {
  const dispatch = useDispatch();
  const { myPosts, hasMore, page } = useSelector((state) => state.myPostSlice);

  const fetchMyPosts = async () => {
    try {
      const response = await PostAPI.getMyPosts(page);
      console.log(response);
      dispatch(
        appendMyPosts({
          posts: response.data,
          hasMore: page < response.totalPages,
          nextPage: page + 1,
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
    <div className="my-post-list" id="my-post-list">
      <InfiniteScroll
        dataLength={myPosts.length}
        next={fetchMyPosts}
        hasMore={hasMore}
        loader={<Loading />}
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
