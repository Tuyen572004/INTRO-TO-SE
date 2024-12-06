import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Uploader from '../../atoms/Uploader/Uploader';
import useAuth from '../../../hooks/useAuth';
import './EditPostModal.css';
import {setAuthToken} from "../../../api/PrivateAxios";
import {PostAPI} from "../../../api/PostAPI";

const EditPostModal = ({ show, onHide, post }) => {
    const { auth } = useAuth();

    const [title, setTitle] = useState(post?.title || '');
    const [content, setContent] = useState(post?.content || '');
    const [images, setImages] = useState(post?.imageList || []);
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
        const updatedPost = {
            _id: post.id,
            title: title,
            content: content,
            image_url: images,
        };

        try {
            const uploadedImageUrls = await Promise.all(
                newImages.map((image) => uploadFile(image))
            );

            updatedPost.image_url = [...updatedPost.image_url, ...uploadedImageUrls];

            setAuthToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlNDZkZDY1Yi0zMmU0LTRkNTYtOGY3Mi1lNDBhNTc5NWZiYjciLCJzY29wZSI6IlJPTEVfVVNFUiIsImlzcyI6IlJlYWN0LVRvLVNwcmluZy1UZWFtIiwicmZJZCI6IjUxYWQ5NGM1LTRmMjQtNDczMi05NzQ0LWU4ZmU0Y2FhMzU1MCIsImV4cCI6MTczNjg1MDk0MSwiaWF0IjoxNzMzMjUwOTQxLCJqdGkiOiIzZDY4Y2VlMS00MzdkLTQ5NzItYmI4Zi04MjE1NzJiNzNlOTkifQ.1nJdb9HGs-0Zis1Nqdj0HBUI3LW_vmRrA3R7Zo7uV9GGkYxDrdayNAp2u_LlPDGH-WFoM85PnjFvn_lF886mlg")
            const response = await PostAPI.update(updatedPost);

            console.log('Post response:', response);
        } catch (error) {
            console.error('Error:', error);
        }

        onHide();
    };

    useEffect(() => {
        if (show) {
            setTitle(post?.title || '');
            setContent(post?.content || '');
            setImages(post?.imageList || []);
            setNewImages([]);
        }
    }, [post, show]);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered
            className="edit-post-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                    Edit Post
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ borderRadius: '12px', border: 'none', background: '#f2f2f2' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={10}
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{ borderRadius: '12px', border: 'none', background: '#f2f2f2' }}
                        />
                    </Form.Group>

                    <div className="image-preview mb-3">
                        {images.map((image, index) => (
                            <div key={index} className="position-relative">
                                <img src={image} alt={`Upload ${index}`} />
                                <button
                                    className="remove-btn"
                                    onClick={(event) => removeImage(index, event)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <Uploader setImageList={setNewImages} />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={handleSave}
                    style={{ width: '100%', background: 'black', borderRadius: '12px', border: 'none' }}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPostModal;