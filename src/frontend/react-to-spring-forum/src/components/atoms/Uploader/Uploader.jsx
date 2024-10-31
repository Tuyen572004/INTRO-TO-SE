import { useEffect } from "react";
import { IoMdImages } from "react-icons/io";
import { FileUploadWithPreview } from "file-upload-with-preview";
import "file-upload-with-preview/dist/style.css";
import "./style.css";

const Uploader = ({ setImageList }) => {
  useEffect(() => {
    const upload = new FileUploadWithPreview("upload-images", {
      multiple: true,
      maxFileCount: 6,
    });

    const handleFileAdded = (e) => {
      setImageList([...upload.cachedFileArray]);
    };

    window.addEventListener(
      "fileUploadWithPreview:imagesAdded",
      handleFileAdded
    );
  }, [setImageList]);

  return (
    <>
      <div
        className="custom-file-container"
        data-upload-id="upload-images"
      ></div>
      <label htmlFor="file-upload-with-preview-upload-images">
        <IoMdImages />
      </label>
    </>
  );
};

export default Uploader;
