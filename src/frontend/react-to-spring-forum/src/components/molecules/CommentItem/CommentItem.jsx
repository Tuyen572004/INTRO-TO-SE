import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../../atoms/CustomToggle/CustomToggle";
import { Heart, MessageCircle, Send } from "lucide-react";
import EditCommentModal from "../EditCommentModal/EditCommentModal";
import ConfirmDeleteModal from "../../atoms/ConfirmDeleteModal/ConfirmDeleteModal";
import { setAuthToken } from "../../../api/PrivateAxios";
import { CommentAPI } from "../../../api/CommentAPI";
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from "../../../store/CommentSlice";
import useAuth from "../../../hooks/useAuth";

import s from "./style.module.css"

function CommentItem({ comment }) {
    const auth = useAuth();
    const dispatch = useDispatch();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    const handleEditClick = () => {
        setSelectedComment(comment);
        setShowEditModal(true);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        setAuthToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlNDZkZDY1Yi0zMmU0LTRkNTYtOGY3Mi1lNDBhNTc5NWZiYjciLCJzY29wZSI6IlJPTEVfVVNFUiIsImlzcyI6IlJlYWN0LVRvLVNwcmluZy1UZWFtIiwicmZJZCI6IjUxYWQ5NGM1LTRmMjQtNDczMi05NzQ0LWU4ZmU0Y2FhMzU1MCIsImV4cCI6MTczNjg1MDk0MSwiaWF0IjoxNzMzMjUwOTQxLCJqdGkiOiIzZDY4Y2VlMS00MzdkLTQ5NzItYmI4Zi04MjE1NzJiNzNlOTkifQ.1nJdb9HGs-0Zis1Nqdj0HBUI3LW_vmRrA3R7Zo7uV9GGkYxDrdayNAp2u_LlPDGH-WFoM85PnjFvn_lF886mlg")
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

            {showEditModal && (
                <EditCommentModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    comment={selectedComment}
                />
            )}

            {showDeleteModal && (
                <ConfirmDeleteModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
}

export default CommentItem;