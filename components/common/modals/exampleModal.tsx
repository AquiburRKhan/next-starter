import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ExampleModal = (props) => {

    return (
        <Modal show={props.showModal} onHide={props.handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleModalClose}>
                    Close
          </Button>
                <Button variant="primary" onClick={props.handleModalClose}>
                    Save Changes
          </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ExampleModal;
