import {useEffect, useState} from "react";
import Loading from "../../../atoms/Loading/Loading";
import {AddFriendAPI} from "../../../../api/AddFriendAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";

import s from './style.module.css'
import AddFriendRequestItem from "../../../molecules/AddFriendRequestItem/AddFriendRequestItem";

const RequestReceived = () => {
    const [requestReceived, setRequestReceived] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchRequestReceived = async () => {
        try {
            const response = await AddFriendAPI.getFriendRequests("RECEIVED", page);
            console.log(response);
            setRequestReceived(prevRequests => [...prevRequests, ...response.data]);

            setPage(page + 1);
            setHasMore(page < response.totalPages);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRequestReceived().then(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <div className={s.container} id="request-received">
            {requestReceived.length > 0 ? (
                <InfiniteScroll
                    dataLength={requestReceived.length}
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
                    {requestReceived.map((friend) =>
                        <AddFriendRequestItem key={friend.id} friend={friend} type={"RECEIVED"} />
                    )}
                </InfiniteScroll>
            ) : (
                <div className={s.title}>No friend requests received.</div>
            )}
        </div>
    )
}

export default RequestReceived;