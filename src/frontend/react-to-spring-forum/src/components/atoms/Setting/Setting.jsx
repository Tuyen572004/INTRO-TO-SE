import { MdOutlinePushPin } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";

import s from "./style.module.css";
const Setting = () => {
  return (
    <div className={s.container}>
      <MdOutlinePushPin />
      <IoMdOptions />
    </div>
  );
};

export default Setting;
