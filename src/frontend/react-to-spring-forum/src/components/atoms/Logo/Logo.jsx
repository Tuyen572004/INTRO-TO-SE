import { ReactComponent as Logo } from "../../../assets/react-to-spring.svg";
import s from "./style.module.css";
const LogoImg = () => {
  return (
    <div className={s.container}>
      {/* <div className={s.logo}>
        <Logo></Logo>
      </div> */}
      <div className={s.title}>
        React <br /> to <br /> Spring
      </div>
    </div>
  );
};

export default LogoImg;
