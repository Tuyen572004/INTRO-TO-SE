import s from "./style.module.css";

const UserSearchItem = ({ user }) => {
    return (
        <>
            <div className={s.container}>
                <div className={s.avatar}>
                    <img src={user.userProfile.profileImgUrl} alt={user.user.username} />
                </div>

                <div className={s.information_box}>
                    <div className={s.information}>
                        <div className={s.user_information}>
                            <div className={s.name}>{user.userProfile.firstName + " " + user.userProfile.lastName}</div>
                            <div className={s.username}>@{user.user.username}</div>
                        </div>
                        <button className={s.follow_button}>Follow</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserSearchItem;