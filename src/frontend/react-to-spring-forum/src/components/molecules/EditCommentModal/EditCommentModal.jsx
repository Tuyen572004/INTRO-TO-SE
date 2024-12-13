import React, {useEffect, useRef, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {Images } from "lucide-react";
import { CommentAPI } from "../../../api/CommentAPI";
import { useDispatch } from "react-redux";
import { updateComment } from "../../../store/commentSlice";
import {uploadFile} from "../../../utils/uploadImageFile";

import s from './style.module.css';
import ImageList from "../ImageList/ImageList";

const EditCommentModal = ({ show, onHide, comment }) => {
    const [content, setContent] = useState(comment?.content || '');
    const [images, setImages] = useState(comment?.imageList || []);
    const contentRef = useRef(null);

    const dispatch = useDispatch();

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages(prevImages => [...prevImages, ...files]);
    };

    const removeImage = (indexToRemove) => {
        setImages(prevImages =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleSave = async () => {
        const updatedComment = {
            _id: comment.id,
            content: content,
            image_url: images,
        };

        try {
            updatedComment.image_url = await Promise.all(
                images.map((image) => uploadFile(image))
            );

            const response = await CommentAPI.update(updatedComment);
            dispatch(updateComment(response.data));

            console.log('Post response:', response);
        } catch (error) {
            console.error('Error:', error);
        }

        onHide();
    };

    const adjustHeight = (ref) => {
        ref.current.style.height = 'auto';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    };

    useEffect(() => {
        if (show) {
            setContent(comment?.content || '');
            setImages(comment?.imageList || []);
        }
    }, [comment, show]);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered
            className="edit-post-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className={s.modalTitle}>
                    Edit Comment
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Write your post content here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onInput={() => adjustHeight(contentRef)}
                            ref={contentRef}
                            className={s.customTextarea}
                        />
                    </Form.Group>

                    <ImageList images={images} removeImage={removeImage} />

                    <Form.Group>
                        <div className={"row " + s.addMoreImage}>
                            <div className={"col-10 " + s.addMoreImageTitle}>
                                Add more to your comment
                            </div>
                            <label htmlFor="image-upload-for-edit-comment" className="col-2">
                                <Images strokeWidth={2.5}/>
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="d-none"
                                id="image-upload-for-edit-comment"
                                accept="image/*"
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={handleSave}
                    className={s.saveButton}
                    variant={content ? 'primary' : 'secondary'}
                    disabled={!content}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCommentModal;