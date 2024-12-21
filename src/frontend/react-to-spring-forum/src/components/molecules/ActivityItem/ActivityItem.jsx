import s from "./style.module.css";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {useSelector} from "react-redux";

const ActivityItem = ({ activity }) => {
    const user = useSelector((state) => state.userSlice.user);
    const myId = user.userId;

    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate(`/user/${activity.actor.id}`);
    }

    if (activity.actor.id === myId) {
        return null;
    }

    if (activity.notificationType === "POST" || activity.notificationType === "COMMENT" || activity.notificationType === "USER") {
        return (
            <div className={s.activity_item}>
                <div className={s.avatar} onClick={navigateToProfile}>
                    <img src={activity.actor.avatar} alt={activity.actor.name} />
                </div>
                <div className={s.content}>
                    <div className={s.header}>
                        <span className={s.username} onClick={navigateToProfile}>
                            {activity.actor.name}
                        </span>
                        <span className={s.type}>
                            {activity.formattedSentTime}
                        </span>
                    </div>
                    <div className={s.text}>{activity.message}</div>
                </div>
            </div>
        );
    } else if (activity.notificationType === "ADD_FRIEND") {
        return (
            <div className={s.activity_item}>
                <div className={s.avatar} onClick={navigateToProfile}>
                    <img src={activity.actor.avatar} alt={activity.actor.name}/>
                </div>
                <div className={s.content}>
                    <div className={s.header} onClick={navigateToProfile}>
                        <span className={s.username}>@{activity.actor.name}</span>
                        <span className={s.type}>{activity.formattedSentTime}</span>
                    </div>
                    <div className={s.text}>{activity.message}</div>
                </div>
                <div className={s.follow_button} onClick={navigateToProfile}>
                    View Profile
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default ActivityItem;