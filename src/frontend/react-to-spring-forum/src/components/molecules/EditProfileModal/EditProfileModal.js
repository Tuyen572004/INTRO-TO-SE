import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import {UserProfileAPI} from "../../../api/UserProfileAPI";

import s from './style.module.css';

const EditProfileModal = ({ show, onHide, userProfile, setUserProfile }) => {
    const [firstName, setFirstName] = useState(userProfile?.firstName || '');
    const [lastName, setLastName] = useState(userProfile?.lastName || '');
    const [address, setAddress] = useState(userProfile?.address || '');
    const [newProfileImg, setNewProfileImg] = useState(userProfile?.profileImgUrl || '');
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (show) {
            setFirstName(userProfile?.firstName || '');
            setLastName(userProfile?.lastName || '');
            setAddress(userProfile?.address || '');
            setNewProfileImg(userProfile?.profileImgUrl || '');
        }
    }, [userProfile, show]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setNewProfileImg(previewUrl);
        } else {
            alert('Please select a valid image file.');
        }
    };

    const uploadFile = async (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'images_preset');

        try {
            const cloudName = process.env.REACT_APP_CLOUD_NAME;
            const resourceType = 'image';
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            return secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Image upload failed');
        }
    };

    const handleSave = async () => {
        const updatedProfile = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            profileImgUrl: userProfile.profileImgUrl,
        };

        try {
            const uploadedImageUrl = selectedFile ? await uploadFile(selectedFile) : null;

            updatedProfile.profileImgUrl = uploadedImageUrl || userProfile.profileImgUrl;

            const id = userProfile.userId;

            const response = await UserProfileAPI.update(id, updatedProfile);
            console.log('Profile response:', response);

            setUserProfile(response.data);

            onHide();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title className={s.title}>
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row justify-content-center align-items-center">
                    <div className="col-8">
                        <Form>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="col-4">
                        <div className={s.profileImage}>
                            <img src={newProfileImg} alt="ProfileImage" />
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="profileImgUpload" />
                            <Button size="sm" variant="dark" style={{ borderRadius: '15px' }} onClick={() => document.getElementById('profileImgUpload').click()}>
                                Change
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave} variant="dark" style={{ width: '100%', borderRadius: '15px' }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProfileModal;
