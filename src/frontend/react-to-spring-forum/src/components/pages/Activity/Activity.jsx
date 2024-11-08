import ActivityList from "../../organisms/ActivityList/ActivityList";
import s from "./style.module.css";

const Activity = () => {
  const activities = [
    {
      id: 1,
      type: "react",
      text: "commented on your post",
      user: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
      },
    },
    {
      id: 2,
      type: "react",
      text: "liked your post",
      user: {
        name: "Jane Doe",
        avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
      },
    },
    {
      id: 3,
      type: "follow",
      text: "followed you",
      user: {
        name: "Tom Doe",
        avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
      },
    },
  ];
  return (
    <div className={s.container}>
      <ActivityList activities={activities} />
    </div>
  );
};

export default Activity;
