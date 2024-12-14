import React, {createContext, useEffect, useState} from "react";
import PostList from "../../organisms/PostList/PostList";
import s from "./style.module.css";
import { PostAPI } from "../../../api/PostAPI";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "../../../store/postSlice";

const Dashboard = () => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const posts = useSelector((state) => state.postSlice.posts);
    const dispatch = useDispatch();

    const fetchPosts = async (page) => {
        try {
            const response = await PostAPI.getAll(page);
            if (response.length === 0) {
                setHasMore(false);
            } else {
                dispatch(setPosts([...posts, ...response]));
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const loadMorePosts = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className={s.container}>
            <PostList loadMorePosts={loadMorePosts} hasMore={hasMore}/>
        </div>
    );
};

export default Dashboard;