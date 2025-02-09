import { Modal, Button } from "react-bootstrap";

const WebViewModal = ({ show, onClose, word }) => {
    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>📖 {word} - Cambridge Dictionary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <iframe
                    src={`https://dictionary.cambridge.org/dictionary/english/${word}`}
                    width="100%"
                    height="500px"
                    style={{ border: "none" }}
                    title={`Cambridge Dictionary - ${word}`}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WebViewModal;
