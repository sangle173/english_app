import { motion } from "framer-motion";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Volume2, BookOpen } from "react-feather"; // Corrected icons

const { electron } = window;

const getTypeAbbreviation = (type) => {
    if (!type) return "";
    const typeMap = {
        "noun": "n.",
        "verb": "v.",
        "adjective": "adj.",
        "adverb": "adv.",
        "pronoun": "pron.",
        "preposition": "prep.",
        "conjunction": "conj.",
        "interjection": "interj."
    };
    return typeMap[type.toLowerCase()] || type;
};

const FlashCard = ({ word, type, definition, pronunciation, vietnamese, example, onSpeak, imagePath }) => {
    return (
        <motion.div
            className="d-flex justify-content-center align-items-stretch"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
        >
            <Card className="flashcard shadow-lg text-center d-flex flex-column">
                {imagePath && (
                    <div className="flashcard-image-container">
                        <Card.Img className="flashcard-image" variant="top" src={imagePath} alt={word} />
                    </div>
                )}
                <Card.Body className="d-flex flex-column">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-${word}`}>{example || "No example available"}</Tooltip>}
                    >
                        <Card.Title className="text-primary fs-4 fw-bold">
                            {word} <span className="text-muted fs-6">({pronunciation} {getTypeAbbreviation(type)})</span>
                        </Card.Title>
                    </OverlayTrigger>
                    <Card.Text className="text-dark flex-grow-1">{definition}</Card.Text>
                    <Card.Text className="text-success fw-semibold">{vietnamese}</Card.Text>
                    <div className="mt-auto d-flex justify-content-center gap-3">
                        <Button variant="primary" size="sm" onClick={onSpeak}>
                            <Volume2 size={18} />
                        </Button>
                        <Button
                            variant="info"
                            size="sm"
                            onClick={() => electron?.send("open-word-details", word)}
                        >
                            <BookOpen size={18} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </motion.div>
    );
};

export default FlashCard;
