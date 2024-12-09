import ViolatingPostList from "../../../organisms/ViolatingPostList/ViolatingPostList";

function ViolatingPost() {
    const violatingPosts = [
        {
            id: 1,
            user: {
                name: "Vu The Vy",
                username: "vuthevy1209",
                avatar: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/294708902_855569688736021_5705172695904405475_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGais4uR8b1LBS0AJQY1QED1uVO30jILiTW5U7fSMguJAKxcaI26sMDPwh_f9CZGEZVpZ72gsdk2eKJeX6gKFbB&_nc_ohc=bnNFSNOTXwkQ7kNvgGvohsM&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=Ah1yAfT0dVH943PF3lue1ba&oh=00_AYDKRr3j9ViKV59EZmPIbmwTWBwzOeQEuudV4Zu13jyxsA&oe=67495EB1",
            },
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
            imageUrls: [
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
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
            imageUrls: [
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
            id: 3,
            user: {
                name: "name",
                username: "username",
                avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
            },
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
            imageUrls: [
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
            id: 4,
            user: {
                name: "name",
                username: "username",
                avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
            },
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
            imageUrls: [
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
            id: 5,
            user: {
                name: "name",
                username: "username",
                avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
            },
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
            imageUrls: [
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
            id: 6,
            user: {
                name: "name",
                username: "username",
                avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
            },
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
            imageUrls: [
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
            reasons: ["Spam", "Inappropriate"],
        },
        {
            id: 7,
            user: {
                name: "name",
                username: "username",
                avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
            },
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodiLorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cupiditate culpa error officiis tempora placeat, corrupti modi distinctio sit laboriosam? Porro nemo natus quibusdam ex sapiente sint laborum expedita commodi",
            imageUrls: [
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
    ];

    return (
        <div>
            <ViolatingPostList violatingPosts={violatingPosts}/>
        </div>
    );
}

export default ViolatingPost;
