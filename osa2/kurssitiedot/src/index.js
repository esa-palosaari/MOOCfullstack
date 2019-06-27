import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
    console.log('header props', course)
    return (
        <>
            <h2>{course.name}</h2>
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
    const courses = [
        {
          name: 'Half Stack application development',
          parts: [
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
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

      console.log(courses)

      const courseModules = () => 
          courses.map(mappedCourse => {
            console.log('mappedCourse', mappedCourse)
            return <Course course={mappedCourse} /> })
    

      console.log('kurssit mapattuna: ', courseModules())

  return (
    <div>
        <h1>Web development curriculum</h1>
        {courseModules()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))