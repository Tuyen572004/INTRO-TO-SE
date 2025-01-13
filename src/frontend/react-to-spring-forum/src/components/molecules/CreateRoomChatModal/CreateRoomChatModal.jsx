import { motion, AnimatePresence } from "framer-motion";
import s from "./style.module.css";
import { MessageAPI } from "../../../api/MessageAPI";
import { useEffect, useState } from "react";
import ErrorAlert from "../../atoms/ErrorAlert/ErrorAlert";
import { useSelector } from "react-redux";
import { UserProfileAPI } from "../../../api/UserProfileAPI";
import { Button } from "react-bootstrap";
import { uploadFile } from "../../../utils/uploadImageFile";

function CreateRoomChatModal({
  toggleCreateModal,
  setChatRooms,
  setSelectedChatRoom,
}) {
  const userId = useSelector((state) => state.userSlice.user.userId);
  const [chatRoomName, setChatRoomName] = useState("");
  const [participants, setParticipants] = useState([userId]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchParticipants, setSearchParticipants] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newChatRoomImg, setNewChatRoomImg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserProfileAPI.getAllFriendsByUserId(userId);
        setAllUsers(response);
      } catch (error) {
        setErrorMessage("Failed to fetch users. Please try again later.");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setNewChatRoomImg(previewUrl);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleCreateChatRoom = async () => {
    if (!chatRoomName.trim() && participants.length > 2) {
      setErrorMessage("Please enter a room name and.");
      return;
    }

    if (participants.length === 1) {
      setErrorMessage("Please add at least one participant.");
      return;
    }

    try {
      const response = await MessageAPI.createChatRoom(
        chatRoomName,
        participants,
        (await uploadFile(selectedFile)) || null
      );
      const newChatRoom = response.data;

      setChatRooms((prev) => [...prev, newChatRoom]);
      setSelectedChatRoom(newChatRoom);

      toggleCreateModal();
    } catch (error) {
      setErrorMessage("Failed to create chat room. Please try again later.");
      console.error("Error creating chat room:", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={s.modal_overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={s.modal}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h2>New Chat Room</h2>
          {errorMessage && <ErrorAlert message={errorMessage} />}

          <div className={s.modal_body}>
            {participants.length > 2 && (
              <>
                <label>Room name:</label>
                <div className={s.chat_room_name_container}>
                  <input
                    type="text"
                    value={chatRoomName}
                    onChange={(e) => setChatRoomName(e.target.value)}
                    placeholder="Enter the room name"
                    className={s.chat_room_name_input}
                  />
                </div>

                <div className="d-flex justify-content-center mt-2">
                  <div className={s.chatRoomImage}>
                    <img src={newChatRoomImg} alt="chatRoomImage" />
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="chatRoomImageUpload"
                  />
                  <Button
                    size="sm"
                    variant="dark"
                    style={{ borderRadius: "15px" }}
                    onClick={() =>
                      document.getElementById("chatRoomImageUpload").click()
                    }
                  >
                    Change
                  </Button>
                </div>
              </>
            )}

            <label>Participants:</label>
            <div className={s.search_container}>
              <input
                type="text"
                value={searchParticipants}
                onChange={(e) => setSearchParticipants(e.target.value)}
                placeholder="Search by username..."
                className={s.search_input}
              />
            </div>

            <div className={s.participants_list}>
              {(() => {
                const searchedUserList = allUsers.filter((user) =>
                  user.username
                    .toLowerCase()
                    .includes(searchParticipants.toLowerCase())
                );

                if (searchedUserList.length === 0) {
                  return (
                    <div className={s.participant_item}>No users found</div>
                  );
                }

                return searchedUserList.map((user) => {
                  const isSelected = participants.includes(user.id);

                  return (
                    <motion.div
                      key={user.id}
                      className={`${s.participant_item} ${
                        isSelected ? s.selected : ""
                      }`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={s.participant_info}>
                        <div className={`${s.avatar}`}>
                          <img
                            src={user.avatar}
                            alt=""
                            className={s.avatar_image}
                          />
                        </div>
                        <span>{user.username}</span>
                      </div>

                      <motion.button
                        className={`${s.toggle_button} ${
                          isSelected ? s.selected : s.unselected
                        }`}
                        onClick={() => {
                          if (isSelected) {
                            setParticipants((prev) =>
                              prev.filter((id) => id !== user.id)
                            );
                            if (participants.length === 1) {
                              setChatRoomName("");
                              setNewChatRoomImg("");
                              setSelectedFile(null);
                            }
                          } else {
                            setParticipants((prev) => [...prev, user.id]);
                          }
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSelected ? "✗" : "✓"}
                      </motion.button>
                    </motion.div>
                  );
                });
              })()}
            </div>
          </div>
          <div className={s.modal_footer}>
            <motion.button
              className={s.cancel_button}
              onClick={toggleCreateModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              className={s.create_button}
              onClick={handleCreateChatRoom}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Create
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CreateRoomChatModal;
