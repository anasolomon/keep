import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isClicked, setIsClicked] = useState(false);

  function handleOnTouch() {
    setIsClicked(true);
  }

  return (
    <div>
      <form className="create-note">
        {isClicked && (
          <input
            onChange={props.handleOnChange}
            name="title"
            value={props.note.title}
            placeholder="Title"
          />
        )}

        <textarea
          onClick={handleOnTouch}
          onChange={props.handleOnChange}
          name="content"
          value={props.note.content}
          placeholder="Take a note..."
          rows={isClicked ? "3" : "1"}
        />
        <Zoom in={isClicked}>
          <Fab onClick={props.handleOnClick}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
