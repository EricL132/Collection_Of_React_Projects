import React from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Room from './Room'
import Home from './firstpage'
import Notfound from '../notfound/notfound'
class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/rps' exact component={Home}></Route>
            <Route path='/rps/room' exact component={Room}></Route>
            <Route path='*' component={Notfound}></Route>
          </Switch>
        </BrowserRouter>
      </>
    )
  }

}

export default App;
