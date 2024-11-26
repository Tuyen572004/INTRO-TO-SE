import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";

import s from "./style.module.css";
const ReactBar = ({ reactions }) => {
  return (
    <div className={s.container}>
      <div className={s.reaction}>
        {reactions?.isReacted ? (
          <FaHeart className={s.reacted} />
        ) : (
          <FaRegHeart />
        )}
        <span>{reactions?.totalReact}</span>
      </div>
      <div className={s.reaction}>
        <FaRegComment />
        <span>{reactions?.totalComment}</span>
      </div>
      <div className={s.reaction}>
        <PiShareFat />
        <span>{reactions?.totalShare}</span>
      </div>
    </div>
  );
};

export default ReactBar;
