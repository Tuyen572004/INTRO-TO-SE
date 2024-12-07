import React, {createContext, useEffect, useState} from "react";
import PostList from "../../organisms/PostList/PostList";
import s from "./style.module.css";
import { PostAPI } from "../../../api/PostAPI";

export const postListContext = createContext();

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = async (page) => {
        try {
            const response = await PostAPI.getAll(page);
            if (response.length === 0) {
                setHasMore(false);
            } else {
                setPosts(prevPosts => [...prevPosts, ...response]);
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
            <postListContext.Provider value={{posts, setPosts}}>
                <PostList loadMorePosts={loadMorePosts} hasMore={hasMore}/>
            </postListContext.Provider>
        </div>
    );
};

export default Dashboard;