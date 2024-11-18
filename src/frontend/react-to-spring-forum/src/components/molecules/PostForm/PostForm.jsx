import { useState } from "react";
import Uploader from "../../atoms/Uploader/Uploader";
import s from "./style.module.css";
import { RiCloseLargeFill } from "react-icons/ri";
import { motion } from "framer-motion";
import axios from "axios";

const PostForm = ({ toggleIsPostPopup }) => {
  const [imageList, setImageList] = useState([]);

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
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = async () => {
    imageList.forEach(async (image) => {
      const imageUrl = await uploadFile(image);
      console.log(imageUrl);
    });
    setImageList([]);
    console.log("File upload success!");
  };

  return (
    <motion.div
      className={s.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={s.container}
        initial={{ scale: 0.8, y: "-50%", opacity: 0 }}
        animate={{ scale: 1, y: "0%", opacity: 1 }}
        exit={{ scale: 0.8, y: "-50%", opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className={s.header}>
          <h3>What's on your mind?</h3>
        </div>
        <input className={s.title} placeholder="Enter the title..."></input>
        <textarea
          className={s.content}
          placeholder="Enter the content..."
        ></textarea>
        <motion.div className={s.uploader} whileTap={{ scale: 0.95 }}>
          <Uploader setImageList={setImageList} />
        </motion.div>
        <motion.button
          className={s.post_button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePost}
        >
          Post
        </motion.button>
        <motion.button
          className={s.close_popup}
          whileHover={{ rotate: 90 }}
          onClick={() => toggleIsPostPopup()}
        >
          <RiCloseLargeFill />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PostForm;
