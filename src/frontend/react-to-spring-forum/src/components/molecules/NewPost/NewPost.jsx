import s from "./style.module.css";
import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import {UserProfileAPI} from "../../../api/UserProfileAPI";
import UserIcon from "../../../assets/User_Icon.png";
import PostForm from "../PostForm/PostForm";
import {UserAPI} from "../../../api/UserAPI";
import * as promise from "axios"; // Import the PostForm component

const NewPost = () => {
    const [userProfile, setUserProfile] = useState();
    const [loading, setLoading] = useState(true);
    const [isPostFormVisible, setIsPostFormVisible] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await UserProfileAPI.get();
                setUserProfile(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        promise.all([fetchUserProfile()]).then(() => setLoading(false));
    }, []);

    const toggleIsPostFormVisible = () => {
        setIsPostFormVisible(!isPostFormVisible);
    };

    if (loading) {
        return <div></div>;
    }
    return (
        <div className={s.container}>
            <div className={s.new_post}>
                <div className={s.avatar}>
                    {userProfile?.profileImgUrl ? (
                        <img src={userProfile.profileImgUrl} alt="imageProfile"/>
                    ) : (
                        <img src={UserIcon} alt="imageProfile"/>
                    )}
                </div>
                <div className={s.new} onClick={toggleIsPostFormVisible}>
                    What's new?
                </div>
                <motion.button
                    className={s.post_button}
                    type="button"
                    onClick={toggleIsPostFormVisible}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    Post
                </motion.button>
            </div>
            {isPostFormVisible && (
                <PostForm
                    show={isPostFormVisible}
                    toggleIsPostFormVisible={toggleIsPostFormVisible}
                />
            )}
        </div>
    );
};

export default NewPost;
