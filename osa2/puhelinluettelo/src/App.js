import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({newFilter, persons}) => 
{
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
  return names()
}

const Filter = ({newFilter, setNewFilter, persons}) => 
{
  const filterNames = (event) => 
  {
    event.preventDefault()
    console.log('char added', event.target)
    if (newFilter === '') {
      return persons.map(person => 
          <p key={person.name}>
              {person.name} {person.number}
          </p>)          
    }
  }

  return  (
    <form onChange={filterNames}>
      filter shown with: <input onChange={event => setNewFilter(event.target.value)} 
                            value={newFilter}  
                      />
    </form>)
}

const PersonForm = ({ persons,
                      setPersons,
                      newName,
                      setNewName,
                      newNumber,
                      setNewNumber  
                    }) => 
{
  const addName = (event) => 
  {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (persons.find((person) => person.name === newName)) 
    {
      window.alert(`${newName} is already added to phonebook`)
    } else 
    {
      const personObject = {name: newName, number: newNumber}
      // sending the new person to database
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => 
          {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
          }  
        )

    }  
  }

  return (
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

 
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    const eventHandler = response => {
      setPersons(response.data)
    }
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])


  return (
    <div>
        <h2>Phonebook</h2>
        
        <Filter newFilter={newFilter} 
                setNewFilter={setNewFilter}
                persons={persons}
        />

        <h2>Add a new</h2>
        
        <PersonForm persons={persons}
                    setPersons={setPersons}
                    newName={newName}
                    setNewName={setNewName}
                    newNumber={newNumber}
                    setNewNumber={setNewNumber}
        /> 

        <h2>Numbers</h2>

        <Persons  newFilter={newFilter} 
                  persons={persons}
        />

    </div>
  )

}

export default App
