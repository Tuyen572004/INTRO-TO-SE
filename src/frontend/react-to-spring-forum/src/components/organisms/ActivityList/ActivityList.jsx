import ActivityItem from "../../molecules/ActivityItem/ActivityItem";
import s from "./style.module.css";
import {useEffect, useState} from "react";
import {NotificationAPI} from "../../../api/NotificationAPI";
import Loading from "../../atoms/Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";

const ActivityList = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchActivities = async () => {
        try {
            const response = await NotificationAPI.getNotifications();
            setActivities(response.data);

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
        <div className={s.activity_list}>
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
                scrollableTarget={"activity"}
                endMessage={
                    <p style={{textAlign: "center"}}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}

            </InfiniteScroll>
        </div>
    );
};

export default ActivityList;
