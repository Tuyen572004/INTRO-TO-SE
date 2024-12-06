import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import s from "./style.module.css";
import CommentForm from "../CommentForm/CommentForm";
import {useState} from "react";

const ReactBar = ({ reactions, postId }) => {

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
                        <FaHeart className={s.reacted}/>
                    ) : (
                        <FaRegHeart/>
                    )}
                    <span>{reactions?.totalReact}</span>
                </div>
                <div className={s.reaction} onClick={handleCommentClick}>
                    <FaRegComment/>
                    <span>{reactions?.totalComment}</span>
                </div>
                <div className={s.reaction}>
                    <PiShareFat/>
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