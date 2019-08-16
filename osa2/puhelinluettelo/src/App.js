import React, { useState, useEffect } from 'react'
import personService from './services/personserver'

const Persons = ({newFilter, persons, setPersons}) => 
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

  const personRemover = (person) => personService
                                      .remove(person.id)
                                      .then(returned => {
                                          //console.log(returned)
                                          const personsCopy = persons.filter(
                                            item => item.id !== person.id)
                                          setPersons(personsCopy)
                                      })           

  const names = () => {
    return filteredPersons.map(person => 
                      <p key={person.name}>
                          {person.name} {person.number} 
                          <button onClick={() => 
                              {
                                if(window.confirm(`Delete ${person.name}?`))
                                {
                                  return personRemover(person)
                                }
                              }                          
                            }>
                                    delete
                          </button>
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
  const shortid = require('shortid')

  const addName = (event) => 
  {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personAlready = persons.find((person) => person.name === newName)
    if (personAlready) 
    {
      if (window.confirm(
           `${newName} is already added to phonebook, replace the old number with a new one`)
         )
      {
        // update the number
        personService
          .update(personAlready.id, 
                  {id:personAlready.id, 
                    name:personAlready.name,
                    number:newNumber
                  })
          .then(returnedPerson =>
            {
              setPersons(persons.map(person => 
                person.id !== personAlready.id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')              
            })  
      }
    } 
    else 
    {
      const personObject = {id: shortid.generate(), name: newName, number: newNumber}
      // sending the new person to database
      personService
        .create(personObject)
          .then(returnedPerson =>
            {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
            })
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
    personService
      .getAll()
      .then(initialPersons => 
        {
          setPersons(initialPersons)
        })
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
                  setPersons={setPersons}
        />

    </div>
  )

}

export default App
