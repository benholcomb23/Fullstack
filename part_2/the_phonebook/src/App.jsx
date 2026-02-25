import { useEffect, useState } from 'react'
import personService from './services/services'
import SuccessMessage from './components/SuccessMessage'

const People = (props) => {
  return (
    <>
    {props.name} {props.number} <button onClick={props.function}>delete person</button>
    </>
  )
}

const Numbers = (props) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {props.filtered ? props.filteredPersons.map((people) => (
          <li key={people.id}><People name={people.name} number={people.phone_number} function={() => props.handleUser(people.id)}/></li>
        )) 
        : props.persons.map((people) => (
          <li key={people.id}><People name={people.name} number={people.phone_number} function={() => props.handleUser(people.id)}/></li>
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


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber]= useState('')
  const [filterText, setFilterText] = useState('')
  const [filteredPersons, setfilteredPersons] = useState(persons)
  const [isFiltered, setIsFiltered] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
    .catch(error => {
      alert('Error found getting initial list')
    })
  }, [])

  const addPerson = (event) => {
    
    event.preventDefault()
    const person = {
        name: newName,
        phone_number: newPhoneNumber,
        id: String(persons.length + 1)
      }
    
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      console.log(existingPerson)
      const oldUser = {
        name: newName,
        phone_number: newPhoneNumber,
        id: existingPerson.id
      }
      console.log(`old user is ${oldUser}`)
      personService
        .update(oldUser.id, oldUser)
        .then(returnedPerson =>
          setPersons(persons.map(person => returnedPerson.id !== person.id  ? person : returnedPerson)),
          handleSuccessMessage(`${oldUser.name}'s number changed to ${oldUser.phone_number}`)
        )
        .catch(error => {
          handleSuccessMessage(`${oldUser.name} has already been deleted from the server`)
        })
    setNewName('')
    setNewPhoneNumber('')
    }

    else if (newName === '') {
      console.log('err')
      alert('hey you gotta put something here')
    }
    else {
      personService
        .create(person)
        .then(returnedPerson =>
          setPersons(persons.concat(returnedPerson)),
          handleSuccessMessage(`Added ${person.name}`) 
        )
        .catch(error => {
          alert('Error: Person not created')
        })  
    setNewName('')
    setNewPhoneNumber('')
    }
  }

  const handleSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')}, 5000)
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

  const handleRemovePerson = (id) => {
    confirm('Are you sure you want to delete?')
    ?
    personService
      .remove(id)
      .then(
        setPersons(
          persons.filter(person => person.id !== id)
        )
      )
      .catch(error => {
        alert('delete failed')
      })
      :
      console.log(` the id deleted was ${id}`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleFilterText={handleFilterText} setFilter={setFilter}/>
      <NewPersonForm newName={newName} handleAddPerson={handleAddPerson} newPhoneNumber={newPhoneNumber} handleNewPhone={handleNewPhone} addPerson={addPerson}/>
      {(successMessage === '')
      ? null
      : <SuccessMessage message={successMessage}/>}
      <Numbers filtered={isFiltered} filteredPersons={filteredPersons} persons={persons} handleUser={handleRemovePerson}/>
    </div>
  )
}

export default App