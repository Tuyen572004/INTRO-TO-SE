import ActivityItem from "../../molecules/ActivityItem/ActivityItem";
import s from "./style.module.css";
import {useEffect, useState} from "react";
import {NotificationAPI} from "../../../api/NotificationAPI";
import Loading from "../../atoms/Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";
import {v4} from "uuid";

const ActivityList = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchActivities = async () => {
        try {
            const response = await NotificationAPI.getNotifications(page);
            setActivities([...activities, ...response.data]);

            setPage(page + 1);
            setHasMore(page < response.totalPages);
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchActivities().then(() => setLoading(false));
    }, []);


    if (loading) {
        <Loading />
    }
    return (
        <div className={s.activity_list} id="activity-list">
            <InfiniteScroll
                dataLength={activities.length}
                next={fetchActivities}
                hasMore={hasMore}
                loader={
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                }
                scrollableTarget="activity-list"
            >
                {activities.map((activity) => (
                    <ActivityItem key={v4()} activity={activity} />
                ))}

            </InfiniteScroll>
        </div>
    );
};

export default ActivityList;
