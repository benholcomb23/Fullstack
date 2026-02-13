const Courses = (props) => {
  const courses = props.courses
  return (
    <>
    {courses.map((course) => 
    <div key={course.id}>
      <Course course={course}/>
    </div>
    )}
    </>
  )
}

const Course = (props) => {
  let course = props.course
  console.log(course)
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
  <>
    <h1>{props.name}</h1>
  </>
  )
}

const Part = (props) => {
  return (
  <>
    {props.part} {props.exercises}
  </>
  )
}

const Content = (props) => {
  let parts = props.parts
  return (
    <ul>
      {parts.map((part) => 
      <li key={part.id}>
        <Part part={part.name} exercises={part.exercises}/>
      </li>
      )}

    </ul>
  )
}

const Total = (props) => {
  const parts = props.parts
  const total = parts.reduce((total, i) => {
    return total + i.exercises
  }, 0)
  
  return (
    <>
    total of {total} exercises
    </>
  )
}

export default Courses