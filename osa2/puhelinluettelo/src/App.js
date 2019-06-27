import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number: '040-1234567'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const names = () => {
      return persons.map(person => 
                        <p key={person.name}>
                            {person.name} {person.number}
                        </p>)
  }

  const addName = (event) => {
      event.preventDefault()
      console.log('button clicked', event.target)
      if (persons.find((person) => person.name === newName)) {
        window.alert(`${newName} is already added to phonebook`)
      } else {
        setPersons([...persons, {name:newName, number:newNumber}])
        setNewName('')
        setNewNumber('')
      }
      
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={event => setNewName(event.target.value)} 
                        value={newName} />
        </div>
        <div>
            number: <input onChange={event => setNewNumber(event.target.value) }
                            value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {names()}
    </div>
  )

}

export default App