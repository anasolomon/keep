import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [addedNote, setAddedNote] = useState([]);

  function handleOnChange(event) {
    const { value, name } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleOnClick(event) {
    event.preventDefault();

    if (note.title.trim() !== "" || note.content.trim() !== "") {
      setAddedNote([...addedNote, note]);
      setNote({
        title: "",
        content: ""
      });
    }
  }

  function handleDelete(index) {
    setAddedNote((prevNotes) => {
      return prevNotes.filter((item, id) => {
        return id !== index;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
        note={note}
      />
      {addedNote.map((note, index) => (
        <Note note={note} index={index} key={index} onChecked={handleDelete} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
