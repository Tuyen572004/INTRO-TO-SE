import s from "./style.module.css";
import { UserAPI } from "../../../api/UserAPI";
import { MessageAPI } from "../../../api/MessageAPI";
import { useEffect, useState } from "react";
import ErrorAlert from "../../atoms/ErrorAlert/ErrorAlert";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserAPI.getAllUsers();
        console.log(response);
        setAllUsers(response.data);
        console.log(allUsers);
      } catch (error) {
        setErrorMessage("Failed to fetch users. Please try again later.");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateChatRoom = async () => {
    if (!chatRoomName.trim() || participants.length === 0) {
      setErrorMessage(
        "Please enter a room name and add at least one participant."
      );
      return;
    }

    try {
      const response = await MessageAPI.createChatRoom(
        chatRoomName,
        participants
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
    <div className={s.modal_overlay}>
      <div className={s.modal}>
        <h2>Create Chat Modal</h2>
        {errorMessage && <ErrorAlert message={errorMessage} />}

        <div className={s.modal_body}>
          <label>Room name:</label>
          <input
            type="text"
            value={chatRoomName}
            onChange={(e) => setChatRoomName(e.target.value)}
            placeholder="Enter the room name"
          />

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
            {allUsers
              .filter((user) =>
                user.username
                  .toLowerCase()
                  .includes(searchParticipants.toLowerCase())
              )
              .map((user) => {
                const isSelected = participants.includes(user.id);

                return (
                  <div key={user.id} className={s.participant_item}>
                    <span>{user.username}</span>
                    <button
                      className={`${s.toggle_button} ${
                        isSelected ? s.selected : s.unselected
                      }`}
                      onClick={() => {
                        if (isSelected) {
                          setParticipants((prev) =>
                            prev.filter((id) => id !== user.id)
                          );
                        } else {
                          setParticipants((prev) => [...prev, user.id]);
                        }
                      }}
                    >
                      {isSelected ? "✗" : "✓"}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={s.modal_footer}>
          <button className={s.cancel_button} onClick={toggleCreateModal}>
            Cancel
          </button>
          <button className={s.create_button} onClick={handleCreateChatRoom}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomChatModal;
