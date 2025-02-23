import ActivityItem from "../../molecules/ActivityItem/ActivityItem";
import s from "./style.module.css";
import { useContext, useEffect, useState } from "react";
import { NotificationAPI } from "../../../api/NotificationAPI";
import Loading from "../../atoms/Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";
import { v4 } from "uuid";
import { NotificationContext } from "../../../context/NotificationContext";
import LoadingContent from "../../atoms/LoadingContent/LoadingContent";

const ActivityList = () => {
  const handleNotification = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchActivities = async () => {
    try {
      const response = await NotificationAPI.getNotifications(page);
      handleNotification.setActivities((prevActivities) => {
        const mergedActivities = [...prevActivities, ...response.data];

        const uniqueActivities = Array.from(
          new Set(mergedActivities.map((item) => item.id))
        ).map((id) => mergedActivities.find((item) => item.id === id));

        return uniqueActivities;
      });

      setPage(page + 1);
      setHasMore(page < response.totalPages);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchActivities().then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await NotificationAPI.getNotifications(page);
        handleNotification.setActivities(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={s.activity_list} id="activity-list">
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "50%" }}
        >
          <Loading />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={handleNotification.activities.length}
          next={fetchActivities}
          hasMore={hasMore}
          loader={<LoadingContent />}
          scrollableTarget="activity-list"
        >
          {handleNotification.activities.map((activity) => (
            <ActivityItem key={v4()} activity={activity} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ActivityList;
