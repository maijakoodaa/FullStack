import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personser'
import Notification from './components/Notification';

import { v4 as uuidv4 } from 'uuid';

const App = (props) => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: '040123456'},
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: '39445323523'},
    // { name: 'Dan Abramov', number: '12-43-234345', id: '1243234345'},
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: '39236423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('f')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: uuidv4()
    }

    console.log(nameObject.name)
    console.log(nameObject.number)
    console.log(persons)

    const samePerson = persons.find(e => e.name === nameObject.name)
    if (samePerson) {
      if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(samePerson.id, nameObject)
          .then((returnedName) => {
            setPersons(persons.map((person) => person.id !== samePerson.id ? person : returnedName))
            setMessage(
              `Updated the number of ${nameObject.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
      })
      setNewName('')
      setNewNumber('')
    }
    return
  }
  personService
    .create(nameObject)
    .then((returnedName) => {
      setPersons(persons.concat(returnedName))
      setMessage(
        `Added ${nameObject.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    })
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
    setNewFilter(event.target.value)
  }

  const PersonsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLocaleLowerCase()))

  const removePersons = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      return (
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(nam => nam.id !== id))
            setMessage(
              `Deleted ${name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          }
        )
      )
    }
    else {
      return
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson}
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber}
      handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>

      <Persons PersonsToShow={PersonsToShow} Remove={removePersons} />

    </div>
  )

}

export default App