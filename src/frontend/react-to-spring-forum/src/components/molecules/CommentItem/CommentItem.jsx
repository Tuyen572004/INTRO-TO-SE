import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../../atoms/CustomToggle/CustomToggle";
import { Heart, MessageCircle, Send } from "lucide-react";
import EditCommentModal from "../EditCommentModal/EditCommentModal";
import ConfirmDeleteModal from "../../atoms/ConfirmDeleteModal/ConfirmDeleteModal";
import { CommentAPI } from "../../../api/CommentAPI";
import {useDispatch, useSelector} from "react-redux";
import { removeComment } from "../../../store/commentSlice";
import UserIcon from './../../../assets/User_Icon.png';
import { formatDistanceToNow } from "date-fns";
import Swal from "sweetalert2";
import s from "./style.module.css";
import {useNavigate} from "react-router-dom";

function CommentItem({ comment }) {
    const user = useSelector((state) => state.userSlice.user);
    const myId = user.userId;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        // await CommentAPI.delete(comment.id);
        // dispatch(removeComment(comment.id));
        //
        // setShowDeleteModal(false);

        try {
            await CommentAPI.delete(comment.id);
            dispatch(removeComment(comment.id));
            setShowDeleteModal(false);

            await Swal.fire({
                icon: "success",
                title: "Comment deleted!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "An error occurred!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const navigateToProfile = () => {
        if (myId === comment.user.id) {
            navigate('/my-account');
        } else {
            navigate(`/user/${comment.user.id}`);
        }
    }

    return (
        <div className={s.commentContainer}>
            <div className={s.avatar} onClick={navigateToProfile}>
                {comment.user.avatar ? (
                    <img src={comment.user.avatar} alt={comment.user.name}/>
                ) : (
                    <img src={UserIcon} alt={comment.user.name}/>
                )}
            </div>

            <div className={s.contentWrapper}>
                <div className={s.header}>
                    <div className={s.userInfo}>
                        <span className={s.name} onClick={navigateToProfile}>{comment.user.name}</span>
                        <span className={s.username} onClick={navigateToProfile}>@{comment.user.username}</span>
                        <span className={s.createdDate}>
                            {formatDistanceToNow(new Date(comment.createdDate), { addSuffix: true })}
                        </span>
                    </div>

                    {myId === comment.user.id ? (
                        <Dropdown className={s.dropdown}>
                            <Dropdown.Toggle as={CustomToggle} />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleEditClick}> Edit </Dropdown.Item>
                                <Dropdown.Item onClick={handleDeleteClick}> <span style={{color: "red"}}>Delete</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Dropdown className={s.dropdown}>
                            <Dropdown.Toggle as={CustomToggle} />
                            <Dropdown.Menu>
                                <Dropdown.Item> Report </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </div>

                <div className={s.content}>{comment.content}</div>
                <div className={s.imageList}>
                    {(comment.imageList || []).map((image, index) => (
                        <img className={s.imageItem} key={index} src={image} alt={comment.content} />
                    ))}
                </div>

                <div className={s.engagementMetrics}>
                    <div className={s.metricItem}>
                        <Heart className={s.metricIcon} size={20} />
                        <span className={s.metricCount}>0</span>
                    </div>
                    <div className={s.metricItem}>
                        <MessageCircle className={s.metricIcon} size={20} />
                        <span className={s.metricCount}>0</span>
                    </div>
                    <div className={s.metricItem}>
                        <Send className={s.metricIcon} size={20} />
                        <span className={s.metricCount}>0</span>
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