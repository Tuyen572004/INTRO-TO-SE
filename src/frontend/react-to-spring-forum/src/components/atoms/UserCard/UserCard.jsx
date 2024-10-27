import s from "./style.module.css";

const UserCard = ({ user, handleDisplayCard }) => {
  return (
    <div
      className={s.container}
      onMouseEnter={() => handleDisplayCard(true)}
      onMouseLeave={() => handleDisplayCard(false)}
    >
      <div className={s.user_information}>
        <div className={s.inner_user_information}>
          <div className={s.username}>{user.username}</div>
          <div className={s.name}>{user.name}</div>
        </div>

        <div className={s.avatar}>
          <div className={s.inner_avatar}>
            <img src={user.avatar} alt={user.name} />
          </div>
        </div>
      </div>

      <div className={s.description}>{user.description}</div>
      <div className={s.total_follower}>{user.totalFollower} followers</div>

      <button className={s.follow_button}>Follow</button>
    </div>
  );
};
export default UserCard;
