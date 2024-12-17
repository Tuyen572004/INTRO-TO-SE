import React, { useEffect, useState } from 'react';
import s from './style.module.css';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { UserProfileAPI } from '../../../api/UserProfileAPI';
import { UserAPI } from '../../../api/UserAPI';
import EditProfileModal from "../../molecules/EditProfileModal/EditProfileModal";
import UserIcon from "../../../assets/User_Icon.png"
import MyPostList from "../../organisms/MyPostList/MyPostList";
import NewPost from "../../molecules/NewPost/NewPost";

const User = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [user, setUser] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyProfile = async () => {
            const response = await UserProfileAPI.get();
            setUserProfile(response.data);
        };

        const fetchMyAccount = async () => {
            const response = await UserAPI.getMyAccount();
            setUser(response.data);
        };

        Promise.all([fetchMyProfile(), fetchMyAccount()]).then(() => setLoading(false));
    }, []);

    const openInNewWindow = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    if (loading) {
        return <div></div>;
    }

    return (
        <>
            <div className={s.container} id="user">
                <div className={s.user_card}>
                    <div className={s.user_information}>
                        <div className={s.inner_information}>
                            <div className={s.name}>{userProfile.firstName + ' ' + userProfile.lastName}</div>
                            <div className={s.username}>{user.username}</div>
                        </div>
                        <div className={s.inner_avatar}>
                            {userProfile.profileImgUrl
                                ? <img src={userProfile.profileImgUrl} alt={user.username}/>
                                : <img src={UserIcon} alt={user.username}/>
                            }
                        </div>
                    </div>
                    <div className={s.description}><b>Address:</b> {userProfile.address}</div>
                    <div className={s.sub_information}>
                        <div className={s.total_follower}><b>Followers:</b> BE chưa làm</div>
                        <div className={s.link}>
                            <div className={s.inner_link}>
                                <div className={s.link_button}
                                     onClick={() => openInNewWindow(`https://${user.facebook}`)}>
                                    <FaFacebookSquare/>
                                </div>
                                <div className={s.link_button}
                                     onClick={() => openInNewWindow(`https://${user.instagram}`)}>
                                    <FaInstagram/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.edit_button}>
                    <div className={s.button} onClick={() => setShowEditModal(true)}>Edit Profile</div>
                </div>


                <hr className={"mt-4 mb-4"}/>
                <div className="m-3">
                    <NewPost/>
                </div>

                <div className="p-3">
                    <MyPostList scrollableTarget="user"/>
                </div>
            </div>

            <EditProfileModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
            />
        </>
    );
};

export default User;