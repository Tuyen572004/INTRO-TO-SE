import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { GrSend } from "react-icons/gr";
import { Scrollbar } from "swiper/modules";
import SearchBar from "../../atoms/SearchBar/SearchBar";
import s from "./style.module.css";


const MessageWindow = () => {
  const users = [
    { id: 1, name: "User1", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar1" },
    { id: 2, name: "User2", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar2" },
    { id: 3, name: "User3", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar3" },
    { id: 4, name: "User4", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar4" },
    { id: 1, name: "User1", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar1" },
    { id: 2, name: "User2", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar2" },
    { id: 3, name: "User3", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar3" },
    { id: 4, name: "User4", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar4" },    
    { id: 1, name: "User1", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar1" },
    { id: 2, name: "User2", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar2" },
    { id: 3, name: "User3", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar3" },
    { id: 4, name: "User4", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar4" },    
    { id: 1, name: "User1", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar1" },
    { id: 2, name: "User2", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar2" },
    { id: 3, name: "User3", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar3" },
    { id: 4, name: "User4", avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=avatar4" },
  ];
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    const textarea = e.target;
    textarea.style.height = `${textarea.scrollHeight}px`; 
    setMessage(textarea.value);
  };

  return (
    <div className={s.container}>
      <div className={s.message_window}>
        <div className={s.search_bar}>
          <SearchBar />
        </div>
        <div className={s.list_user}>
          <Swiper
            modules={[Scrollbar]}
            spaceBetween={10}
            slidesPerView="5"
            scrollbar={{ draggable: true }}
            className={s.swiper}
          >
            {users.map((user) => (
              <SwiperSlide key={user.id} className={s.user_slide} onClick={()=>{setSelectedUser(user)}}> 
                <div className={s.user}>
                  <div className={s.avatar}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className={s.avatar_image}
                    />
                  </div>

                  <p className={s.user_name}>{user.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={s.box_chat}>
          <div className={s.box_chat_header}>
            <div className={s.avatar}>
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className={s.avatar_image}
            />
            </div>

            <p className={s.user_name}>{selectedUser.name}</p>

          </div>
          <div className={s.box_chat_body}>
            <div className={s.message}></div>
            <div className={s.message_bar}>
              <div className={s.message_input}>
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  className={s.message_input}
                  placeholder="Type a message..."
                  />
              </div>
              <div className={s.send_button}>
                <GrSend />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageWindow;
