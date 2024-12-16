import { useLocation } from "react-router-dom";
import s from "./style.module.css";
import {useEffect, useState} from "react";
import {PostAPI} from "../../../api/PostAPI";
import Spinner from 'react-bootstrap/Spinner';
import PostItem from "../../molecules/PostItem/PostItem";

const Search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get("title");

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const fetchPosts = async () => {
                try {
                    const response = await PostAPI.searchPostsByTitle(title);
                    console.log(response);
                    setPosts(response);
                } catch (error) {
                    console.error(error);
                }
            }
            fetchPosts().then(() => setLoading(false));
        }, 1000);
    }, [location.search]);

    if (loading) {
        return (
            <div className={s.loading_container}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
            <div className={s.container}>
                {title ? (
                    <>
                        <div className={s.search_title}>Results for "{title}"</div>
                        {posts && posts.length === 0 ? (
                            <div>There are no results for "{title}"</div>
                        ) : (
                            posts && posts.map((post) => (
                                <PostItem key={post._id} post={post} />
                            ))
                        )}
                    </>
                ) : (
                    <div className={s.warning}>Please enter a search term</div>
                )}
            </div>
        </>
    );
};

export default Search;