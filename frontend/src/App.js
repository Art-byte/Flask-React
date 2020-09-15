import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {About} from './component/About'
import {Courses} from './component/Courses'
import {Navbar} from './component/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <div className='container p-4'>
        <Switch>
          <Route path="/about" component={About}/>
          <Route path="/" component={Courses}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
