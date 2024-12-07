import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import Uploader from "../../atoms/Uploader/Uploader";
import {motion} from "framer-motion";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addComment} from "../../../store/commentSlice";
import {CommentAPI} from "../../../api/CommentAPI";

import s from "./style.module.css";

function CommentForm({ show, onClose, postId }) {
    const [content, setContent] = useState("");
    const [imageList, setImageList] = useState([]);

    const dispatch = useDispatch();

    const uploadFile = async (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "images_preset");

        try {
            let cloudName = process.env.REACT_APP_CLOUD_NAME;
            let resourceType = "image";
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            return secure_url;
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        if (!content.trim() && imageList.length === 0) {
            return;
        }

        onClose();

        const data = {
            content: content,
            image_url: [],
            post_id: postId,
        };

        try {
            data.image_url = await Promise.all(
                imageList.map((image) => uploadFile(image))
            );

            console.log("Image URLs:", data.image_url);

            const response = await CommentAPI.create(data);
            console.log(response);

            setImageList([]);

            if (response.code === 1000) {
                console.log(response);
                dispatch(addComment(response.data));
                setContent("");
                setImageList([]);
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };


    const canSubmit = content.trim().length > 0 || imageList.length > 0;

    return (
        <Modal show={show} onHide={onClose} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title className={s.modalTitle}>
                    Add Comment
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

                    <Form.Group>
                        <motion.div whileTap={{ scale: 0.95 }}>
                            <Uploader setImageList={setImageList} />
                        </motion.div>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    style={{
                        width: "100%",
                        background: canSubmit ? "black" : "#a0a0a0",
                        color: canSubmit ? "white" : "#666",
                        borderRadius: "12px",
                        border: "none",
                        cursor: canSubmit ? "pointer" : "not-allowed"
                    }}
                >
                    Add Comment
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CommentForm;