import { Modal } from 'react-bootstrap';
import React, {useEffect, useState} from "react";

import s from "./style.module.css";
import {UserProfileAPI} from "../../../api/UserProfileAPI";
import Loading from "../../atoms/Loading/Loading";
import FriendItem from "../../molecules/FriendItem/FriendItem";
import {useSelector} from "react-redux";

const FriendList = ({userId}) => {
    const [show, setShow] = useState(false);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    const refresh = useSelector(state => state.refreshSlice);

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await UserProfileAPI.getAllFriendsByUserId(userId);
            setFriends(response);
        };

        fetchFriends().then(() => {
            setLoading(false);
        });
    }, [userId, refresh]);

    if (loading) {
        return <div></div>
    }

    return (
        <>
            <div onClick={() => setShow(true)} className={s.title}>
                {friends.length} friends
            </div>
            <Modal show={show} onHide={() => setShow(false)} size="md" centered>
                <Modal.Header closeButton>
                    <Modal.Title className={s.modalTitle}>
                        Friend List
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {friends.length > 0 ? (
                        friends.map((friend) => (
                            <FriendItem key={friend.id} friend={friend} />
                        ))
                    ) : (
                        <div className={s.noFriend}>
                            No friends
                        </div>
                    )}

                </Modal.Body>
            </Modal>
        </>
    )
}

export default FriendList;