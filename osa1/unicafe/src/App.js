import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text == "positive") {
    return (
      <p>{props.text}: {props.value} %</p>
    )
  }
  return (
    <p>{props.text}: {props.value}</p>
  )
}

const Statistics = (props) => {
  console.log(props)
  if (props.nmb_a == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
    <StatisticLine text="good" value ={props.nmb_g} />
    <StatisticLine text="neutral" value ={props.nmb_n} />
    <StatisticLine text="bad" value ={props.nmb_b} />
    <StatisticLine text="all" value ={props.nmb_a} />
    <StatisticLine text="average" value ={(props.nmb_g-props.nmb_b)/props.nmb_a} />
    <StatisticLine text="positive" value ={100*props.nmb_g/props.nmb_a} />
    </div>
    
  )
  
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <div>
      <h1>Statistics</h1>
      <Statistics nmb_g={good} nmb_n={neutral} nmb_b={bad} nmb_a={all} />
      </div>
    </div>
  )
}

export default App