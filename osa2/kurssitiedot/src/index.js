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
    return (
        <>
            <Part part={course.parts[0].name} exercises={course.parts[0].exercises}/>
            <Part part={course.parts[1].name} exercises={course.parts[1].exercises}/>
            <Part part={course.parts[2].name} exercises={course.parts[2].exercises}/>     
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.part} {props.exercises}</p>
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.parts[0].exercises + 
                                    props.parts[1].exercises + 
                                    props.parts[2].exercises}</p>
        </>
    )
}

const Course = ({course}) => {
    console.log('course props', course)
    return (
        <div>
            <Header course={course}/>
            <Content course={course} />
        </div>
    )
}


const App = () => {
  const course = { 
    name:'Half Stack application development',
    parts:  [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
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