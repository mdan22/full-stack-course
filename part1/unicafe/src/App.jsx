import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      {/* buttons: */}
      <Button handleClick={() => {setGood(good + 1), console.log('good clicked, value before: ', good)}} text="good" />
      <Button handleClick={() => {setNeutral(neutral + 1), console.log('neutal clicked, value before: ', neutral)}} text="neutral" />
      <Button handleClick={() => {setBad(bad + 1), console.log('bad clicked, value before: ', bad)}} text="bad" />
      
      {/* results */}
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App