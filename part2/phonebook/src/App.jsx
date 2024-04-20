import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = ()  => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterCriteria, setFilterCriteria] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect((() => {
      console.log('effect')
      personService
        .getAll()
        .then(initialPersons => {
          console.log('promise fulfilled');
          setPersons(initialPersons);
        })
    }
  ), [])

  console.log('render', persons.length, 'notes')

  const addNameAndNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const existingPerson = persons.find(person => person.name === newName)

    if(existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber}
        personService.update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map((person) => person.id == existingPerson.id ? returnedPerson : person))
          setErrorMessage({message: `Changed ${returnedPerson.name}'s number to ${returnedPerson.number}`, type: 'success'})
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            {message: `Information of ${existingPerson.name} has already been removed from server`, type: 'error'})
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        });
      }
    }
    else {
    const newEntry = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    }
    personService.create(newEntry)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage({message: `Added ${returnedPerson.name}`, type: 'success'})
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
    setNewName('') 
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) 
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterCriteria(event.target.value)
  }

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(filterCriteria.toLowerCase())
  })

  // I also added a message for deleting an entry for cases 'success' and 'error':
  const handleDelete = (id) => {
    console.log("Deleting person with id:", id);
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService.remove(id)
        .then(() => {
          console.log("Person deleted successfully");
          setErrorMessage({message: `Deleted ${personToDelete.name}`, type: 'success'})
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          setErrorMessage({ message: `Error deleting ${personToDelete.name}`, type: 'error' })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage ? errorMessage.message : null} type={errorMessage ? errorMessage.type : null} />
      <Filter value={filterCriteria} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addNameAndNumber} name={newName} number={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App
