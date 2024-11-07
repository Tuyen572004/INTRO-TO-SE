import { FaPlus } from "react-icons/fa6";
import s from "./style.module.css";
const PostButton = ({ toggleIsPostPopup }) => {
  return (
    <div className={s.post_button} onClick={() => toggleIsPostPopup()}>
      <FaPlus />
    </div>
  );
};

export default PostButton;
