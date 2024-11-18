import s from "./style.module.css";
import { motion } from "framer-motion";

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
        <motion.button
          className={s.post_button}
          onClick={() => toggleIsPostPopup()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Post
        </motion.button>
      </div>
    </div>
  );
};

export default NewPost;
