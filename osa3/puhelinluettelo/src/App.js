import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import PersonService from './services/personser'
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
  const [message, setMessage] = useState('')
  const [successful, setSuccessful] = useState(null)
  useEffect(() => {
    PersonService
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

    if (newName === '') {
      setSuccessful('no')
      setMessage(
        `Name missing`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }

    if (newNumber === '') {
      setSuccessful('no')
      setMessage(
        `Number missing`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }

    const samePerson = persons.find(e => e.name === nameObject.name)
    if (samePerson) {
      if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        PersonService
          .update(samePerson.id, nameObject)
          .then((returnedName) => {
            setPersons(persons.map((person) => person.id !== samePerson.id ? person : returnedName))
            setSuccessful('yes')
            setMessage(
              `Updated the number of ${nameObject.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setSuccessful('no')
            setMessage(
              `Information of ${samePerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(n => n.id !== samePerson.id))
          })
            setNewName('')
            setNewNumber('')
          return
    }
    else {
      return
    }
    
  }
  PersonService
    .create(nameObject)
    .then((returnedName) => {
      setPersons(persons.concat(returnedName))
      setSuccessful('yes')
      setMessage(
        `Added ${nameObject.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    })
    .catch((error) => {
      setSuccessful('no')
      setMessage(error.response.data);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
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
        PersonService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(n => n.id !== id))
            setSuccessful('yes')
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
        .catch((error) => {
          setSuccessful('no')
          setMessage(
            `Information of ${name} has already been removed from the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} successful={successful} />
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