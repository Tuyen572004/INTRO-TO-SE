import { GrHomeOption } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import s from "./style.module.css";
const Menu = ({ toggleIsPostPopup }) => {
  return (
    <div className={s.container}>
      <div className={s.home}>
        <GrHomeOption />
      </div>
      <div className={s.search}>
        <FiSearch />
      </div>
      <div className={s.post}>
        <FaPlus onClick={() => toggleIsPostPopup()} />
      </div>
      <div className={s.heart}>
        <FaRegHeart />
      </div>
      <div className={s.user}>
        <FaUser />
      </div>
    </div>
  );
};

export default Menu;
