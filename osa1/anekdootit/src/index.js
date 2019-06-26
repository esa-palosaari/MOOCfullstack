import React, { useState } from 'react'
import ReactDOM from 'react-dom'


// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}


const Winner = ({votes, anecdotes}) => {
    const mostVotes = Math.max(...votes)
    const mostVotesIndex = votes.indexOf(mostVotes) 
    return (
        <div>
            <h2>Anecdote with most votes</h2>
            <p>
                {anecdotes[mostVotesIndex]} <br />
                has {mostVotes} votes
            </p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] =  useState(
                                Array.apply(
                                            null, new Array(
                                                            props.anecdotes.length
                                                            )
                                ).map(
                                      Number.prototype.valueOf, 0
                                     )
                            )

    const nextAnecdote = () => (setSelected(getRandomInt(0, props.anecdotes.length)))  
    
    const vote = () => {
        const copypoints = [...votes]
        copypoints[selected] += 1
        setVotes(copypoints)
    }

    console.log(votes)

  return (
    <div>
        <h2>
            Anecdote of the day
        </h2>
        {props.anecdotes[selected]} <br />
        <p>has {votes[selected]} votes</p>
        

        <button onClick={vote}>
            vote
        </button>
        <button onClick={nextAnecdote}>
          next andecdote
        </button>

        <Winner votes={votes} anecdotes={props.anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)