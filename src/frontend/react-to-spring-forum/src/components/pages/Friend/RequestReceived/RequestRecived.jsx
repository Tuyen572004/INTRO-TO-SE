import { useContext, useEffect, useState } from "react";
import Loading from "../../../atoms/Loading/Loading";
import { AddFriendAPI } from "../../../../api/AddFriendAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";
import s from "./style.module.css";
import AddFriendRequestItem from "../../../molecules/AddFriendRequestItem/AddFriendRequestItem";
import { NotificationContext } from "../../../../context/NotificationContext";

const RequestReceived = () => {
  const notificationHandle = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchRequestReceived = async () => {
    try {
      const response = await AddFriendAPI.getFriendRequests("RECEIVED", page);
      console.log(response);
      notificationHandle.setRequestReceived((prevRequests) => [
        ...prevRequests,
        ...response.data,
      ]);

      setPage(page + 1);
      setHasMore(page < response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequestReceived().then(() => {
      setLoading(false);
      console.log(notificationHandle.requestReceived);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={s.container} id="request-received">
      {notificationHandle.requestReceived.length > 0 ? (
        <InfiniteScroll
          dataLength={notificationHandle.requestReceived.length}
          next={fetchRequestReceived}
          hasMore={hasMore}
          loader={
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }
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
    </div>
  );
};

export default RequestReceived;
