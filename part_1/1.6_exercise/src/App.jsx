import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
    {props.text}
    </button>
  )
}

const Display = (props) => {
  return(
    <h1>
      {props.text}
    </h1>
  )
}

const StatisticsLine = (props) => {
  return (
    <tbody>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    </tbody>
  )
}


const Statistics = (props) => {
  let total = (props.good + props.neutral + props.bad)
  let avg = ((props.good + (-1*props.bad))/(total))
  let pos = ((props.good/ total)*100)
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return(
  <>
    <table>
    <StatisticsLine text='good' value={props.good}/>
    <StatisticsLine text='neutral' value={props.neutral}/>
    <StatisticsLine text='bad' value={props.bad}/>
    <StatisticsLine text='all' value={total}/>
    <StatisticsLine text='average' value={avg}/>
    <StatisticsLine text='positive' value={pos + '%'}/>
    </table>
  </>
  )
}


function App() {
  const [good, goodCount] = useState(0)
  const [neutral, neutralCount] = useState(0)
  const [bad, badCount] = useState(0)

  const handleGoodClick = () => {
    goodCount(good + 1)
  }

   const handleNeutralClick = () => {
    neutralCount(neutral + 1)
  }

   const handleBadClick = () => {
    badCount(bad + 1)
  }

  return (
    <>
      <div id='feedback_buttons'>
      <Display text='give feedback' />
      <Button text='good' onClick={handleGoodClick}/>
      <Button text='neutral' onClick={handleNeutralClick}/>
      <Button text='bad' onClick={handleBadClick}/>
      </div>
      <div id='statistics'>
      <Display text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </>
  )
}

export default App
