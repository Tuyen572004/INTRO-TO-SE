import s from "./style.module.css";

const ActivityItem = ({ activity }) => {
  return (
    <div className={s.activity_item}>
      <div className={s.avatar}>
        <div className={s.inner_avatar}>
          <img src={activity.user.avatar} alt={activity.user.name} />
        </div>
      </div>
      <div className={s.content}>
        <div className={s.header}>
          <span className={s.username}>{activity.user.name}</span>
          <span className={s.type}>{activity.type}</span>
        </div>
        <div className={s.text}>{activity.text}</div>
      </div>
      {activity.type === "follow" && (
        <button className={s.follow_button}>Follow</button>
      )}
    </div>
  );
};

export default ActivityItem;
