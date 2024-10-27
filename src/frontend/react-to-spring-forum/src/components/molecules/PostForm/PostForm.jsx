import s from "./style.module.css";
import { RiCloseLargeFill } from "react-icons/ri";

const PostForm = ({ toggleIsPostPopup }) => {
  return (
    <div className={s.overlay}>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.avatar}>
            <img
              src="https://api.dicebear.com/5.x/bottts/svg?seed=huper"
              alt="huper"
            />
          </div>
          <div className={s.name}>Huper</div>
        </div>
        <textarea className={s.content}></textarea>
        <div className={s.post_button}>Post</div>
        <button className={s.close_popup} onClick={() => toggleIsPostPopup()}>
          <RiCloseLargeFill />
        </button>
      </div>
    </div>
  );
};

export default PostForm;
