import s from "./style.module.css";
const Input = ({ type = "text", placeholder, onTextChange, isInvalid }) => {
  return (
    <input
      className={`${s.input} ${isInvalid ? s.is_invalid : ""}`}
      type={type}
      placeholder={placeholder}
      onChange={(e) => onTextChange(e.target.value)}
    ></input>
  );
};

export default Input;
