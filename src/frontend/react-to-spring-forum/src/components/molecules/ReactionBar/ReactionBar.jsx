import { useState, useEffect } from "react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ReactAPI } from "../../../api/ReactAPI";
import { PostAPI } from "../../../api/PostAPI";
import s from "./style.module.css";
import {useSelector} from "react-redux";

const ReactBar = ({ postId }) => {
    const [post, setPost] = useState(null);
    const reloadReactBar = useSelector(state => state.commentSlice.reloadReactBar);

    const fetchPost = async () => {
        try {
            const response = await PostAPI.get(postId);
            setPost(response.data);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };
  
    useEffect(() => {
        fetchPost();
    }, [postId, reloadReactBar]);

    const handleReactClick = async () => {
        try {
            if (post.isReacted) {
                await ReactAPI.delete(postId);
            } else {
                await ReactAPI.create(postId);
            }
            fetchPost();
        } catch (error) {
            console.error("Error handling react:", error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className={s.container}>
            <div className={s.reaction} onClick={handleReactClick}>
                {post.isReacted ? (
                    <FaHeart className={s.reacted + ' ' + s.reactIcon} />
                ) : (
                    <FaRegHeart className={s.reactIcon} />
                )}
                <span>{post.reactCounts}</span>
            </div>
            <Link to={`/post/${postId}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className={s.reaction}>
                    <FaRegComment className={s.reactIcon} />
                    <span>{post.commentCounts}</span>
                </div>
            </Link>
            <div className={s.reaction}>
                <PiShareFat className={s.reactIcon} />
            </div>
        </div>
    );
};

export default ReactBar;