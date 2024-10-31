import { useState } from "react";
import Uploader from "../../atoms/Uploader/Uploader";
import s from "./style.module.css";
import { RiCloseLargeFill } from "react-icons/ri";
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
    <div className={s.overlay}>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.avatar}>
            <img
              src="https://api.dicebear.com/5.x/bottts/svg?seed=huper"
              alt="huper"
            />
          </div>
          <div className={s.name}>Huper</div>
        </div>
        <textarea className={s.content}></textarea>
        <div className={s.uploader}>
          <Uploader setImageList={setImageList} />
        </div>
        <button className={s.post_button} onClick={handlePost}>
          Post
        </button>
        <button className={s.close_popup} onClick={() => toggleIsPostPopup()}>
          <RiCloseLargeFill />
        </button>
      </div>
    </div>
  );
};

export default PostForm;
