import React, { useEffect, useState, useRef } from "react";
import { UserProfileAPI } from "../../../api/UserProfileAPI";
import { motion } from "framer-motion";
import {SendHorizontal, Paperclip, X} from "lucide-react";
import { UserIcon } from "lucide-react";
import {uploadFile} from "../../../utils/uploadImageFile";
import {CommentAPI} from "../../../api/CommentAPI";
import {addComment} from "../../../store/commentSlice";
import ImageList from "../ImageList/ImageList";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import s from "./style.module.css";
import Spinner from "react-bootstrap/Spinner";

function NewComment({ postId }) {
    const [userProfile, setUserProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [imageList, setImageList] = useState([]);
    const textareaRef = useRef(null);
    const dispatch = useDispatch();

    const [commenting, setCommenting] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await UserProfileAPI.getMyProfile();
                setUserProfile(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile().then(() => setLoading(false));
    }, []);

    const adjustHeight = () => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setImageList(prevImages => [...prevImages, ...files]);
    };

    const removeImage = (indexToRemove) => {
        setImageList(prevImages =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleSubmit = async () => {
        if (!content.trim() && imageList.length === 0) {
            return;
        }

        setCommenting(true);

        const data = {
            content: content,
            image_url: [],
            post_id: postId,
        };

        try {
            data.image_url = await Promise.all(
                imageList.map((image) => uploadFile(image))
            );

            const response = await CommentAPI.create(data);

            setImageList([]);

            if (response.code === 1000) {
                dispatch(addComment(response.data));
                setContent("");
                setImageList([]);

                setCommenting(false);
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'An error occurred!',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    if (loading) {
        return <div></div>
    }

    return (
        <div className="container" style={{borderBottom: '1px solid #e0e0e0', paddingBottom: '1rem'}}>
            <div className="row justify-content-center align-items-center">
                <div className="col-1">
                    <div className={s.avatar}>
                        {userProfile.profileImgUrl
                            ? <img src={userProfile.profileImgUrl} alt="imageProfile"/>
                            : <img src={UserIcon} alt="imageProfile"/>
                        }
                    </div>
                </div>
                <div className="col-9">
                    <div className={s.new}>
                        <textarea
                            rows={2}
                            placeholder="Write a comment..."
                            className={s.input}
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                adjustHeight();
                            }}
                            ref={textareaRef}
                            style={{resize: 'none', overflow: 'hidden'}}
                        />
                    </div>
                </div>
                <div className="col-1 m-0 p-0">
                    <div>
                        <motion.button
                            className={s.commentButton}
                            type="button"
                            whileHover={{scale: 1.2}}
                            whileTap={{scale: 0.8}}
                            onClick={() => document.getElementById('image-upload-for-new-comment').click()}
                        >
                            <Paperclip size={25}/>
                        </motion.button>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="d-none"
                            id="image-upload-for-new-comment"
                            accept="image/*"
                        />
                    </div>
                </div>
                <div className="col-1 m-0 p-0">
                    <div>
                        {commenting ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <motion.button
                                className={s.commentButton}
                                variants="primary"
                                type="button"
                                whileHover={{scale: 1.2}}
                                whileTap={{scale: 0.8}}
                                onClick={handleSubmit}
                            >
                                <SendHorizontal size={30} strokeWidth={2}/>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
            <div className="row" style={{marginLeft: '3.5rem', marginRight: '8rem'}}>
                <div className="col-12">
                    <ImageList images={imageList} removeImage={removeImage}/>
                </div>
            </div>
        </div>
    );
}

export default NewComment;