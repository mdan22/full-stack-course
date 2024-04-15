import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = ()  => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', id: 1}
  ])
  const [newName, setNewName] = useState('')

  // set the new entry object with name and later number
  const nameObject = {
    name: newName,
    id: persons.length + 1,
  }

  // onSubmit - event handler
  // adds "nameObject"-entry to "persons"-list
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    // check if phonebook already includes newName
    if(persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`) // we need to use backticks `
      // the alternate Java-style approach would be:
      // alert(newName + ' is already added to phonebook')
    }
    else {
      setPersons(persons.concat(nameObject))
    }
    
    setNewName('') // reset string of form field
  }

  // onChange event handler
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) // this makes the input text appear in form input field
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <PersonForm onSubmit={addName} value={newName} onChange={handleNameChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
