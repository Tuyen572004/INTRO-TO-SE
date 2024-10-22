import s from "./style.module.css";
const NewPost = ({ toggleIsPostPopup }) => {
  return (
    <div className={s.container}>
      <div className={s.new_post}>
        <div className={s.avatar}>
          <img
            src="https://api.dicebear.com/5.x/bottts/svg?seed=huper"
            alt="huper"
          />
        </div>
        <div className={s.new} onClick={() => toggleIsPostPopup()}>
          What's new?
        </div>
        <div className={s.post_button} onClick={() => toggleIsPostPopup()}>
          Post
        </div>
      </div>
    </div>
  );
};

export default NewPost;
