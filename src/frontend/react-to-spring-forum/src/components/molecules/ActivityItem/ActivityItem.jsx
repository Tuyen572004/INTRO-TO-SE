import s from "./style.module.css";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ActivityItem = ({ activity }) => {
    const auth = jwtDecode(localStorage.getItem('accessToken').toString());
    const myId = auth.user.userId;

    if (activity.actor.id === myId) {
        return null;
    }

    if (activity.notificationType === "POST" || activity.notificationType === "COMMENT") {
        return (
            <div className={s.activity_item}>
                <div className={s.avatar}>
                    <img src={activity.actor.avatar} alt={activity.actor.name} />
                </div>
                <div className={s.content}>
                    <div className={s.header}>
                        <span className={s.username}>{activity.actor.name}</span>
                        <span className={s.type}>{activity.formattedSentTime}</span>
                    </div>
                    <div className={s.text}>{activity.message}</div>
                </div>
            </div>
        );
    } else if (activity.notificationType === "ADD_FRIEND") {
        return (
            <div className={s.activity_item}>
                <div className={s.avatar}>
                    <img src={activity.actor.avatar} alt={activity.actor.name}/>
                </div>
                <div className={s.content}>
                    <div className={s.header}>
                        <span className={s.username}>@{activity.actor.name}</span>
                        <span className={s.type}>{activity.formattedSentTime}</span>
                    </div>
                    <div className={s.text}>{activity.message}</div>
                </div>
                <div className={s.follow_button}>
                    Accept
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default ActivityItem;