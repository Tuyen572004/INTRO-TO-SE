import s from "./style.module.css";
import {jwtDecode} from "jwt-decode";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

const UserSearchItem = ({ user }) => {

    console.log(user.user.id);
    const auth = jwtDecode(localStorage.getItem('accessToken').toString());
    const myId = auth.user.userId;

    const { id } = useParams();

    const navigateToProfile = () => {
        if (myId === user.user.id) {
            window.location.href = "/my-account";
        } else {
            window.location.href = `/user/${user.user.id}`;
        }
    };


    useEffect(() => {

    }, [id]);
    return (
        <>
            <div className={s.container}>
                <div className={s.avatar} onClick={navigateToProfile}>
                    <img src={user.userProfile.profileImgUrl} alt={user.user.username} />
                </div>

                <div className={s.information_box}>
                    <div className={s.information}>
                        <div className={s.user_information} onClick={navigateToProfile}>
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