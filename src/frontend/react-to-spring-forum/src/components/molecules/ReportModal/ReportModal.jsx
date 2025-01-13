import { Modal, Button, Form } from 'react-bootstrap';
import s from './style.module.css';
import React, {useEffect, useState} from "react";
import {ReportPostAPI} from "../../../api/ReportPostAPI";
const Swal = require('sweetalert2');

const ReportModal = ({ show, onHide, postId, setIsReported }) => {
    const [reason, setReason] = useState('');
    const reasonRef = React.createRef();

    const Report = async () => {
        try {
            const response = await ReportPostAPI.report({
                "postId": postId,
                "reason": reason,
            });

            console.log("Report response:", response);
            setIsReported(true);

            onHide();
            await Swal.fire({
                icon: 'success',
                title: 'Post reported!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            onHide();
            await Swal.fire({
                icon: 'error',
                title: 'An error occurred!',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    useEffect(() => {
        if (!show) {
            setReason('');
        }
    }, [show]);

    const adjustHeight = (ref) => {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered
            className="edit-post-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className={s.modalTitle}>
                    Reason for reporting
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Enter the reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    onInput={() => adjustHeight(reasonRef)}
                    ref={reasonRef}
                    className={s.textAreaCustom}

                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>
                    Cancel
                </Button>
                <Button
                    variant="dark"
                    disabled={!reason}
                    onClick={Report}
                >
                    Report
                </Button>
            </Modal.Footer>

        </Modal>
    );
};

export default ReportModal;