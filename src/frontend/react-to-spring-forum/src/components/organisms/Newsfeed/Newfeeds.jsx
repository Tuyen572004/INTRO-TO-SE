import s from "./style.module.css";

const Newsfeed = ({ children }) => {
  return (
    <div className={s.container}>
      <div className={s.newsfeed}>{children}</div>
    </div>
  );
};

export default Newsfeed;
