import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FaHeart, FaRegComment, FaRegHeart} from "react-icons/fa";
import {PiShareFat} from "react-icons/pi";
import CommentForm from "../CommentForm/CommentForm";
import {Link} from "react-router-dom";

import s from "./style.module.css";
import {ReactAPI} from "../../../api/ReactAPI";
import {decrement, increment} from "../../../store/reactCounterSlice";

const ReactBar = ({ postId, reacted, setReacted}) => {
    const commentCounter = useSelector(state => state.commentCounterSlice.commentCounter);
    const reactCounter = useSelector(state => state.reactCounterSlice.reactCounter);
    const dispatch = useDispatch();

    const [showCommentModal, setShowCommentModal] = useState(false);

    const handleCommentClick = () => {
        setShowCommentModal(true);
    };

    const handleCloseCommentModal = () => {
        setShowCommentModal(false);
    };

    const handleReactClick = async () => {
        if (reacted) {
            await ReactAPI.delete(postId);
            console.log("react deleted");
            setReacted(false);
            dispatch(decrement(postId));
        } else {
            await ReactAPI.create(postId);
            console.log("react created");
            setReacted(true);
            dispatch(increment(postId));
        }
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.reaction} onClick={handleReactClick}>
                    {reacted ? (
                        <FaHeart className={s.reacted + s.reactIcon} style={{color: 'red'}}/>

                    ) : (
                        <FaRegHeart className={s.reactIcon}/>

                    )}
                    <span>{reactCounter[postId] || 0}</span>
                </div>
                <Link to={`/post/${postId}`} style={{textDecoration: 'none', color: 'black'}}>
                    <div className={s.reaction} onClick={handleCommentClick}>
                        <FaRegComment className={s.reactIcon}/>
                        <span>{commentCounter[postId] || 0}</span>
                    </div>
                </Link>
                <div className={s.reaction}>
                    <PiShareFat className={s.reactIcon}/>
                    {/*<span>{reactions?.totalShare}</span>*/}
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