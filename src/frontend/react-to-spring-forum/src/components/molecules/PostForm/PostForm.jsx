import React, {useState, useRef, useEffect} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import {Images} from "lucide-react";
import {uploadFile} from "../../../utils/uploadImageFile";
import {addNewPost as addNewPostToPostSlice} from "../../../store/postSlice";
import {addNewPost as addNewPostToMyPostSlice} from "../../../store/myPostSlice";
import {useDispatch, useSelector} from "react-redux";
import {PostAPI} from "../../../api/PostAPI";
import Swal from "sweetalert2";
import s from "./style.module.css";
import ImageList from "../ImageList/ImageList";
import {UserProfileAPI} from "../../../api/UserProfileAPI";
import {UserAPI} from "../../../api/UserAPI";
import * as promise from "axios";
import Spinner from "react-bootstrap/Spinner";

const PostForm = ({show, toggleIsPostFormVisible}) => {
    const userLogin = useSelector((state) => state.userSlice.user);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageList, setImageList] = useState([]);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const [userProfile, setUserProfile] = useState({});
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const [posting, setPosting] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userLogin) {
            const fetchUserProfile = async () => {
                try {
                    const response = await UserProfileAPI.getMyProfile();
                    setUserProfile(response.data);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            };

            const fetchUser = async () => {
                try {
                    const response = await UserAPI.getMyAccount();
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            };

            promise
                .all([fetchUserProfile(), fetchUser()])
                .then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setImageList((prevImages) => [...prevImages, ...files]);
    };

    const removeImage = (indexToRemove) => {
        setImageList((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );
    };

    const handlePost = async () => {
        setPosting(true);

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
                dispatch(addNewPostToPostSlice(response.data));
                dispatch(addNewPostToMyPostSlice(response.data));

                toggleIsPostFormVisible();
            }

            setPosting(false);
            await Swal.fire({
                icon: "success",
                title: "Post created!",
                showConfirmButton: false,
                timer: 1500,
            });

        } catch (error) {
            setPosting(false);
            await Swal.fire({
                icon: "error",
                title: "An error occurred!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const adjustHeight = (ref) => {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
    };

    return (
        <>
            <Modal show={show} onHide={toggleIsPostFormVisible} centered>
                <Modal.Header closeButton>
                    <div className="row">
                        <div className="col-2">
                            <img
                                src={
                                    userProfile.profileImgUrl || "https://via.placeholder.com/150"
                                }
                                alt="profile"
                                className={s.avatar}
                            />
                        </div>
                        <div className="col-9 ml-2 ms-2">
                            <div className="row">
                                <div className="col-12">
                                    <div className={s.name}>
                                        {userProfile.firstName + " " + userProfile.lastName}
                                    </div>
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
                                className={s.customTextarea + " " + s.titleTextarea}
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
                                className={s.customTextarea + " " + s.contentTextarea}
                            />
                        </Form.Group>

                        <ImageList images={imageList} removeImage={removeImage}/>

                        <Form.Group>
                            <div className={"row " + s.addImage}>
                                <div className={"col-10 " + s.addImageTitle}>
                                    Add to your post
                                </div>
                                <label htmlFor="image-upload-for-new-post" className="col-2">
                                    <div className={s.addImageButton}>
                                        <Images strokeWidth={2.5}/>
                                    </div>
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
                        disabled={!title || !content}
                        variant="dark"
                        className={s.postButton}
                    >
                        {posting ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : "Post"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PostForm;
