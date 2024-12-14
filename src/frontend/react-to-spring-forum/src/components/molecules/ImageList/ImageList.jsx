import {Button} from "react-bootstrap";
import {X} from "lucide-react";
import React from "react";

import s from './style.module.css'

function ImageList({images, removeImage}) {
    return (
        <>
            {images.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mb-3">
                    {images.map((image, index) => {
                        const isBlob = image instanceof Blob || image instanceof File;
                        return (
                            <div key={index} className="position-relative">
                                <img
                                    src={isBlob ? URL.createObjectURL(image) : image}
                                    alt={`Upload ${index}`}
                                    className={s.image}
                                />
                                <Button
                                    variant="dark"
                                    size="sm"
                                    onClick={() => removeImage(index)}
                                    className={"position-absolute top-0 start-100 translate-middle p-0 rounded-circle " + s.removeButton}
                                >
                                    <X size={12}/>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default ImageList;