import s from "./style.module.css";
const GhostButton = ({ type, title, onClick }) => {
  return (
    <button type={type} className={s.ghost_button} onClick={onClick}>
      {title}
    </button>
  );
};

export default GhostButton;
