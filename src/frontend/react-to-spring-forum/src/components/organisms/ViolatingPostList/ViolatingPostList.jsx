import { useState } from 'react';
import PostModal from "../../molecules/PostModal/PostModal";
import ViolatingPostItem from "../../molecules/ViolatingPostItem/ViolatingPostItem";

import s from './style.module.css';

function ViolatingPostList( {violatingPosts} ) {
    const [selectedPost, setSelectedPost] = useState(null);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    return (
        <div className={s.violatingPostList}>
            {violatingPosts && violatingPosts.map(post => (
                <ViolatingPostItem
                    key={post.id}
                    post={post}
                    onClick={handlePostClick}
                />
            ))}

            <PostModal
                post={selectedPost}
                onClose={() => setSelectedPost(null)}
            />
        </div>
    );
}

export default ViolatingPostList;