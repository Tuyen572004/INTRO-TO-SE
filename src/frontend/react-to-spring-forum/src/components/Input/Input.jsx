import s from "./style.module.css";
const Input = ({ type = "text", placeholder, onTextChange }) => {
  return (
    <input
      className={s.input}
      type={type}
      placeholder={placeholder}
      onChange={(e) => onTextChange(e.target.value)}
    ></input>
  );
};

export default Input;
