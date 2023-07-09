import './App.css'
import Appbar from './AppBar'
import Signup from './signup'
import Signin from './signin'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path="/" component={Appbar} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Signin} />
    </Router>
  )
}
export default App
