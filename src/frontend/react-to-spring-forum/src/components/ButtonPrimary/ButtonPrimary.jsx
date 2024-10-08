import s from "./style.module.css";
const ButtonPrimary = ({ type, title }) => {
  return (
    <button type={type} className={s.button_primary}>
      {title}
    </button>
  );
};

export default ButtonPrimary;
