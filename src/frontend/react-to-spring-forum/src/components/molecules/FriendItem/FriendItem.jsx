import s from './style.module.css'

const FriendItem = ({ friend }) => {
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
                <div className={s.button}>
                    View Profile
                </div>
            </div>
        </div>
    );
}

export default FriendItem;