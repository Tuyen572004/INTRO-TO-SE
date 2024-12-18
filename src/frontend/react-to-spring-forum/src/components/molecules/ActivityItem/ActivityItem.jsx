import s from "./style.module.css";
import {useNavigate} from "react-router-dom";

const ActivityItem = ({ activity }) => {
    if (activity.notificationType === "POST" || activity.notificationType === "COMMENT") {
        return (
            <div className={s.activity_item}>
                <div className={s.avatar}>
                    <img src={activity.actor.avatar} alt={activity.actor.name} />
                </div>
                <div className={s.content}>
                    <div className={s.header}>
                        <span className={s.username}>{activity.actor.username}</span>
                        <span className={s.type}>{activity.formattedSentTime}</span>
                    </div>
                    <div className={s.text}>
                        {activity.actor.name + " " +
                            (activity.notificationType === "POST" ?
                                "reacted to your post" :
                                "commented on your post"
                            )
                        }
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default ActivityItem;