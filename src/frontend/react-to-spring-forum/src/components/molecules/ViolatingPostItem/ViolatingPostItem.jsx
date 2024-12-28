import React, {useState} from 'react';
import s from './style.module.css';
import PostModal from "../PostModal/PostModal";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function ViolatingPostItem({item, setViolatingPosts}) {
    const myProfile = useSelector((state) => state.userSlice.user);
    const myId = myProfile.userId;

    const [showPostModal, setShowPostModal] = useState(false);

    const post = item.post;
    const user = item.user;
    const reason = item.reason;

    const navigate = useNavigate();

    const navigateToPost = (id) => {
        if (myId === id) {
            navigate('/my-account');
        } else {
            navigate(`/user/${id}`);
        }
    }

    return (
        <>
            <div className={s.violatingPostItem}>
                <div className={s.postContainer}>
                    <div className={s.avatarWrapper}>
                        <img src={user.avatar} alt={user.name} className={s.avatar}/>
                    </div>

                    <div className={s.contentWrapper}>
                        <div className={s.header}>
                            <div className={s.userInfo}>
                                <span className={s.username}>
                                    <b onClick={() => navigateToPost(user.id)}>
                                        @{user.username}
                                    </b> reported the
                                    <b onClick={() => navigateToPost(post.user.id)}>
                                        @{post.user.username}
                                    </b>'s post
                                </span>
                            </div>

                        </div>

                        <div className={s.reason}>
                            <b>Reason: </b>{reason}
                        </div>
                    </div>

                    <div className={s.buttonBlack} onClick={() => setShowPostModal(true)}>
                        View Details
                    </div>
                </div>
            </div>

            <PostModal
                post={post}
                reportID={item.id}
                show={showPostModal}
                onHide={() => setShowPostModal(false)}
                navigateToPost={navigateToPost}
                setViolatingPosts={setViolatingPosts}
            />
        </>
    );
}

export default ViolatingPostItem;