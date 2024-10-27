import s from "./style.module.css";
import SearchBar from "../../atoms/SearchBar/SearchBar";
import FollowSuggestionList from "../../molecules/FollowSuggestionList/FollowSuggestionList";

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
