import { useState } from "react";
import s from "./style.module.css";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

const SearchBar = () => {
  const [searchContent, setSearchContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchInput = (e) => {
    setSearchContent(e.target.value);
  };

  const handleClearSearchInput = () => {
    setSearchContent("");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={s.container}
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
        value={searchContent}
        onChange={handleSearchInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {searchContent && <IoCloseSharp onClick={handleClearSearchInput} />}
    </div>
  );
};

export default SearchBar;
