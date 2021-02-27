import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AllPodcasts from './components/AllPodcasts'


const App = () => {
  return(
    <Router>
      <div> 
        <nav>

        </nav>
        <Switch>
          <Route exact path='/' component={AllPodcasts}>

          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
