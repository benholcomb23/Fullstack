import { useState } from 'react'



const Anecdotes = (props) => {
  return (
    <p>{props.anecdotes}</p>
  )
}

const Button = (props) => {
  return (
    <button id="button" onClick={props.func}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

  const votesArray = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  }


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


  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(0)
  const [anecdoteVotes, saveVotes] = useState(votesArray)
  
  const getRandInt = () => {
    return(
    (Math.floor(Math.random() * (anecdotes.length)))
    )
  }

  let max = Math.max(...Object.values(anecdoteVotes))

  let key = Object.keys(anecdoteVotes).find(key => anecdoteVotes[key] === max)

  const handleNextClick = () => {
    let rand_Num = getRandInt()
    while(rand_Num == selected) {
      rand_Num = getRandInt()
    }
    setSelected(rand_Num)
  }

  const handleVoteClick = () => {
    setVotes(anecdoteVotes[selected])
    setVotes(votes + 1)
    saveVotes(prev => ({
      ...prev,
      [selected]: (anecdoteVotes[selected] + 1),
    }));
  }

  

  return (
    <>
      <Display text="Anecdote of the day"/>
      <Anecdotes anecdotes={anecdotes[selected]}/>
      <p>has {anecdoteVotes[selected]} votes</p>
      <Button func={handleVoteClick} text="vote"/>
      <Button func={handleNextClick} text="next quote"/>
      <Display text="Anecdote with most votes"/>
      <p>{anecdotes[key]}</p>
    </>
  )
}

export default App
