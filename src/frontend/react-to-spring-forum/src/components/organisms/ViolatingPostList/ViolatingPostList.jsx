import { useEffect, useState } from "react";
import ViolatingPostItem from "../../molecules/ViolatingPostItem/ViolatingPostItem";

import s from "./style.module.css";
import { ReportPostAPI } from "../../../api/ReportPostAPI";
import { v4 } from "uuid";
import Spinner from "react-bootstrap/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../atoms/Loading/Loading";

function ViolatingPostList() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const [violatingPosts, setViolatingPosts] = useState([]);

  const fetchViolatingPosts = async () => {
    try {
      const response = await ReportPostAPI.getReports(page);
      console.log(response);

      setViolatingPosts([...violatingPosts, ...response.data]);
      setPage(page + 1);
      setHasMore(page < response.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchViolatingPosts().then(() => setLoading(false));
  }, []);

  return (
    <div className={s.violatingPostList} id="violating-post-list">
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "50%" }}
        >
          <Loading />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={violatingPosts.length}
          next={fetchViolatingPosts}
          hasMore={hasMore}
          loader={
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
          scrollableTarget="violating-post-list"
        >
          {violatingPosts &&
            violatingPosts.map((violatingPost) => (
              <ViolatingPostItem
                key={v4()}
                item={violatingPost}
                setViolatingPosts={setViolatingPosts}
              />
            ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default ViolatingPostList;
