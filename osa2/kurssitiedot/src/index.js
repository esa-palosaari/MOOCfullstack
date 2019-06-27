import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
    console.log('header props', course)
    return (
        <>
            <h1>{course.name}</h1>
        </>
    )
}

const Content = ({course}) => {
    console.log('content props', course)
    const rows = () =>
    course.parts.map(mappedPart => 
        <Part key={mappedPart.id} part={mappedPart.name} exercises={mappedPart.exercises} />)
    return (
        <>
            {rows()}   
        </>
    )
}

const Part = (props) => {
    console.log('Part props', props)
    return (
        <>
            <p key={props.id}>{props.part} {props.exercises}</p>
        </>
    )
}

const Total = ({course}) => {
    console.log('Total props', course)

    const exerciseSum = () =>
        course.parts.reduce((sum, current) => sum + current.exercises, 0)

    return (
        <>
            <p><b>Number of exercises {exerciseSum()}</b></p>
        </>
    )
}

const Course = ({course}) => {
    console.log('course props', course)
    return (
        <div>
            <Header course={course}/>
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}


const App = () => {
  const course = { 
    name:'Half Stack application development',
    parts:  [
        {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
        },
        {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
        },
        {
            name: 'State of a component',
            exercises: 14,
            id: 3
        }
    ]
  }

  return (
    <div>
        <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))