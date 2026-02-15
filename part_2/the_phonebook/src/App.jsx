import { useState } from 'react'

const Numbers = (props) => {
  return (
    <>
    {props.name} 
    </>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1
     }
  ]) 
  const [newName, setNewName] = useState('')

  
  const addPerson = (event) => {
    const existingPerson = persons.find(person => person.name === newName)
    console.log(existingPerson)
    event.preventDefault()
    console.log(newName)
    const person = {
        name: newName,
        id: String(persons.length + 1)
      }
    if (existingPerson) {
      console.log('err')
      alert('hey this thing exists')
    }
    else if (newName === '') {
      console.log('err')
      alert('hey you gotta put something here')
    }
    else {
    setPersons(persons.concat(person))
        
    setNewName('')
    }
  }

  const handleAddPerson = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value ={newName} onChange={handleAddPerson}/>
        </div>
        <div>
          <button 
          type="submit" 
          onClick={addPerson}
          >
          add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((number) => (
          <li><Numbers name={number.name} /></li>
        ))}
      </ul>
      
    </div>
  )
}

export default App