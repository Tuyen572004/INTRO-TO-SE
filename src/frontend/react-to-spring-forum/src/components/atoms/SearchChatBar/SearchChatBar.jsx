import { useState } from "react";
import s from "./style.module.css";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

const SearchChatBar = ({ searchChatRoom, setSearchChatRoom }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchInput = async (e) => {
    setSearchChatRoom(e.target.value);
  };

  const handleClearSearchInput = () => {
    setSearchChatRoom("");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={s.container}>
      <div
        className={s.search_bar_container}
        style={{
          backgroundColor: isFocused ? "white" : "#F5F5F5",
          border: isFocused ? "1px solid black" : "none",
        }}
      >
        <CiSearch />
        <input
          className={s.search_bar}
          type="text"
          placeholder="Search"
          value={searchChatRoom}
          onChange={handleSearchInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {searchChatRoom && <IoCloseSharp onClick={handleClearSearchInput} />}
      </div>
    </div>
  );
};

export default SearchChatBar;
