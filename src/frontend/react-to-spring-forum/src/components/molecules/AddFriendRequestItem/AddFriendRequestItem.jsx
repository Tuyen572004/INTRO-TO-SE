import s from './style.module.css'
import {useState} from "react";
import {AddFriendAPI} from "../../../api/AddFriendAPI";

const AddFriendRequestItem = ({ friend, type }) => {
    const [stateReceive, setStateReceive] = useState("DEFAULT");
    const [stateSend, setStateSend] = useState("DEFAULT");

    const Accept = async () => {
        try {
            const response = await AddFriendAPI.addFriendResponse({friendId: friend.id, isAccepted: true});
            console.log(response);
            setStateReceive("ACCEPTED");
        } catch (error) {
            console.error(error);
        }
    }

    const Delete = async () => {
        try {
            const response = await AddFriendAPI.addFriendResponse({friendId: friend.id, isAccepted: false});
            console.log(response);
            setStateReceive("DELETED");
        } catch (error) {
            console.error(error);
        }
    }

    const Revoke = async () => {
        try {
            const response = await AddFriendAPI.cancelFriendRequest(friend.id);
            console.log(response);
            setStateSend("REVOKE");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className={s.friend_item}>
                <div className={s.avatar}>
                    <img src={friend.avatar} alt={friend.name}/>
                </div>
                <div className={s.infomation}>
                    <div className={s.name}>{friend.name}</div>
                    <div className={s.username}>@{friend.username}</div>
                </div>
                <div className={s.buttonWrapper}>
                    {type === "RECEIVED" ? (
                        stateReceive === "DEFAULT" ? (
                            <>
                                <div className={s.buttonWhite} onClick={Delete}>
                                    Delete
                                </div>
                                <div className={s.buttonBlack} onClick={Accept}>
                                    Accept
                                </div>
                            </>
                        ) : stateReceive === "ACCEPTED" ? (
                            <div>
                                Friend request accepted
                            </div>
                        ) : (
                            <div>
                                Friend request deleted
                            </div>
                        )
                    ) : (
                        stateSend === "DEFAULT" ? (
                            <div className={s.buttonWhite} onClick={Revoke}>
                                Revoke friend requests
                            </div>
                        ) : (
                            <div>
                                Friend request has been revoked
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddFriendRequestItem;