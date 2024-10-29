import { FaPlus } from "react-icons/fa6";
import s from "./style.module.css";
const PostButton = () => {
  return (
    <div className={s.post_button}>
      <FaPlus />
    </div>
  );
};

export default PostButton;
