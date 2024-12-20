import {useEffect, useState} from "react";
import {AddFriendAPI} from "../../../../api/AddFriendAPI";
import Loading from "../../../atoms/Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";
import AddFriendRequestItem from "../../../molecules/AddFriendRequestItem/AddFriendRequestItem";

import s from './style.module.css'

const RequestSent = () => {
    const [requestSent, setRequestSent] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchRequestSent = async () => {
        try {
            const response = await AddFriendAPI.getFriendRequests("SENT", page);
            console.log(response);
            setRequestSent(prevRequests => [...prevRequests, ...response.data]);

            setPage(page + 1);
            setHasMore(page < response.totalPages);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRequestSent().then(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <div className={s.container} id="request-sent">
            {requestSent.length > 0 ? (
                <InfiniteScroll
                    dataLength={requestSent.length}
                    next={fetchRequestSent}
                    hasMore={hasMore}
                    loader={
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    }
                    scrollableTarget="request-sent"
                >
                    {requestSent.map((friend) =>
                        <AddFriendRequestItem key={friend.id} friend={friend} type={"SENT"} />
                    )}
                </InfiniteScroll>
            ) : (
                <div className={s.title}>No friend request sent</div>
            )}
        </div>
    )
}

export default RequestSent;