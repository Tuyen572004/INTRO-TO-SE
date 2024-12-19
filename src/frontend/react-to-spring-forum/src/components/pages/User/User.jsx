import React, { useEffect, useState } from 'react';
import s from './style.module.css';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { UserProfileAPI } from '../../../api/UserProfileAPI';
import { UserAPI } from '../../../api/UserAPI';
import UserIcon from "../../../assets/User_Icon.png"
import { useParams } from "react-router-dom";
import UserPostList from "../../organisms/UserPostList/UserPostList";

const User = () => {
    const { id } = useParams();

    const [userProfile, setUserProfile] = useState({});
    const [user, setUser] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await UserProfileAPI.getProfileById(id);
            setUserProfile(response.data);
        };

        const fetchUserAccount = async () => {
            const response = await UserAPI.getUserById(id);
            setUser(response.data);
        };

        Promise.all([fetchUserProfile(), fetchUserAccount()]).then(() => setLoading(false));
    }, [id]);

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
                            <div className={s.username}>@{user.username}</div>
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
                    <div className={s.button}>Edit Profile</div>
                </div>


                <hr className={"mt-4 mb-4"}/>

                <div className="p-3">
                    <UserPostList scrollableTarget="user" userId={id}/>
                </div>
            </div>
        </>
    );
}

export default User;