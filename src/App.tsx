import { useState } from "react";

export default function App() {
  const [text, setText] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [hiddenIndexes, setHiddenIndexes] = useState<Set<number>>(new Set());
  const [removeCount, setRemoveCount] = useState<number>(1);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // Handles text input
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setWords(event.target.value.split(" "));
    setHiddenIndexes(new Set()); // Reset hidden words on new input
  };

  // Handles number input
  const handleRemoveCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setRemoveCount(isNaN(value) ? 1 : value);
  };

  // Removes random words
  const removeWords = () => {
    if (words.length === 0) return;

    const availableIndexes = words.map((_, index) => index).filter((index) => !hiddenIndexes.has(index));

    if (availableIndexes.length === 0) return;

    const newHiddenIndexes = new Set(hiddenIndexes);

    for (let i = 0; i < removeCount; i++) {
      if (availableIndexes.length === 0) break;
      const randomIndex = Math.floor(Math.random() * availableIndexes.length);
      newHiddenIndexes.add(availableIndexes[randomIndex]);
      availableIndexes.splice(randomIndex, 1); // Remove from available choices
    }

    setHiddenIndexes(newHiddenIndexes);
  };

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setHiddenIndexes(new Set()); // Reset hidden words on game start
  };

  // Start over functionality
  const startOver = () => {
    setText("");
    setWords([]);
    setHiddenIndexes(new Set());
    setGameStarted(false); // Reset the game
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-200 via-pink-100 to-yellow-100">
      {/* Text Input, Number Input, and Start Button */}
      {!gameStarted && (
        <div className="w-full max-w-3xl px-4 text-center">
          <textarea
            className="w-full p-2 border-2 border-gray-500 rounded mb-2 resize-none"
            rows={4}
            placeholder="Enter text here..."
            value={text}
            onChange={handleTextChange}
            style={{ color: "black" }}
          ></textarea>

          <input
            type="number"
            className="w-full p-2 border  border-gray-500 rounded mb-2"
            min={1}
            value={removeCount}
            onChange={handleRemoveCountChange}
            style={{ color: "black" }}
          />
        </div>
      )}

      {/* Start Button */}
      {!gameStarted && (
        <button className="w-full max-w-3xl bg-green-300 text-black py-2 rounded hover:bg-green-500" onClick={startGame}>
          Start
        </button>
      )}

      {/* Remove Words Button */}
      {gameStarted && (
        <button
          className="w-full max-w-3xl bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={removeWords}
          disabled={words.length === 0}
        >
          Remove Words
        </button>
      )}

      {/* Display Words (Only after game starts) */}
      {gameStarted && (
        <div className="flex-grow flex items-center justify-center w-full p-4">
          <div className="text-center w-full ">
            {words.map((word, index) => (
              <span
                key={index}
                className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black ${hiddenIndexes.has(index) ? "invisible" : ""}`}
              >
                {word}{" "}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Start Over Button */}
      {gameStarted && (
        <button className="w-full max-w-3xl bg-red-400 text-white py-2 rounded hover:bg-red-500" onClick={startOver}>
          Start Over
        </button>
      )}
    </div>
  );
}
