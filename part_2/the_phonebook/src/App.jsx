import { useState } from 'react'

const People = (props) => {
  return (
    <>
    {props.name} {props.number}
    </>
  )
}

const Numbers = (props) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {props.filtered ? props.filteredPersons.map((people) => (
          <li key={people.id}><People name={people.name} number={people.phone_number}/></li>
        )) 
        : props.persons.map((people) => (
          <li key={people.id}><People name={people.name} number={people.phone_number}/></li>
        )) 
        }
      </ul>
    </>
  )
}

const Filter = (props) => {
  return (
    <form>
    <div>
    filter by name: <input value={props.filterText} onChange={props.handleFilterText}/>
    </div>
    <div>
      <button 
      type="submit"
      onClick={props.setFilter}
      >
      filter
      </button>
    </div>
  </form>
  )
}

const NewPersonForm = (props) => {
  return(
  <>
  <h2>add a new</h2>
  <form>
  <div>
    name: <input value ={props.newName} onChange={props.handleAddPerson}/>   
  </div>
  <div>
    phone #: <input value={props.newPhoneNumber} onChange={props.handleNewPhone}/>
  </div>
  <div>
    <button 
    type="submit" 
    onClick={props.addPerson}
    >
    add
    </button>
  </div>
  </form>
  </>
  )
}


const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber]= useState('')
  const [filterText, setFilterText] = useState('')
  const [filteredPersons, setfilteredPersons] = useState(persons)
  const [isFiltered, setIsFiltered] = useState(false)
  
  const addPerson = (event) => {
    const existingPerson = persons.find(person => person.name === newName)
    event.preventDefault()
    const person = {
        name: newName,
        phone_number: newPhoneNumber,
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

  const setFilter = (event) => {
    event.preventDefault()
    setfilteredPersons(persons.filter(person => person.name.toLowerCase().startsWith(filterText.toLowerCase())))
    setIsFiltered(true)
    console.log(filteredPersons)
  }

  const handleAddPerson = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNewPhone = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFilterText = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleFilterText={handleFilterText} setFilter={setFilter}/>
      <NewPersonForm newName={newName} handleAddPerson={handleAddPerson} newPhoneNumber={newPhoneNumber} handleNewPhone={handleNewPhone} addPerson={addPerson}/>
      <Numbers filtered={isFiltered} filteredPersons={filteredPersons} persons={persons}/>
    </div>
  )
}

export default App