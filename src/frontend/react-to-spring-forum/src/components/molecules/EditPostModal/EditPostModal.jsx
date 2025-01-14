import React, {useEffect, useRef, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {PostAPI} from "../../../api/PostAPI";
import {useDispatch} from "react-redux";
import {updatePost} from "../../../store/postSlice";
import {updateMyPost} from "../../../store/myPostSlice";
import {uploadFile} from "../../../utils/uploadImageFile";
import {Images} from "lucide-react";
import Swal from "sweetalert2";
import s from "./style.module.css";
import ImageList from "../ImageList/ImageList";
import Spinner from "react-bootstrap/Spinner";

const EditPostModal = ({ show, onHide, post }) => {
    const [title, setTitle] = useState(post?.title || '');
    const [content, setContent] = useState(post?.content || '');
    const [images, setImages] = useState(post?.imageList || []);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const [posting, setPosting] = useState(false);

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
        setPosting(true);

        const updatedPost = {
            _id: post.id,
            title: title,
            content: content,
            image_url: images,
        };

        try {
            updatedPost.image_url = await Promise.all(
                images.map((image) => uploadFile(image))
            );

            const response = await PostAPI.update(updatedPost);
            console.log('Post response:', response);

            dispatch(updatePost(response.data));
            dispatch(updateMyPost(response.data));

            onHide();
            setPosting(false);
            await Swal.fire({
                icon: 'success',
                title: 'Post updated!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            onHide();
            setPosting(false);
            await Swal.fire({
                icon: 'error',
                title: 'An error occurred!',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const adjustHeight = (ref) => {
        ref.current.style.height = 'auto';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    };

    useEffect(() => {
        if (show) {
            setTitle(post?.title || '');
            setContent(post?.content || '');
            setImages(post?.imageList || []);
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
                <Modal.Title className={s.modalTitle}>
                    Edit Post
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            placeholder="Post Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onInput={() => adjustHeight(titleRef)}
                            ref={titleRef}
                            className={s.customTextarea + ' ' + s.titleTextarea}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Write your post content here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onInput={() => adjustHeight(contentRef)}
                            ref={contentRef}
                            style={{ border: 'none', resize: 'none', maxHeight: '25rem', overflowY: 'auto' }}
                            className={s.customTextarea + ' ' + s.contentTextarea}
                        />
                    </Form.Group>

                    <ImageList images={images} removeImage={removeImage} />

                    <Form.Group>
                        <div
                            className="row"
                            style={{
                                marginLeft: '0px',
                                marginRight: '0px',
                                padding: '8px',
                                border: '1px solid black',
                                borderRadius: '10px',
                                backgroundColor: '#f8f9fa',
                                position: 'relative'
                            }}
                        >
                            <div className={"col-10 " + s.addImageTitle}>
                                Add to your post
                            </div>
                            <label htmlFor="image-upload-for-edit-post" className="col-2">
                                <div className={s.addImageButton}>
                                    <Images strokeWidth={2.5} />
                                </div>
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="d-none"
                                id="image-upload-for-edit-post"
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
                    variant={title || content ? 'primary' : 'secondary'}
                    disabled={!title && !content}
                >
                    {posting ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : 'Save'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPostModal;