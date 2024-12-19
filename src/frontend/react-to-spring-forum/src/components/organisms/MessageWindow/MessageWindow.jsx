import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import InfiniteScroll from "react-infinite-scroll-component";
import "swiper/css";
import "swiper/css/scrollbar";
import { GrSend } from "react-icons/gr";
import { Images } from "lucide-react";
import { Scrollbar } from "swiper/modules";
import SearchBar from "../../atoms/SearchBar/SearchBar";
import { MessageAPI } from "../../../api/MessageAPI";
import CreateRoomChatModal from "../../molecules/CreateRoomChatModal/CreateRoomChatModal";
import ImageList from "../../molecules/ImageList/ImageList";
import { uploadFile } from "../../../utils/uploadImageFile";
import s from "./style.module.css";
import { useSelector } from "react-redux";
import {
  connectWebSocket,
  sendMessage,
  disconnectWebSocket,
} from "../../../config/webSocket";

const MessageWindow = () => {
  const userId = useSelector((state) => state.userSlice.user.userId);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(chatRooms[0]);
  const [message, setMessage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState(null);
  const messagesEndRef = useRef(null);

  const sortMessagesByTime = (messages) => {
    return [...messages].sort(
      (a, b) => new Date(b.formattedSentTime) - new Date(a.formattedSentTime)
    );
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setImageList((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (indexToRemove) => {
    setImageList((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };
  const removeDuplicateMessages = (messageArray) => {
    const seen = new Set();
    return messageArray.filter((msg) => {
      if (seen.has(msg.id)) {
        return false;
      }
      seen.add(msg.id);
      return true;
    });
  };

  const fetchChatRoom = async () => {
    try {
      const response = await MessageAPI.getMyChatRooms(1, 5);
      console.log(response);

      const rooms = response.data.data || [];
      console.log("rooms: ", rooms);
      setChatRooms(rooms);

      console.log(rooms);
      if (rooms.length > 0) {
        setSelectedChatRoom(rooms[0]);
      } else {
        setSelectedChatRoom(null);
      }
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  const fetchMessages = async () => {
    debugger;
    if (loading || !hasMore || !selectedChatRoom) return;

    setLoading(true);
    try {
      const currentPages = page + 1;
      setPage(currentPages);

      console.log("page: ", page);
      console.log("currentPages: ", currentPages);

      const response = (
        await MessageAPI.getChatRoomMessages(
          selectedChatRoom.chatId,
          currentPages,
          10
        )
      ).data;

      const newMessages = response.data || [];

      if (currentPages >= response.totalPages) {
        setHasMore(false);
      }

      const combinedMessages = [...messages, ...newMessages];
      const uniqueMessages = removeDuplicateMessages(combinedMessages);
      setMessages(sortMessagesByTime(uniqueMessages));
      console.log("messages: ", messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeChatRoom = async () => {
    console.log("selectedChatRoom: ", selectedChatRoom);
    setMessages([]);
    setPage(1);
    setHasMore(true);

    const client = connectWebSocket(
      userId,
      selectedChatRoom.chatId,
      (message) => {
        setMessages((prevMessages) => {
          const combinedMessages = [message, ...prevMessages];
          const uniqueMessages = removeDuplicateMessages(combinedMessages);
          return sortMessagesByTime(uniqueMessages);
        });
      }
    );
    setClient(client);

    try {
      const response = (
        await MessageAPI.getChatRoomMessages(selectedChatRoom.chatId, 1, 10)
      ).data;

      const sortedMessages = sortMessagesByTime(response.data || []);
      setMessages(sortedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    if (selectedChatRoom) {
      handleChangeChatRoom(selectedChatRoom);
    }
    return () => {
      if (client) {
        disconnectWebSocket(client);
      }
    };
  }, [selectedChatRoom]);

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

  const handleSendMessage = async () => {
    if (message.trim() || imageList.length > 0) {
      try {
        const uploadedImageUrls = await Promise.all(
          imageList.map((image) => uploadFile(image))
        );

        const newMessage = {
          chatId: selectedChatRoom.chatId,
          senderId: userId,
          recipientIds: selectedChatRoom.participantProfiles.map(
            (item) => item.userId
          ),
          content: message,
          images: uploadedImageUrls,
        };
        sendMessage(client, newMessage);

        setMessage("");
        setImageList([]);

        const textarea = document.querySelector(`.${s.message_input}`);
        if (textarea) {
          textarea.style.height = "auto";
        }
      } catch (error) {
        console.error("Error uploading images:", error);
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
      timeZone: "UTC",
    });
  };

  const toggleCreateModal = () => {
    setIsOpenCreateModal(!isOpenCreateModal);
  };

  const MessageContent = ({ msg }) => (
    <div className={s.message_content}>
      <p className={s.message_text}>{msg.content}</p>
      {msg.images && msg.images.length > 0 && (
        <div className={s.message_images}>
          {msg.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Message attachment ${index + 1}`}
              className={s.message_image}
            />
          ))}
        </div>
      )}
      <span className={s.message_time}>
        {formatTime(msg.formattedSentTime)}
      </span>
    </div>
  );

  return (
    <div className={s.container}>
      <div className={s.message_window}>
        <div className={s.search_bar}>
          <SearchBar />
        </div>
        <div className={s.list_user}>
          {chatRooms.length === 0 ? (
            <div className={s.no_chat_rooms}>
              <p>You did not have any chat room. Let's create a new one!</p>
              <button
                className={s.create_chat_room_button}
                onClick={toggleCreateModal}
              >
                Create Chat Room
              </button>
            </div>
          ) : (
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
                        src={room.chatRoomUrl}
                        alt={room.chatRoomName}
                        className={s.avatar_image}
                      />
                    </div>
                    <p className={s.user_name}>{room.chatRoomName}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        {selectedChatRoom ? (
          <div className={s.box_chat}>
            <div className={s.box_chat_header}>
              <div className={s.avatar}>
                <img
                  src={selectedChatRoom.chatRoomUrl}
                  alt={selectedChatRoom.chatRoomName}
                  className={s.avatar_image}
                />
              </div>
              <p className={s.user_name}>{selectedChatRoom.chatRoomName}</p>
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
                  loader={<div className={s.loader}>Loading messages</div>}
                  endMessage={
                    <div className={s.end_message}>
                      There no more messages to show.
                    </div>
                  }
                  style={{ display: "flex", flexDirection: "column-reverse" }}
                  inverse={true}
                  scrollableTarget="scrollableDiv"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${s.message} ${
                        msg.senderProfile.userId === userId
                          ? s.message_sent
                          : s.message_received
                      }`}
                    >
                      <MessageContent msg={msg} />
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
              <div className={s.message_bar}>
                <ImageList images={imageList} removeImage={removeImage} />
                <div className="d-flex align-items-center">
                  <div className={s.message_input_container}>
                    <textarea
                      value={message}
                      onChange={handleMessageChange}
                      onKeyPress={handleKeyPress}
                      className={s.message_input}
                      placeholder="Enter the message..."
                      rows={1}
                    />
                    <label
                      htmlFor="chat-image-upload"
                      className={s.image_upload_label}
                    >
                      <Images size={20} />
                    </label>
                    <input
                      id="chat-image-upload"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className={s.hidden_input}
                      accept="image/*"
                    />
                  </div>
                  <button
                    className={s.send_button}
                    onClick={handleSendMessage}
                    disabled={!message.trim() && imageList.length === 0}
                  >
                    <GrSend />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={s.no_chat_selected}>
            <p>Không có chat room nào được chọn hoặc chưa có chat room.</p>
          </div>
        )}
      </div>

      {isOpenCreateModal && (
        <CreateRoomChatModal
          toggleCreateModal={toggleCreateModal}
          setChatRooms={setChatRooms}
          setSelectedChatRoom={setSelectedChatRoom}
        />
      )}
    </div>
  );
};

export default MessageWindow;
