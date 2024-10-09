import { MdExpandMore } from "react-icons/md";
import s from "./style.module.css";
const Header = ({
  title = "For you",
  moreList = ["For you", "Flowing", "Liked", "Saved"],
}) => {
  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>
      <div className={s.more}>
        <MdExpandMore />
      </div>
    </div>
  );
};

export default Header;
