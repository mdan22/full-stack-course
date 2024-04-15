import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = ()  => {
  // hard coded test-cases:
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ])
  
  // or use this starting-state for persons:
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterCriteria, setFilterCriteria] = useState('')

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
