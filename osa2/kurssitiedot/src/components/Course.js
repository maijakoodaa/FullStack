const Part = props => {
    console.log(props)
    return (
      <div>
        <p>
          {props.name} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h2>
          {props.course}
        </h2>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log(props)
    return (
      <div>
        {props.parts.map(part => <Part name={part.name} exercises={part.exercises}/>)}
        {/* <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
        <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
        <Part name={props.parts[2].name} exercises={props.parts[2].exercises} /> */}
      </div>
    )
  }
  
  const Total = (props) => {
    console.log('totalin propsit', props)
    const parts_map = props.parts.map(course => course.exercises)
    let sum = parts_map.reduce(function(a, b){
      return a + b;
    });
    return (
      <div>
        <b>total of {sum} exercises</b>
      </div>
      
    )
  }
  
  const Course = (props) => {
    console.log(props)
    return(
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }

export default Course