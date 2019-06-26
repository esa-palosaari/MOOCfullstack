import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral

  return (
    <div>
        <h2>Give feedback</h2>
        <button onClick={() => setGood(good+1)}>good</button>
        <button onClick={() => setNeutral(neutral+1)}>neutral</button>
        <button onClick={() => setBad(bad+1)}>bad</button>
        <h2>Statistics</h2>
        <p> Good: {good}<br />
            Neutral: {neutral}<br />
            Bad: {bad} <br />
            All: {all} <br />
            Average: {(good-bad) / all} <br />
            Positive: {good/all * 100} %
        </p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)