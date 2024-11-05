import s from "./style.module.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.userSlice.user);
  const openInNewWindow = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className={s.container}>
      <div className={s.user_card}>
        <div className={s.user_information}>
          <div className={s.inner_information}>
            <div className={s.username}>{user.username}</div>
            <div className={s.name}>{user.name}</div>
          </div>

          <div className={s.inner_avatar}>
            <img src={user.avatar} alt={user.name} />
          </div>
        </div>

        <div className={s.description}>{user.description}</div>

        <div className={s.sub_information}>
          <div className={s.total_follower}>{user.totalFollower} followers</div>
          <div className={s.link}>
            <div className={s.inner_link}>
              <div
                className={s.link_button}
                onClick={() => openInNewWindow(`https://${user.facebook}`)}
              >
                <FaFacebookSquare />
              </div>
              <div
                className={s.link_button}
                onClick={() => openInNewWindow(`https://${user.instagram}`)}
              >
                <FaInstagram />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.edit_button}>
        <div className={s.button}>Edit Profile</div>
      </div>
    </div>
  );
};

export default User;
