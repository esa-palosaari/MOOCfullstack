import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => 
{
    if(text==="Positive") 
    {
        return (
            <>
                {text}: {value} % <br/>
            </>
        )
    } else 
    {
        return (
            <>
                {text}: {value}  <br/>
            </>
        )
    }
}

const Statistics = ({neutral, bad, good, all}) => 
{
    if (all !==0 ) 
    {
        return (
            <div>
                <h2>Statistics</h2>
                <p> 
                    <Statistic text="Good" value={good} />
                    <Statistic text="Neutral" value={neutral} />
                    <Statistic text="Bad" value={bad} />
                    <br />
                    <Statistic text="All" value={all} />
                    <Statistic text="Average" value={(good-bad) / all} />
                    <Statistic text="Positive" value={good/all * 100} />
                </p>
            </div>
    )
    } else return (
        <div>
            <h2>Statistics</h2>
            <p>No feedback given.</p>
        </div>
    )
}

const Button = ({handleClick, name}) => 
(
    <button onClick={handleClick}>
        {name}
    </button>
)

const App = () => 
{
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral

  return (
    <div>
        <h2>Give feedback</h2>
        <Button handleClick={()=> setGood(good+1)} name="good" />
        <Button handleClick={() => setNeutral(neutral+1)} name="neutral" />
        <Button handleClick={() => setBad(bad+1)} name="bad" />
        <Statistics neutral={neutral} bad={ bad} good={good} all={all}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)