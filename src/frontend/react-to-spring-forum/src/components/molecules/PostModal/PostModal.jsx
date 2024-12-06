import {Button, Modal} from 'react-bootstrap';
import PostItem from '../PostItem/PostItem';

import './style.css';
import CommentItem from "../CommentItem/CommentItem";

const PostModal = ({ post, onClose }) => {
    if (!post) return null;

    return (
        <Modal show={!!post} onHide={onClose} centered size={"lg"} className="post-modal">
            <Modal.Header closeButton>
                <Modal.Title className="post-title">
                    Posted by {post.user.name}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body">
                <PostItem post={post}/>
            </Modal.Body>
        </Modal>
    );
};

export default PostModal;