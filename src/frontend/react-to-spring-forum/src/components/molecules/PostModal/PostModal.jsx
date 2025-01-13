import {Button, Dropdown, Modal} from 'react-bootstrap';
import s from "./style.module.css";
import UserIcon from "../../../assets/User_Icon.png";
import {formatDistanceToNow} from "date-fns";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCoverflow, Pagination} from "swiper/modules";
import React, {useState} from "react";
import {ReportPostAPI} from "../../../api/ReportPostAPI";

const PostModal = ({ post, reportID, show, onHide, navigateToPost, setViolatingPosts }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const handleReportResponse = async (event, status) => {
        event.stopPropagation();
        try {
            const response = await ReportPostAPI.reportResponse(
                {
                    reportId: reportID,
                    isAccepted: status,
                }
            );
            onHide();

            setViolatingPosts((prev) =>
                prev.filter((item) => item.postId !== post.postId)
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Modal show={show} onHide={onHide} centered size={"lg"} className="post-modal">
            <Modal.Header closeButton>
                <Modal.Title className={s.modalTitle}>
                    Posted by {post.user.name}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body">
                <div className={s.container}>
                    <div className={s.header}>
                        <div className={s.avatar}>
                            <div className={s.inner_avatar} onClick={() => navigateToPost(post.user.id)}>
                                {post.user.avatar ? (
                                    <img src={post.user.avatar} alt={post.user.name}/>
                                ) : (
                                    <img src={UserIcon} alt={post.user.name}/>
                                )}
                            </div>
                        </div>

                        <div className={s.user_information}>
                            <div className={s.inner_user_information}>
                                <div className={s.name}>
                                <span className={s.fullName} onClick={() => navigateToPost(post.user.id)}>
                                  {post.user?.name}
                                </span>
                                    <span className={s.postTime}>
                                    {formatDistanceToNow(new Date(post.createdDate), {
                                        addSuffix: true,
                                    })}
                                </span>
                                </div>
                                <div className={s.username} onClick={() => navigateToPost(post.user.id)}>
                                    @{post.user?.username}
                                </div>
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
                                    <img src={image} alt={post.title} style={{width: "100%"}}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="dark" onClick={onHide}>
                    Close
                </Button>
                <Button variant="outline-dark" onClick={(e) => handleReportResponse(e, false)}>
                    Ignore
                </Button>
                <Button variant="outline-danger" onClick={(e) => handleReportResponse(e, true)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PostModal;