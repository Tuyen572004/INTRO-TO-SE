import {useEffect, useState} from 'react';
import PostModal from "../../molecules/PostModal/PostModal";
import ViolatingPostItem from "../../molecules/ViolatingPostItem/ViolatingPostItem";

import s from './style.module.css';
import {ReportPostAPI} from "../../../api/ReportPostAPI";
import {v4} from "uuid";

function ViolatingPostList() {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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
    }

    useEffect(() => {
        fetchViolatingPosts();
    }, []);

    return (
        <div className={s.violatingPostList}>
            {violatingPosts && violatingPosts.map(violatingPost =>
                <ViolatingPostItem key={v4()} item={violatingPost}/>
            )}

        </div>
    );
}

export default ViolatingPostList;