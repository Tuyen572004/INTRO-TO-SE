import PostList from "../../organisms/PostList/PostList";
import s from "./style.module.css";

const Dashboard = () => {
    return (
        <div className={s.container} id={"dashboard"}>
            <PostList scrollableTarget="post_list" />
        </div>
    );
};

export default Dashboard;