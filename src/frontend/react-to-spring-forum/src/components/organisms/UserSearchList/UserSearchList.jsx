import s from "./style.module.css";

import UserSearchItem from "../../atoms/UserSearchItem/UserSearchItem";
import { v4 } from "uuid";

const UserSearchList = ({ users, searchContent}) => {

    return (
        <div className={s.container}>
            <div className={s.suggestion_title}>Results for "{searchContent}"</div>
            {users.map((user, index) => (
                <UserSearchItem key={v4()} user={user} />
            ))}
        </div>
    );
};

export default UserSearchList;
