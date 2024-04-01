import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const getRandomInt = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max-min)) + min
  return randomNumber
}

const Anecdote = ({anecdotes, selected}) => (
  <div>
    {anecdotes[selected]}
  </div>
)

const Counter = ({votes, selected}) => (
  <div>
    has {votes[selected]} votes
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initialVotes = new Uint8Array(10); 

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)
  
  const onVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    console.log('clicked vote, vote count is now', copy[selected])
    setVotes(copy)
  }
  
  const onClick = () => {
    const number = getRandomInt(0, anecdotes.length)
    console.log('clicked next anecdote, load anecdote state', number)
    setSelected(number)
  }

  return (
    <div>
      <Anecdote anecdotes={anecdotes} selected={selected} />
      <Counter votes={votes} selected={selected} />
      <Button onClick={onVote} text="vote" />
      <Button onClick={onClick} text="next anecdote" />
    </div>
  )
}

export default App