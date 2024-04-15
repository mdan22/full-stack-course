// the warning in the dev console made me change this code:

// before:

// import ReactDOM from 'react-dom'
// import App from './App'

// ReactDOM.render(
//   <App />, 
//   document.getElementById('root')
// )

// up to date version using createRoot:

import {createRoot} from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(
  <App />
)

// now the warning is gone :)
