import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = ()  => {

  // first entries (persons) are now fetched from  json server
  
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterCriteria, setFilterCriteria] = useState('')

  // add effect-hook:
  // this requests a response from json server via axios.get
  // if we get a response (promise fulfilled) then the data of
  // the response is used to set persons (entries)
  useEffect((() => {
      console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promis fulfilled');
          setPersons(response.data);
        })
    }
  ), []) // effect is only run along the 1st render of the component

  console.log('render', persons.length, 'notes')

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

  // onChange event handler for filter
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterCriteria(event.target.value) // this makes the input text appear in form input field
  }

  // create a filtered version of the "persons"-array using filter-method
  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(filterCriteria.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterCriteria} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addNameAndNumber} name={newName} number={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

// 3 components were already extracted in part 2.9*:
// Filter, PersonForm and Person

export default App
