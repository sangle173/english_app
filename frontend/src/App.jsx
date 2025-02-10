import { useEffect, useState } from "react";
import FlashCard from "./components/FlashCard";
import wordData from "./data/words.json"; // Use the updated JSON
import { Container, Row, Col, Button } from "react-bootstrap";

const GOOGLE_TRANSLATE_API_KEY = "AIzaSyDhL0TOSEq9zJnNjxqemh5DTxokTfa7i1E";

const fetchTranslation = async (word) => {
    try {
        const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}&q=${word}&source=en&target=vi`
        );
        const data = await response.json();
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error("Translation error:", error);
        return "";
    }
};

function App() {
    const [wordList, setWordList] = useState([]);

    const fetchWords = async () => {
        const shuffledWords = wordData.words.sort(() => 0.5 - Math.random()); // Shuffle words
        const selectedWords = shuffledWords.slice(0, 8);
        
        // Fetch translations dynamically
        const wordDataList = await Promise.all(
            selectedWords.map(async (wordObj) => {
                const vietnameseTranslation = await fetchTranslation(wordObj.word);
                return {
                    ...wordObj,
                    vietnamese_meaning: vietnameseTranslation,
                };
            })
        );

        setWordList(wordDataList);
    };

    useEffect(() => {
        fetchWords();
    }, []);

    const speakWord = (word) => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
    };

    return (
        <Container fluid className="bg-light py-4"> {/* Changed to container-fluid */}
            <Row className="justify-content-center">
                {wordList.map((wordData, index) => (
                    <Col key={index} xs={12} sm={6} lg={3} className="mb-3 d-flex justify-content-center align-items-stretch">
                        <FlashCard
                            word={wordData.word}
                            type={wordData.type}
                            definition={wordData.english_meaning}
                            pronunciation={wordData.pronunciation || "N/A"}
                            vietnamese={wordData.vietnamese_meaning}
                            example={wordData.example}
                            imagePath={wordData.image_path} // Pass image path
                            onSpeak={() => speakWord(wordData.word)}
                        />
                    </Col>
                ))}
            </Row>

            {/* Move Refresh Button to Bottom */}
            <div className="mt-4 text-center">
                <Button variant="primary" size="lg" onClick={fetchWords}>
                    🔄 Refresh Words
                </Button>
            </div>
        </Container>
    );
}

export default App;
