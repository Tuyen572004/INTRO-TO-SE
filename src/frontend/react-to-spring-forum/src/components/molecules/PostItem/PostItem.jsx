import React, { useEffect, useState } from "react";
import s from "./style.module.css";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import ReactBar from "../ReactionBar/ReactionBar";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../../atoms/CustomToggle/CustomToggle";
import EditPostModal from "../EditPostModal/EditPostModal";
import ConfirmDeleteModal from "../../atoms/ConfirmDeleteModal/ConfirmDeleteModal";
import { PostAPI } from "../../../api/PostAPI";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../store/postSlice";
import { deleteMyPost } from "../../../store/myPostSlice";
import UserIcon from './../../../assets/User_Icon.png';
import { formatDistanceToNow } from "date-fns";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const PostItem = ({ post }) => {
    const auth = jwtDecode(localStorage.getItem('accessToken').toString());
    const myId = auth.user.userId;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const confirmDelete = async () => {
        const response = await PostAPI.delete(post.id);
        console.log('Delete response:', response);

        dispatch(deletePost(post.id));
        dispatch(deleteMyPost(post.id));
        setShowDeleteModal(false);
    };

    const navigateToProfile = () => {
        if (myId === post.user.id) {
            navigate('/my-account');
        } else {
            navigate(`/user/${post.user.id}`);
        }
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.header}>
                    <div className={s.avatar}>
                        <div className={s.inner_avatar} onClick={navigateToProfile}>
                            {post.user.avatar
                                ? <img src={post.user.avatar} alt={post.user.name} />
                                : <img src={UserIcon} alt={post.user.name} />}
                        </div>
                    </div>

                    <div className={s.user_information}>
                        <div className={s.inner_user_information} onClick={navigateToProfile}>
                            <div className={s.name}>
                                {post.user?.name}
                                <span className={s.postTime}>{formatDistanceToNow(new Date(post.createdDate), { addSuffix: true })}</span>
                            </div>
                            <div className={s.username}>@{post.user?.username}</div>
                        </div>
                        <div>
                            {myId === post.user.id ? (
                                <Dropdown className="dropdown">
                                    <Dropdown.Toggle as={CustomToggle} />
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleEditClick}>Edit</Dropdown.Item>
                                        <Dropdown.Item onClick={handleDeleteClick}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Dropdown className="dropdown">
                                    <Dropdown.Toggle as={CustomToggle} />
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Report</Dropdown.Item>
                                        <Dropdown.Item>Save</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </div>
                    </div>
                </div>

                <div className={s.title}>{post.title}</div>
                <div className={`${s.content} ${isExpanded ? s.expandedContent : ""}`}>
                    {post.content}
                </div>
                {post.content.length > 100 && (
                    <span className={s.readMore} onClick={toggleReadMore}>
                        {isExpanded ? "show less" : "read more"}
                    </span>
                )}

                <div className={s.image_list}>
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination]}
                        className="mySwiper"
                    >
                        {post.imageList?.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image} alt={post.title} style={{ width: '100%' }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <ReactBar postId={post?.id} />
            </div>

            <EditPostModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                post={post}
            />

            <ConfirmDeleteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </>
    );
};

export default PostItem;