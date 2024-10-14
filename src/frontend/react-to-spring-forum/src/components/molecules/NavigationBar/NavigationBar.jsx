import Logo from "../../atoms/Logo/Logo";
import Menu from "../../atoms/Menu/Menu";
import Setting from "../../atoms/Setting/Setting";
import s from "./style.module.css";
const Navigation = () => {
  return (
    <div className={s.container}>
      <Logo />
      <Menu />
      <Setting />
    </div>
  );
};

export default Navigation;
