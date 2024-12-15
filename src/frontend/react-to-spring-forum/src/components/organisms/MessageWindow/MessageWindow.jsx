import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import InfiniteScroll from "react-infinite-scroll-component";
import "swiper/css";
import "swiper/css/scrollbar";
import { GrSend } from "react-icons/gr";
import { Scrollbar } from "swiper/modules";
import SearchBar from "../../atoms/SearchBar/SearchBar";
import { MessageAPI } from "../../../api/MessageAPI";
import s from "./style.module.css";

const MessageWindow = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(chatRooms[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchChatRoom = async () => {
    try {
      const response = await MessageAPI.getChatRooms(1, 5);
      console.log(response);
      setChatRooms(response.data.data);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newMessages = Array.from({ length: 20 }, (_, index) => ({
        id: messages.length + index + 1,
        senderId:
          Math.random() > 0.5 ? "me" : selectedChatRoom.participantIds[0],
        text: `Tin nhắn từ ${messages.length + index + 1}p trước`,
        timestamp: new Date(Date.now() - index * 60000).toISOString(),
      }));

      setMessages((prev) => [...prev, ...newMessages]);
      setPage((prev) => prev + 1);

      if (page >= 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setMessage(textarea.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: "me",
        text: message,
        timestamp: new Date().toISOString(),
      };
      setMessages([newMessage, ...messages]);
      setMessage("");

      const textarea = document.querySelector(`.${s.message_input}`);
      if (textarea) {
        textarea.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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
            {chatRooms.map((room) => (
              <SwiperSlide
                key={room.chatId}
                className={s.user_slide}
                onClick={() => setSelectedChatRoom(room)}
              >
                <div className={s.user}>
                  <div className={s.avatar}>
                    <img
                      src={room.avatar}
                      alt={room.name}
                      className={s.avatar_image}
                    />
                  </div>
                  <p className={s.user_name}>{room.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={s.box_chat}>
          <div className={s.box_chat_header}>
            <div className={s.avatar}>
              <img
                src={selectedChatRoom.avatar}
                alt={selectedChatRoom.name}
                className={s.avatar_image}
              />
            </div>
            <p className={s.user_name}>{selectedChatRoom.name}</p>
          </div>
          <div className={s.box_chat_body}>
            <div
              id="scrollableDiv"
              className={s.messages_container}
              style={{
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              <InfiniteScroll
                dataLength={messages.length}
                next={fetchMessages}
                hasMore={hasMore}
                loader={<div className={s.loader}>Đang tải tin nhắn...</div>}
                endMessage={
                  <div className={s.end_message}>Không còn tin nhắn cũ hơn</div>
                }
                style={{ display: "flex", flexDirection: "column-reverse" }}
                inverse={true}
                scrollableTarget="scrollableDiv"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${s.message} ${
                      msg.senderId === "me"
                        ? s.message_sent
                        : s.message_received
                    }`}
                  >
                    <div className={s.message_content}>
                      <p className={s.message_text}>{msg.text}</p>
                      <span className={s.message_time}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
            <div className={s.message_bar}>
              <div className={s.message_input_container}>
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  onKeyPress={handleKeyPress}
                  className={s.message_input}
                  placeholder="Nhập tin nhắn..."
                  rows={1}
                />
              </div>
              <button
                className={s.send_button}
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <GrSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageWindow;
