import React, {useEffect, useState, useRef} from 'react';
import s from './style.module.css';
import {FaFacebookSquare, FaInstagram} from 'react-icons/fa';
import {UserProfileAPI} from '../../../api/UserProfileAPI';
import {UserAPI} from '../../../api/UserAPI';
import UserIcon from "../../../assets/User_Icon.png"
import {useParams} from "react-router-dom";
import UserPostList from "../../organisms/UserPostList/UserPostList";
import {AddFriendAPI} from "../../../api/AddFriendAPI";
import FriendList from "../../organisms/FriendList/FriendList";
import {useDispatch} from "react-redux";
import {refresh} from "../../../store/refreshSlice";

const User = () => {
    const {id} = useParams();

    const [userProfile, setUserProfile] = useState({});
    const [user, setUser] = useState({});
    const [friendStatus, setFriendStatus] = useState({});

    const dispatch = useDispatch();

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

        const fetchIsFriend = async () => {
            const response = await AddFriendAPI.isFriend(id);
            setFriendStatus(response);
        }


        Promise.all([fetchUserProfile(), fetchUserAccount(), fetchIsFriend()]).then(() => {
            setLoading(false);
        });
    }, [id]);

    const openInNewWindow = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const AddFriend = async () => {
        try {
            const response = await AddFriendAPI.addFriend(id);
            console.log(response);
            setFriendStatus("ADD_FRIEND_REQUEST_SENT");
        } catch (error) {
            console.error(error);
        }
    }

    const Unfriend = async () => {
        try {
            const response = await AddFriendAPI.unfriend(id);
            console.log(response);
            dispatch(refresh());
            setFriendStatus("NOT_FRIEND");
        } catch (error) {
            console.error(error);
        }
    }

    const CancelFriendRequest = async () => {
        try {
            const response = await AddFriendAPI.cancelFriendRequest(id);
            console.log(response);
            setFriendStatus("NOT_FRIEND");
        } catch (error) {
            console.error(error);
        }
    }

    const Decline = async () => {
        try {
            const response = await AddFriendAPI.addFriendResponse({friendId: id, isAccepted: false});
            console.log(response);
            setFriendStatus("NOT_FRIEND");
        } catch (error) {
            console.error(error);
        }
    }

    const Accept = async () => {
        try {
            const response = await AddFriendAPI.addFriendResponse({friendId: id, isAccepted: true});
            console.log(response);
            dispatch(refresh());
            setFriendStatus("FRIEND");
        } catch (error) {
            console.error(error);
        }
    }

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
                        <FriendList userId={id}/>
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
                <div className={s.friendStatus}>
                    {friendStatus === "NOT_FRIEND" ? (
                        <div className={s.buttonBlack} onClick={AddFriend}>
                            Add friend
                        </div>
                    ) : friendStatus === "FRIEND" ? (
                        <div className={s.buttonWhite} onClick={Unfriend}>
                            Friend
                        </div>
                    ) : friendStatus === "ADD_FRIEND_REQUEST_SENT" ? (
                        <div className={s.buttonWhite} onClick={CancelFriendRequest}>
                            Friend request sent
                        </div>
                    ) : (
                        <>
                            <div className={s.buttonWhite} onClick={Decline}>
                                Decline
                            </div>
                            <div className={s.buttonBlack} onClick={Accept}>
                                Accept
                            </div>
                        </>
                    )}
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