import { useState } from "react";
import s from "./style.module.css";
import UserCard from "../UserCard/UserCard";

const FollowSuggestionItem = ({ user }) => {
  const [isDisplayingUserCard, setIsDisplayingUserCard] = useState(false);
  return (
    <>
      <div className={s.container}>
        <div className={s.avatar}>
          <div className={s.inner_avatar}>
            <img src={user.avatar} alt={user.name} />
          </div>
        </div>

        <div className={s.information_box}>
          <div className={s.information}>
            <div className={s.user_information}>
              <div
                className={s.username}
                onMouseEnter={() => setIsDisplayingUserCard(true)}
              >
                {user.username}
              </div>
              <div className={s.name}>{user.name}</div>
            </div>
            <button className={s.follow_button}>Follow</button>
          </div>
          <div className={s.total_follower}>{user.totalFollower} followers</div>
        </div>

        {isDisplayingUserCard && (
          <UserCard user={user} handleDisplayCard={setIsDisplayingUserCard} />
        )}
      </div>
    </>
  );
};

export default FollowSuggestionItem;
