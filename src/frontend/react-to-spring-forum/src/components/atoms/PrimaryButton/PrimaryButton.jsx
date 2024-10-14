import s from "./style.module.css";
const PrimaryButton = ({ type, title }) => {
  return (
    <button type={type} className={s.primary_button}>
      {title}
    </button>
  );
};

export default PrimaryButton;
