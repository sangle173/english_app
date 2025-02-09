import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getWordsFromCategory } from "../api/dictionary";
const { ipcRenderer } = window.require("electron");

const Reminder = () => {
    const [words, setWords] = useState([]);

    useEffect(() => {
        setWords(getWordsFromCategory().slice(0, 6)); // Pick 6 words
    }, []);

    return (
        <div className="reminder-popup" style={{
            padding: "10px",
            textAlign: "center",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
        }}>
            <h5>🔔 Time to Learn!</h5>
            <p>New Words:</p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {words.map((word, index) => (
                    <li key={index} style={{ fontWeight: "bold" }}>{word}</li>
                ))}
            </ul>
            <Button variant="primary" size="sm" onClick={() => ipcRenderer.send("open-word-window")}>
                View Details
            </Button>
            <Button variant="danger" size="sm" onClick={() => ipcRenderer.send("hide-reminder")} style={{ marginLeft: "10px" }}>
                Close
            </Button>
        </div>
    );
};

export default Reminder;
