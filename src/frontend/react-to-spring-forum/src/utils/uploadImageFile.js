import axios from "axios";

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
}

export { uploadFile };