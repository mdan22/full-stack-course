import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

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
      // we now use personService.getAll() instead of axios.get
      personService
        .getAll()
        .then(initialPersons => {
          console.log('promis fulfilled');
          setPersons(initialPersons);
        })
    }
  ), []) // effect is only run along the 1st render of the component

  console.log('render', persons.length, 'notes')

  // onSubmit - event handler
  // adds "newEntry"-entry to "persons"-list
  const addNameAndNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    // set the new entry object
    const newEntry = {
      name: newName,
      number: newNumber,
      // toString necessary bc deleting entries doesnt work otherwise
      id: (persons.length + 1).toString(),
    }

    // here we could check if both a name and a number have been provided
    // check if phonebook already includes newName
    if(persons.some((person) => person.name === newName)) {
      alert(`'${newName}' is already added to phonebook`) // we need to use backticks `
    }
    // here we could check if number is already used in an else if statement
    else {
      personService.create(newEntry)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          // reset string of form fields:
          setNewName('') 
          setNewNumber('')
        })
    }
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

  // event handler for deleting entry by id 
  const handleDelete = (id) => {
    console.log("Deleting person with id:", id);
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService.remove(id)
        .then(() => {
          console.log("Person deleted successfully");
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error deleting entry:', error);
        });
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterCriteria} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addNameAndNumber} name={newName} number={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App
