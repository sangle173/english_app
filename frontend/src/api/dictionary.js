const DICTIONARY_API = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const TRANSLATE_API = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyDhL0TOSEq9zJnNjxqemh5DTxokTfa7i1E";
import wordList from "../data/words.json";

// Categories to rotate through
const categories = ["common_words", "it_words", "business_words", "science_words", "daily_words"];
let currentCategoryIndex = 0;

// Function to get 6 random words from the JSON list
export function getWordsFromCategory() {
    const category = categories[currentCategoryIndex];
    currentCategoryIndex = (currentCategoryIndex + 1) % categories.length; // Cycle categories
    const words = wordList[category];
    return words.sort(() => 0.5 - Math.random()).slice(0, 6);
}

// Fetch word definition, translation, and example sentence
export async function getWordData(word) {
    try {
        const response = await fetch(`${DICTIONARY_API}${word}`);
        const data = await response.json();

        const definition = data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found";
        const pronunciation = data[0]?.phonetic || "No pronunciation available";
        const example = data[0]?.meanings[0]?.definitions[0]?.example || "No example available";

        // Fetch Vietnamese translation
        const translationRes = await fetch(`${TRANSLATE_API}&q=${encodeURIComponent(word)}&source=en&target=vi`);
        const translationData = await translationRes.json();
        const vietnamese = translationData?.data?.translations[0]?.translatedText || "No translation available";

        return { word, definition, pronunciation, vietnamese, example };
    } catch (error) {
        console.error("Error fetching word data:", error);
        return null;
    }
}