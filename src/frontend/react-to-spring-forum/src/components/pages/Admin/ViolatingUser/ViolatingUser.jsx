import ViolatingUserList from "../../../organisms/ViolatingUserList/ViolatingUserList";

function UserList() {
    const violatingUsers = [
        {
            id: 1,
            name: "Tom Doe",
            username: "username",
            avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
            reasons: ["Spam", "Inappropriate"],
        },
        {
            id: 2,
            name: "John Doe",
            username: "username",
            avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
            reasons: ["Spam", "Inappropriate"],
        },
        {
            id: 3,
            name: "Jane Doe",
            username: "username",
            avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
            reasons: ["Spam", "Inappropriate"],
        },
    ];

    return (
        <div>
            <ViolatingUserList violatingUsers={violatingUsers} />
        </div>
    )
}

export default UserList;