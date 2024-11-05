import React from "react";
import PostList from "../../organisms/PostList/PostList";
import s from "./style.module.css";
const Dashboard = () => {
  const postList = [
    {
      id: 1,
      user: {
        name: "name",
        username: "username",
        avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
      },
      title: "Title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
      imageList: [
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730304806/k0aruc0b48wu6k98xyo6.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730304806/b0ona3x52yzak3e2vii6.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730598769/TutorApp/images/g29qk742gkumihziul7m.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730599930/TutorApp/images/e2xforq4epsjulzsli8h.png",
      ],
      reactions: {
        isReacted: false,
        totalReact: 130,
        totalComment: 10,
        totalShare: 5,
      },
    },
    {
      id: 2,
      user: {
        name: "name",
        username: "username",
        avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
      },
      title: "Title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
      imageList: [
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730304806/k0aruc0b48wu6k98xyo6.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730304806/b0ona3x52yzak3e2vii6.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730598769/TutorApp/images/g29qk742gkumihziul7m.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730599930/TutorApp/images/e2xforq4epsjulzsli8h.png",
      ],
      reactions: {
        isReacted: true,
        totalReact: 3,
        totalComment: 312,
        totalShare: 31,
      },
    },
    {
      id: 3,
      user: {
        name: "name",
        username: "username",
        avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
      },
      title: "Title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
      imageList: [
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730304806/k0aruc0b48wu6k98xyo6.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730304806/b0ona3x52yzak3e2vii6.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730598769/TutorApp/images/g29qk742gkumihziul7m.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730599930/TutorApp/images/e2xforq4epsjulzsli8h.png",
      ],
      reactions: {
        isReacted: false,
        totalReact: 13,
        totalComment: 1,
        totalShare: 1,
      },
    },
    {
      id: 4,
      user: {
        name: "name",
        username: "username",
        avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
      },
      title: "Title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
      imageList: [
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730304806/k0aruc0b48wu6k98xyo6.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730304806/b0ona3x52yzak3e2vii6.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730598769/TutorApp/images/g29qk742gkumihziul7m.png",
        "https://res.cloudinary.com/duf2t1pkp/image/upload/v1730599930/TutorApp/images/e2xforq4epsjulzsli8h.png",
      ],
      reactions: {
        isReacted: false,
        totalReact: 13,
        totalComment: 1,
        totalShare: 1,
      },
    },
  ];

  return (
    <div className={s.container}>
      <PostList postList={postList} />
    </div>
  );
};

export default Dashboard;
