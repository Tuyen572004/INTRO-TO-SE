import { useContext, useEffect, useState } from "react";
import Loading from "../../../atoms/Loading/Loading";
import { AddFriendAPI } from "../../../../api/AddFriendAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";
import s from "./style.module.css";
import AddFriendRequestItem from "../../../molecules/AddFriendRequestItem/AddFriendRequestItem";
import { NotificationContext } from "../../../../context/NotificationContext";
import LoadingContent from "../../../atoms/LoadingContent/LoadingContent";

const RequestReceived = () => {
  const notificationHandle = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const fetchRequestReceived = async () => {
    try {
      const response = await AddFriendAPI.getFriendRequests("RECEIVED", page);
      console.log("friend req", response);
      notificationHandle.setRequestReceived((prevRequests) => {
        const mergedRequests = [...prevRequests, ...response.data];

        const uniqueRequests = Array.from(
          new Set(mergedRequests.map((item) => item.id))
        ).map((id) => mergedRequests.find((item) => item.id === id));

        return uniqueRequests;
      });

      setPage(page + 1);
      setHasMore(page < response.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AddFriendAPI.getFriendRequests("RECEIVED", 1);
        notificationHandle.setRequestReceived(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={s.container} id="request-received">
      {notificationHandle.requestReceived.length > 0 ? (
        <InfiniteScroll
          dataLength={notificationHandle.requestReceived.length}
          next={fetchRequestReceived}
          hasMore={hasMore}
          loader={<LoadingContent />}
          scrollableTarget="request-received"
        >
          {notificationHandle.requestReceived.map((friend) => (
            <AddFriendRequestItem
              key={friend.id}
              friend={friend}
              type={"RECEIVED"}
            />
          ))}
        </InfiniteScroll>
      ) : (
        <div className={s.title}>No friend requests received.</div>
      )}

      {loading && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "50%" }}
        >
          <Loading />
        </div>
      )}
    </div>
  );
};

export default RequestReceived;
