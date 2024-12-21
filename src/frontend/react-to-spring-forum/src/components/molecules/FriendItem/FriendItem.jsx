import s from './style.module.css'
import {useSelector} from "react-redux";

const FriendItem = ({ friend }) => {
    const user = useSelector((state) => state.userSlice.user);
    const myId = user.userId;

    const navigateToProfile = () => {
        if (myId === friend.id) {
            window.location.href = "/my-account";
        } else {
            window.location.href = `/user/${friend.id}`;
        }
    };

    return (
        <div>
            <div className={s.friend_item}>
                <div className={s.avatar} onClick={navigateToProfile}>
                    <img src={friend.avatar} alt={friend.name}/>
                </div>
                <div className={s.infomation} onClick={navigateToProfile}>
                    <div className={s.name}>{friend.name}</div>
                    <div className={s.username}>@{friend.username}</div>
                </div>
                <div className={s.button} onClick={navigateToProfile}>
                    View Profile
                </div>
            </div>
        </div>
    );
}

export default FriendItem;