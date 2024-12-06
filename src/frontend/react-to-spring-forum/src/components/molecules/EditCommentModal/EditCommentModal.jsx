import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Uploader from '../../atoms/Uploader/Uploader';
import useAuth from '../../../hooks/useAuth';
import { setAuthToken } from "../../../api/PrivateAxios";
import { CommentAPI } from "../../../api/CommentAPI";
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../../store/CommentSlice";

import s from './style.module.css';

const EditCommentModal = ({ show, onHide, comment }) => {
    const { auth } = useAuth();
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.commentSlice.comments);

    const [content, setContent] = useState(comment?.content || '');
    const [images, setImages] = useState(comment?.imageList || []);
    const [newImages, setNewImages] = useState([]);

    const removeImage = (index, event) => {
        event.preventDefault();
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const uploadFile = async (image) => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'images_preset');

        try {
            const cloudName = process.env.REACT_APP_CLOUD_NAME;
            const resourceType = 'image';
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            return secure_url;
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        const updatedComment = {
            _id: comment.id,
            content: content,
            image_url: images,
        };

        try {
            const uploadedImageUrls = await Promise.all(
                newImages.map((image) => uploadFile(image))
            );

            updatedComment.image_url = [...updatedComment.image_url, ...uploadedImageUrls];

            setAuthToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlNDZkZDY1Yi0zMmU0LTRkNTYtOGY3Mi1lNDBhNTc5NWZiYjciLCJzY29wZSI6IlJPTEVfVVNFUiIsImlzcyI6IlJlYWN0LVRvLVNwcmluZy1UZWFtIiwicmZJZCI6IjUxYWQ5NGM1LTRmMjQtNDczMi05NzQ0LWU4ZmU0Y2FhMzU1MCIsImV4cCI6MTczNjg1MDk0MSwiaWF0IjoxNzMzMjUwOTQxLCJqdGkiOiIzZDY4Y2VlMS00MzdkLTQ5NzItYmI4Zi04MjE1NzJiNzNlOTkifQ.1nJdb9HGs-0Zis1Nqdj0HBUI3LW_vmRrA3R7Zo7uV9GGkYxDrdayNAp2u_LlPDGH-WFoM85PnjFvn_lF886mlg")
            const response = await CommentAPI.update(updatedComment);
            dispatch(updateComment(response.data));

            console.log('Post response:', response);
        } catch (error) {
            console.error('Error:', error);
        }

        onHide();
    };

    useEffect(() => {
        if (show) {
            setContent(comment?.content || '');
            setImages(comment?.imageList || []);
            setNewImages([]);
        }
    }, [comment, show]);

    useEffect(() => {
    }, [comments]);

    return (
        <Modal show={show} onHide={onHide} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title className={s.modalTitle}>
                    Edit Comment
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={s.modalInput}
                        />
                    </Form.Group>

                    <div className="image-preview mb-3">
                        {images.map((image, index) => (
                            <div key={index} className="position-relative">
                                <img src={image} alt={`Upload ${index}`} />
                                <button
                                    className="remove-btn"
                                    onClick={(event) => removeImage(index, event)}>
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <Uploader setImageList={setNewImages} />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleSave} className={s.modalButton}> Save </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCommentModal;