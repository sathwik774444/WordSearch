import React, { useState } from "react";

function WordSearch() {
  const [word, setWord] = useState("");
  const [message, setMessage] = useState("");
  const [newWord, setNewWord] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [addStatus, setAddStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!word.trim()) return;
    setMessage("Searching...");
    try {
      const res = await fetch(`http://localhost:3000/get/${word}`);
      if (res.ok) {
        const data = await res.json();
        setMessage(data);
      } else {
        setMessage("Word not found");
      }
    } catch {
      setMessage("Error connecting to backend");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newWord.trim() || !newMessage.trim()) return;
    setAddStatus("Adding...");
    try {
      const res = await fetch("http://localhost:3000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: newWord, message: newMessage }),
      });
      if (res.ok) {
        setAddStatus("Word added!");
        setNewWord("");
        setNewMessage("");
      } else {
        const data = await res.json();
        setAddStatus(data.message || "Failed to add word");
      }
    } catch {
      setAddStatus("Error connecting to backend");
    }
  };

  return (
    <div>
      <ul className="nav">
        <li>
          <b>
            <a href="/">Wordsearch</a>
          </b>
        </li>
      </ul>
      <form id="formtype" onSubmit={handleSubmit}>
        <input
          type="text"
          id="word"
          placeholder="Type the word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <div id="message">
          <textarea
            id="display"
            value={message}
            readOnly
          />
        </div>
        <button type="submit" id="button">
          Search
        </button>
      </form>
      <form id="addform" onSubmit={handleAdd} style={{ marginTop: 40 }}>
        <input
          type="text"
          placeholder="New word"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="New message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button type="submit" id="button">
          Add Word
        </button>
        <div style={{ marginTop: 10, color: "#388e3c" }}>{addStatus}</div>
      </form>
      <div id="f">
        <footer>
          <p>&copy; 2024 Wordsearch</p>
        </footer>
      </div>
    </div>
  );
}

export default WordSearch;