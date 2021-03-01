import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Podcasts from './components/Podcasts'


const App = () => {
  return(
    <Router>
      <div> 
        <nav>

        </nav>
        <Switch>
          <Route exact path='/' component={Podcasts}>

          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
