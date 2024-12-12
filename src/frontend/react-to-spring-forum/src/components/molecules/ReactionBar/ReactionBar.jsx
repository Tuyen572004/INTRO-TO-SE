import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import CommentForm from "../CommentForm/CommentForm";
import { Link } from "react-router-dom";

import s from "./style.module.css";
import { ReactAPI } from "../../../api/ReactAPI";
import {
    decrement,
    increment,
    updateReactStatus
} from "../../../store/reactCounterSlice";

const ReactBar = ({ postId }) => {
    const commentCounter = useSelector(state => state.commentCounterSlice.commentCounter);
    const reactCounter = useSelector(state => state.reactCounterSlice.reactCounter);
    const reactedPosts = useSelector(state => state.reactCounterSlice.reactedPosts);
    const dispatch = useDispatch();

    console.log('reactedPosts:', reactedPosts[postId]);

    const [showCommentModal, setShowCommentModal] = useState(false);

    const handleCommentClick = () => {
        setShowCommentModal(true);
    };

    const handleCloseCommentModal = () => {
        setShowCommentModal(false);
    };

    const handleReactClick = async () => {
        try {
            if (reactedPosts[postId]) {
                await ReactAPI.delete(postId);
                dispatch(decrement(postId));
                dispatch(updateReactStatus({ postId, isReacted: false }));
            } else {
                await ReactAPI.create(postId);
                dispatch(increment(postId));
                dispatch(updateReactStatus({ postId, isReacted: true }));
            }
        } catch (error) {
            console.error("Error handling react:", error);
        }
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.reaction} onClick={handleReactClick}>
                    {reactedPosts[postId] ? (
                        <FaHeart className={s.reacted + s.reactIcon} style={{ color: 'red' }} />
                    ) : (
                        <FaRegHeart className={s.reactIcon} />
                    )}
                    <span>{reactCounter[postId] || 0}</span>
                </div>
                <Link to={`/post/${postId}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div className={s.reaction} onClick={handleCommentClick}>
                        <FaRegComment className={s.reactIcon} />
                        <span>{commentCounter[postId] || 0}</span>
                    </div>
                </Link>
                <div className={s.reaction}>
                    <PiShareFat className={s.reactIcon} />
                </div>
            </div>

            <CommentForm
                show={showCommentModal}
                onClose={handleCloseCommentModal}
                postId={postId}
            />
        </>
    );
};

export default ReactBar;