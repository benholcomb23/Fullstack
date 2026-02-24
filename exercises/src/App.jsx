import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'
import Notification from './components/notification'


const App = () => {

  // Sets state with UseState React Hook, defines state functions and state variables
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('type a new note')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error message...')

  // "useEffect" is also setting a stateful connection to the json server (using our pre-defined noteService module)
  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  // Event Handlers
  // Creates a new note via the newNote current state defined by handleNoteChange(), then concats it to notes list state, updates json
  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
    .create(noteObject)  
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  // Sets a temp new note based on the current state of the input box. Does not update "notes"
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  // Searches for a note based on an id, then sets a temp variable "changedNote" that copies all variables (...note) and then sets important to it's opposite. Updates json
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // Uses ? : to definte a variable. If "showAll" True, then all notes are shown, otherwise notes are shown if important
  const notesToShow = 
    showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
          note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App