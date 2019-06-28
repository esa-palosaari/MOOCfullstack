import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const filterToLowerCase = newFilter.toLocaleLowerCase()

  function getPersonsOrFiltered() {
    if(newFilter !== "") {
      return persons.filter(person => 
        person.name.toLowerCase().includes(filterToLowerCase))      
    } else {
      return persons
    }
  }
  
  const filteredPersons = getPersonsOrFiltered()

  const names = () => {
      return filteredPersons.map(person => 
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

  const filterNames = (event) => {
      event.preventDefault()
      console.log('char added', event.target)
      if (newFilter === '') {
        return persons.map(person => 
            <p key={person.name}>
                {person.name} {person.number}
            </p>)          
      }
  }

  return (
    <div>
        <h2>Phonebook</h2>
        <form onChange={filterNames}>
            filter shown with: <input onChange={event => setNewFilter(event.target.value)} 
                                      value={newFilter}  
                                />
        </form>
        <h2>Add a new</h2>
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