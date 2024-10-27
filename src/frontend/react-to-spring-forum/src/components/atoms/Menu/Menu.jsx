import { GrHomeOption } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import s from "./style.module.css";
const Menu = ({ toggleIsPostPopup }) => {
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      <div className={s.home} onClick={() => navigate("/")}>
        <GrHomeOption />
      </div>
      <div className={s.search} onClick={() => navigate("/search")}>
        <FiSearch />
      </div>
      <div className={s.post} onClick={() => toggleIsPostPopup()}>
        <FaPlus />
      </div>
      <div className={s.activity} onClick={() => navigate("/activity")}>
        <FaRegHeart />
      </div>
      <div className={s.user} onClick={() => navigate("/user")}>
        <FaUser />
      </div>
    </div>
  );
};

export default Menu;
