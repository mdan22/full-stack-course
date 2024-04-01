import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>


const calculateAverage = ({good, bad, all}) => {
  if (all === 0) {return 0}
  return ((good - bad) / all)
} 

const calculatePositive = ({good, all}) => {
  if (all === 0) {return 0}
  return (good / all)
}

const Variable = ({name, value, etc}) => <p>{name} {value} {etc}</p>

const Content = ({good, neutral, bad, all}) => (
  <div>
    <Variable name={"good"} value={good} />
    <Variable name={"neutral"} value ={neutral} />
    <Variable name={"bad"} value={bad} />
    <Variable name={"all"} value={all} />
    <Variable name={"average"} value={calculateAverage({good, bad, all})} />
    <Variable name={"positive"} value={calculatePositive({good, all})} etc={"%"} />
  </div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      {/* buttons: */}
      <Button onClick={() => {setGood(good + 1), setAll(all + 1), console.log('good clicked, value before: ', good)}} text="good" />
      <Button onClick={() => {setNeutral(neutral + 1), setAll(all + 1), console.log('neutal clicked, value before: ', neutral)}} text="neutral" />
      <Button onClick={() => {setBad(bad + 1), setAll(all + 1), console.log('bad clicked, value before: ', bad)}} text="bad" />
      
      {/* results: */}
      <Header text="statistics" />
      <Content good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App