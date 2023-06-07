const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.p} {props.ex}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.text} {props.sum}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content p={part1} ex={exercises1} />
      <Content p={part2} ex={exercises2} />
      <Content p={part3} ex={exercises3} />
      <Total text={'Number of exercises'} sum={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App