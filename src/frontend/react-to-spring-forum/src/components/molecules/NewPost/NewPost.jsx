import s from "./style.module.css";
import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import {UserProfileAPI} from "../../../api/UserProfileAPI";
import UserIcon from "../../../assets/User_Icon.png";
import PostForm from "../PostForm/PostForm"; 
import {UserAPI} from "../../../api/UserAPI";
import * as promise from "axios"; // Import the PostForm component
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [isPostFormVisible, setIsPostFormVisible] = useState(false);
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await UserProfileAPI.getMyProfile();
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
      {user ? (
        <div className={s.new_post}>
          <div className={s.avatar}>
            {userProfile?.profileImgUrl ? (
              <img src={userProfile?.profileImgUrl} alt="imageProfile" />
            ) : (
              <img src={UserIcon} alt="imageProfile" />
            )}
          </div>
          <div className={s.new} onClick={toggleIsPostFormVisible}>
            What's new?
          </div>
          <motion.button
            className={s.post_button}
            type="button"
            onClick={toggleIsPostFormVisible}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Post
          </motion.button>
        </div>
      ) : (
        <div className={s.login_prompt}>
          <p>You need to log in to create a new post.</p>
          <motion.button
            className={s.login_button}
            type="button"
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Go to Login
          </motion.button>
        </div>
      )}
      {isPostFormVisible && (
        <PostForm
          show={isPostFormVisible}
          toggleIsPostFormVisible={toggleIsPostFormVisible}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

export default NewPost;
