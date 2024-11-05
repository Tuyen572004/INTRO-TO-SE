import s from "./style.module.css";
import SearchBar from "../../atoms/SearchBar/SearchBar";
import FollowSuggestionList from "../../organisms/FollowSuggestionList/FollowSuggestionList";

const Search = () => {
  return (
    <>
      <div className={s.container}>
        <SearchBar />
        <FollowSuggestionList />
      </div>
    </>
  );
};

export default Search;
