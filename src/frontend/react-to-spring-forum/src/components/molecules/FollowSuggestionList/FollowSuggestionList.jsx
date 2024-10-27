import s from "./style.module.css";

import FollowSuggestionItem from "../../atoms/FollowSuggestionItem/FollowSuggestionItem";

const FollowSuggestionList = ({ followSuggestions }) => {
  const user = {
    avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
    username: "username",
    name: "name",
    description: "description",
    totalFollower: 0,
  };
  return (
    // <div>
    //   {followSuggestions.map((followSuggestion, index) => (
    //     <FollowSuggestion key={index} followSuggestion={followSuggestion} />
    //   ))}
    // </div>
    <div className={s.container}>
      <div className={s.suggestion_title}>Suggestions For You</div>
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
      <FollowSuggestionItem user={user} />
    </div>
  );
};

export default FollowSuggestionList;
