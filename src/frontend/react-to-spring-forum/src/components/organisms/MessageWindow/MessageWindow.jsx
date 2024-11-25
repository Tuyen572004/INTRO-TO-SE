import SearchBar from "../../atoms/SearchBar/SearchBar";
import s from "./style.module.css";

const MessageWindow = () => {
  return (
    <div className={s.container}>
      <div className={s.message_window}>
        <div className={s.search_bar}>
          <SearchBar />
        </div>
        <div className={s.list_user}></div>
        <div className={s.box_chat}>
          <div className={s.box_chat_header}>
            <div className={s.avatar}></div>
          </div>
          <div className={s.box_chat_body}>
            <div className={s.message}></div>
            <div className={s.message_bar}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageWindow;
