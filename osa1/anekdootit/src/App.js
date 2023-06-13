import { useState } from 'react'

// const Vote = (props) => {
//   console.log(props)
//   vote_table
// }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(8).fill(0))

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleVote = () => {
    console.log('voted')
    //constvote_table = [...vote_table]
// kasvatetaan taulukon paikan 2 arvoa yhdellä
    // const copy = [ ...vote_table]
    // copy[(selected)] += 1  
    // vote_table = copy
    const copy = [...votes]
    copy[selected] += 1
    console.log('selected', selected)
    setVotes(copy)
    console.log('votes', votes[selected])
  }

  const handleClick = () => {
    console.log('clicked the button')
    setSelected(getRandomInt(0, 7))
  }
console.log('initial', votes[1])
  return (
    <div>
      {anecdotes[selected]}
      
      <br></br>
      <p>
        Has {votes[selected]} votes
      </p>
      <br></br>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleClick}>Next anecdote</button>
    </div>
  )
}

export default App