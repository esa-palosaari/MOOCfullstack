import React from 'react'

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

export default Course