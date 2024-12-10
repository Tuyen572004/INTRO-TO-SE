import {useState} from "react";
import Uploader from "../../atoms/Uploader/Uploader";
import s from "./style.module.css";
import {RiCloseLargeFill} from "react-icons/ri";
import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {PostAPI} from "../../../api/PostAPI";
import axios from "axios";
import {addPost} from "../../../store/postSlice";
import {addMyPost} from "../../../store/myPostSlice";

const PostForm = ({toggleIsPostPopup}) => {
    const [title, setTitle] = useState("");
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
            const {secure_url} = res.data;
            return secure_url;
        } catch (error) {
            console.error(error);
        }
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
            console.log("File upload and post creation success!");

            if (response.code === 1000) {
                console.log("Post created successfully:", response.data);
                dispatch(addPost(response.data));
                dispatch(addMyPost(response.data));
                toggleIsPostPopup();
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <motion.div
            className={s.overlay}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >
            <motion.div
                className={s.container}
                initial={{scale: 0.8, y: "-50%", opacity: 0}}
                animate={{scale: 1, y: "0%", opacity: 1}}
                exit={{scale: 0.8, y: "-50%", opacity: 0}}
                transition={{duration: 0.4, ease: "easeInOut"}}
            >
                <div className={s.header}>
                    <h3>What's on your mind?</h3>
                </div>
                <input
                    className={s.title}
                    placeholder="Enter the title..."
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
                <textarea
                    className={s.content}
                    placeholder="Enter the content..."
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <motion.div className={s.uploader} whileTap={{scale: 0.95}}>
                    <Uploader setImageList={setImageList}/>
                </motion.div>
                <motion.button
                    className={s.post_button}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.95}}
                    onClick={handlePost}
                >
                    Post
                </motion.button>
                <motion.button
                    className={s.close_popup}
                    whileHover={{rotate: 90}}
                    onClick={() => toggleIsPostPopup()}
                >
                    <RiCloseLargeFill/>
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default PostForm;
