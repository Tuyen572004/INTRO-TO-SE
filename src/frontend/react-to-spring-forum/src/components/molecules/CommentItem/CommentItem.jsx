import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../../atoms/CustomToggle/CustomToggle";
import { Heart, MessageCircle, Send } from "lucide-react";
import EditCommentModal from "../EditCommentModal/EditCommentModal";
import ConfirmDeleteModal from "../../atoms/ConfirmDeleteModal/ConfirmDeleteModal";
import { CommentAPI } from "../../../api/CommentAPI";
import { useDispatch } from "react-redux";
import { removeComment } from "../../../store/commentSlice";

import s from "./style.module.css"

function CommentItem({ comment }) {
    const dispatch = useDispatch();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        await CommentAPI.delete(comment.id);
        dispatch(removeComment(comment.id));
        setShowDeleteModal(false);
    };

    return (
        <div className={s.commentContainer}>
            <div>
                <img src={comment.user.avatar} alt={comment.user.name} className={s.avatar} />
            </div>

            <div className={s.contentWrapper}>
                <div className={s.header}>
                    <div className={s.userInfo}>
                        <span className={s.name}>{comment.user.name}</span>
                        <span className={s.username}>@{comment.user.username}</span>
                    </div>

                    <Dropdown className={s.dropdown}>
                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleEditClick}> Edit </Dropdown.Item>
                            <Dropdown.Item onClick={handleDeleteClick}> Delete </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className={s.content}>{comment.content}</div>
                <div className={s.imageList}>
                    {(comment.imageList || []).map((image, index) => (
                        <img className={s.imageItem} key={index} src={image} alt={comment.content} />
                    ))}
                </div>

                <div className={s.engagementMetrics}>
                    <div className={s.metricItem}>
                        <Heart className={s.metricIcon} size={20}/>
                        <span className={s.metricCount}>12</span>
                    </div>
                    <div className={s.metricItem}>
                        <MessageCircle className={s.metricIcon} size={20}/>
                        <span className={s.metricCount}>9</span>
                    </div>
                    <div className={s.metricItem}>
                        <Send className={s.metricIcon} size={20}/>
                        <span className={s.metricCount}>21</span>
                    </div>
                </div>
            </div>

            <EditCommentModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                comment={comment}
            />

            <ConfirmDeleteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}

export default CommentItem;