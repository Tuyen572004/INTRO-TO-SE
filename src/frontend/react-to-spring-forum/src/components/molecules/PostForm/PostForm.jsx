import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { X, Images } from 'lucide-react';
import { uploadFile } from "../../../utils/uploadImageFile";
import {addReactStatus, setReactCounter, updateReactStatus} from "../../../store/reactCounterSlice";
import { setCommentCounter } from "../../../store/commentCounterSlice";
import { addPost } from "../../../store/postSlice";
import { addMyPost } from "../../../store/myPostSlice";
import { useDispatch } from "react-redux";
import { PostAPI } from "../../../api/PostAPI";

import s from './style.module.css';
import ImageList from "../ImageList/ImageList";

const PostForm = ({ show, toggleIsPostFormVisible, userProfile, user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageList, setImageList] = useState([]);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const dispatch = useDispatch();

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setImageList(prevImages => [...prevImages, ...files]);
    };


    const removeImage = (indexToRemove) => {
        setImageList(prevImages =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );
    };

    const handlePost = async () => {
        const data = {
            title: title,
            content: content,
            image_url: [],
        };

        try {
            data.image_url = await Promise.all(
                imageList.map((image) => uploadFile(image))
            );

            const response = await PostAPI.create(data);

            setImageList([]);

            if (response.code === 1000) {
                dispatch(addPost(response.data));
                dispatch(addMyPost(response.data));

                console.log(response.data);
                console.log(response.data.id);
                dispatch(setReactCounter({ postId: response.data.id, count: 0 }));
                dispatch(setCommentCounter({ postId: response.data.id, count: 0 }));
                dispatch(addReactStatus(response.data.id));

                toggleIsPostFormVisible();
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const adjustHeight = (ref) => {
        ref.current.style.height = 'auto';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    };

    return (
        <>
            <Modal show={show} onHide={toggleIsPostFormVisible} centered>
                <Modal.Header closeButton>
                    <div className="row">
                        <div className="col-2">
                            <img
                                src={userProfile.profileImgUrl || 'https://via.placeholder.com/150'}
                                alt="profile"
                                className={s.avatar}
                            />
                        </div>
                        <div className="col-10">
                            <div className="row">
                                <div className="col-12">
                                    <div className={s.name}>{userProfile.firstName + ' ' + userProfile.lastName}</div>
                                </div>
                                <div className="col-12">
                                    <div className={s.username}>@{user.username}</div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                className={s.customTextarea + ' ' + s.contentTextarea}
                            />
                        </Form.Group>

                        <ImageList images={imageList} removeImage={removeImage}/>

                        <Form.Group>
                            <div className={"row " + s.addImage}>
                                <div className={"col-10 " + s.addImageTitle}>
                                    Add to your post
                                </div>
                                <label htmlFor="image-upload-for-new-post" className="col-2">
                                    <Images strokeWidth={2.5}/>
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="d-none"
                                    id="image-upload-for-new-post"
                                    accept="image/*"
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={handlePost}
                        disabled={!title && !content}
                        variant={title || content ? 'primary' : 'secondary'}
                        className={s.postButton}
                    >
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PostForm;