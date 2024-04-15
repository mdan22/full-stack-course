import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = ()  => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-1234567', id: 1}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  

  // set the new entry object with name and later number
  const newEntry = {
    name: newName,
    number: newNumber,
    id: persons.length + 1,
  }

  // onSubmit - event handler
  // adds "newEntry"-entry to "persons"-list
  const addNameAndNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    // here we could check if both a name and a number have been provided
    // check if phonebook already includes newName
    if(persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`) // we need to use backticks `
    }
    // here we could check if number is already used in an else if statement
    else {
      setPersons(persons.concat(newEntry))
    }
    setNewName('') // reset string of form field
    setNewNumber('')
  }

  // onChange event handler for name
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) // this makes the input text appear in form input field
  }

  // onChange event handler for number
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value) // this makes the input text appear in form input field
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <PersonForm onSubmit={addNameAndNumber} name={newName} number={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
