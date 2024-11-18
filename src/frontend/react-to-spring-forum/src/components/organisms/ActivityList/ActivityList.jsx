import ActivityItem from "../../molecules/ActivityItem/ActivityItem";
import s from "./style.module.css";

const ActivityList = ({ activities }) => {
  return (
    <div className={s.activity_list}>
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          type={activity.type}
        />
      ))}
    </div>
  );
};

export default ActivityList;
