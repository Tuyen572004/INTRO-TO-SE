import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const ConfirmDeleteModal = ({show, onHide, onConfirm}) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete ?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} style={{borderRadius: '50px'}}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm} style={{backgroundColor: 'black', borderColor: 'black', borderRadius: '50px'}}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;