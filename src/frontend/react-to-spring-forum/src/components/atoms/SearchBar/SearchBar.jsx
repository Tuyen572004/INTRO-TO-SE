import { useState } from "react";
import s from "./style.module.css";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

const SearchBar = () => {
  const [isExistSearchingContent, setIsExistSearchingContent] = useState(false);
  const handleSearchInput = (e) => {
    setIsExistSearchingContent(e.target.value.length > 0 ? true : false);
  };
  const handleClearSearchInput = (e) => {
    const searchBar = document.querySelector("#search_bar");
    searchBar.value = "";
    setIsExistSearchingContent(false);
  };
  return (
    <>
      <div className={s.container}>
        <CiSearch />
        <input
          className={s.search_bar}
          id="search_bar"
          type="text"
          placeholder="Search"
          onChange={handleSearchInput}
        />
        {isExistSearchingContent && (
          <IoCloseSharp onClick={handleClearSearchInput} />
        )}
      </div>
    </>
  );
};

export default SearchBar;
