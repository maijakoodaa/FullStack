import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }
  
    console.log(nameObject.name)
    console.log(persons)

    if (persons.find(e => e.name === nameObject.name)) {
      alert(`${nameObject.name} is already added to phonebook`)
      return
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log(persons)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <p>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>))}
      </p>
    </div>
  )

}

export default App