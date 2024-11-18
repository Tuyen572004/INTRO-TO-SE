import s from "./style.module.css";
import SearchBar from "../../atoms/SearchBar/SearchBar";

const Header = () => {
  return (
    <div className={s.container}>
      <SearchBar />
    </div>
  );
};

export default Header;
