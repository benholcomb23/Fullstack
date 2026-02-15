import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const persons = [
    { name: 'Arto Hellas',
      number: 365,
      id: 1
     }, 
     { name: 'Ben',
      number: 254,
      id: 2
     },
     { name: 'Hannah',
      number: 785,
      id: 3
     }
    ]

createRoot(document.getElementById('root')).render(<App persons={persons}/>)
