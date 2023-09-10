Made a Header.jsx component which holds the header html element with it's css properties:
```js
import React from "react";


function Header() {
    return (
        <header>
            <h1>Keeper</h1>
        </header>
    );
}

export default Header;
```
a Footer.jsx component with the footer element/css
```js
import React from "react";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

function Footer() {
    return (
        <footer>
            <p >
                Copyright ⓒ {currentYear}
            </p>
        </footer>
    );
}

export default Footer;
```
and a Note.jsx with a p and h1 inside of a parent div with css class of note:
```js
import React from "react";


function Note() {
    return (
        <div className="note">
           <h1>This is the note title</h1>
           <p>This is the note content</p>
        </div>
    );
}

export default Note;
```
all of these exports were imported into the App.jsx file
```js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {
    return (
      <div>
        <Header />
        <Note />
        <Footer />
      </div>
    );
  }
  
  export default App;
```
To display all of the components I will import the App.ejx into my index.js file
```js
import App from "./components/App";

ReactDOM.render(<App /> ,document.getElementById('root'));
```

## Step 2
I have added 4 default notes in the "notes.js" file and exported it then diplayed all it's properties using the map() function into the Note component structure inside App.jsx
```js
import notes from "../notes";

function App() {
  return (
    <div>
      <Header />
      {notes.map(note => (
        <Note
          key={note.key}
          title={note.title}
          content={note.content}
        />
      )
      )}
      <Footer />
    </div>
  );
}
```

## V2

Will change the App to dynamically add notes, which means we do not need the notes.js file anymore.   
Added a CreateArea.jsx Component which takes two Inputs (title, content) if the "Add" button is clicked :

```js
function CreateArea() {
  return (
    <div>
      <form>
        <input name="title" placeholder="Title" />
        <textarea name="content" placeholder="Take a note..." rows="3" />
        <button>Add</button>
      </form>
    </div>
  );
}
```

To make this work firstly a useState that saves the Input onChange is needed:

```js
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
```

A `onChange` event listener that points to the `handleOnChange` function is needed on both the Inputs and the Input's values must also be equal to one Truth

```js
import React, { useState } from "react";

function CreateArea(props) {

    return (
        <div>
            <form>
                <input
                    onChange={props.handleOnChange} name="title"
                    value={props.note.title} placeholder="Title"
                />

                <textarea
                    onChange={props.handleOnChange} name="content"
                    value={props.note.content} placeholder="Take a note..." rows="3"
                />

                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
```

To fix the page refreshing each time the "Add" button gets pressed and to save the Input's data into another State I used a `onClick` event for the button which fixes both these issues :

```js
<button type="submit" onClick={props.handleOnClick}>Add</button>
```

In the handleOnClick function I'm passing the onChange State of the Inputs to be saved definitely into another State. Then resetting the Inputs to be empty again:

```js
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
```

These are the props that I passed in App.jsx for the CreateArea Component:

```js
<CreateArea
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
        note={note} />
```

Finally, to display the saved Inputs from their useState I'm using the map function within App.jsx:

```js
{addedNote.map((note, index) => (
        <Note
          note={note}
          index={index}
          key={index}
        />
      ))}
```

In the Note Component jsx I'm giving each div (Note item) a unique index and associating note's title with the h1 and note's content with the p as props

```js
import React from "react";

function Note(props) {
    return (
        <div key={props.index} className="note">

            <h1>{props.note.title}</h1>
            <p>{props.note.content}</p>
            <button>DELETE</button>
            
        </div>
    );
}

export default Note;
```

For the deletion method I used the `filter` function for the saved State items and set them with `setAddedNote` to be equal to all the previous notes except the ones with a matching id. And the matching id gets compared with the ones the user clicks the `DELETE` button on `<button onClick={props.handleDelete}>DELETE</button>`.   

```js
function handleDelete(index) {
    setAddedNote((prevNotes) => {
      return prevNotes.filter((item, id) => {
        return id !== index;
      })
    })
  }
```

Which means the Note component in the App.jsx now needs to identify the `handleDelete` aswell and we can tell it through `onChecked={handleDelete}`