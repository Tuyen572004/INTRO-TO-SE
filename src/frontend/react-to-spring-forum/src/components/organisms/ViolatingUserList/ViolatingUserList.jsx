import ViolatingUserItem from "../../molecules/ViolatingUserItem/ViolatingUserItem";

import s from "./style.module.css";

function ViolatingUserList({ violatingUsers }) {
  return (
    <div className={s.violatingUserList}>
      {violatingUsers &&
        violatingUsers.map((user) => (
          <ViolatingUserItem key={user.id} user={user} />
        ))}
    </div>
  );
}

export default ViolatingUserList;
