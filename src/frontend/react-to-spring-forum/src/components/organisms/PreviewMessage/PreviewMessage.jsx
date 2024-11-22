import React from "react";
import s from "./style.module.css";
import PreviewMessageItem from "../../molecules/PreviewMessageItem/PreviewMessageItem";

function PreviewMessage() {
  const chat = {
    avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
  };

  return (
    <div className={s.container}>
      <PreviewMessageItem chat={chat} />
      <PreviewMessageItem chat={chat} />
      <PreviewMessageItem chat={chat} />
      <PreviewMessageItem chat={chat} />
    </div>
  );
}

export default PreviewMessage;
