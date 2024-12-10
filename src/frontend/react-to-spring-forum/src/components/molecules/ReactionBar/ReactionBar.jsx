import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FaHeart, FaRegComment, FaRegHeart} from "react-icons/fa";
import {PiShareFat} from "react-icons/pi";
import CommentForm from "../CommentForm/CommentForm";
import {Link} from "react-router-dom";

import s from "./style.module.css";

const ReactBar = ({ reactions, postId }) => {
    const commentCounter = useSelector(state => state.commentCounterSlice.commentCounter);
    const dispatch = useDispatch();

    const [showCommentModal, setShowCommentModal] = useState(false);

    const handleCommentClick = () => {
        setShowCommentModal(true);
    };

    const handleCloseCommentModal = () => {
        setShowCommentModal(false);
    };

    return (
        <>
            <div className={s.container}>
                <div className={s.reaction}>
                    {reactions?.isReacted ? (
                        <FaHeart className={s.reacted + s.reactIcon}/>
                    ) : (
                        <FaRegHeart className={s.reactIcon}/>
                    )}
                    <span>{reactions?.totalReact}</span>
                </div>
                <Link to={`/post/${postId}`} style={{textDecoration: 'none', color: 'black'}}>
                    <div className={s.reaction} onClick={handleCommentClick}>
                        <FaRegComment className={s.reactIcon}/>
                        <span>{commentCounter[postId] || 0}</span>
                    </div>
                </Link>
                <div className={s.reaction}>
                    <PiShareFat className={s.reactIcon}/>
                    <span>{reactions?.totalShare}</span>
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