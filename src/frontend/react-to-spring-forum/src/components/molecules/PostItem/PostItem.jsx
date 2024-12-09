import React, {useContext, useState} from "react";
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
import {PostAPI} from "../../../api/PostAPI";
import {postListContext} from "../../pages/Dashboard/Dashboard";

const PostItem = ({ post }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { posts, setPosts } = useContext(postListContext);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        const response = await PostAPI.delete(post.id);
        console.log(response);
        const newPosts = posts.filter((p) => p.id !== post.id);
        setPosts(newPosts);
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className={s.container}>
                <div className={s.header}>
                    <div className={s.avatar}>
                        <div className={s.inner_avatar}>
                            <img src={post.user?.avatar} alt={post.user?.name}/>
                        </div>
                    </div>

                    <div className={s.user_information}>
                        <div className={s.inner_user_information}>
                            <div className={s.name}>{post.user?.name}</div>
                            <div className={s.username}>{post.user?.username}</div>
                        </div>
                        <div>
                            <Dropdown className="dropdown">
                                <Dropdown.Toggle as={CustomToggle}/>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleEditClick}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={handleDeleteClick}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div className={s.title}>{post.title}</div>
                <div className={s.content}>{post.content}</div>
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
                                <img src={image} alt={post.title} style={{width: '100%'}}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <ReactBar reactions={post?.reactions} postId={post?.id}/>
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
