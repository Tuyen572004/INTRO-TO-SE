import { MdOutlinePushPin } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";

import s from "./style.module.css";
const Setting = () => {
  return (
    <div className={s.container}>
      <div className={s.pin}>
        <MdOutlinePushPin />
      </div>
      <div className={s.options}>
        <IoMdOptions />
      </div>
    </div>
  );
};

export default Setting;
