import { GrHomeOption } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import s from "./style.module.css";
const Menu = () => {
  return (
    <div className={s.container}>
      <GrHomeOption />
      <FiSearch />
      <FaPlus />
      <FaRegHeart />
      <FaUser />
    </div>
  );
};

export default Menu;
