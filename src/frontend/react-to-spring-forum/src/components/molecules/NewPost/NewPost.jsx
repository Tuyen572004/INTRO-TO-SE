import s from "./style.module.css";
import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import {UserProfileAPI} from "../../../api/UserProfileAPI";
import UserIcon from "../../../assets/User_Icon.png";

const NewPost = ({toggleIsPostPopup}) => {
    const [userProfile, setUserProfile] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await UserProfileAPI.get();
                setUserProfile(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile().then(() => setLoading(false));
    }, []);

    if (loading) {
        return <div></div>
    }
    return (
        <div className={s.container}>
            <div className={s.new_post}>
                <div className={s.avatar}>
                    {userProfile.profileImgUrl
                        ? <img src={userProfile.profileImgUrl} alt="imageProfile"/>
                        : <img src={UserIcon} alt="imageProfile"/>
                    }
                </div>
                <div className={s.new} onClick={() => toggleIsPostPopup()}>
                    What's new?
                </div>
                <motion.button
                    className={s.post_button}
                    type="button"
                    onClick={() => toggleIsPostPopup()}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    Post
                </motion.button>
            </div>
        </div>
    );
};

export default NewPost;
