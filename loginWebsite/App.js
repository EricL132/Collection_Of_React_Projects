
import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from './components/pages/home'
import Dashboard from './components/pages/dashboard'
import Permissiondenied from './components/pages/nopermission'
import Resetpass from './components/pages/resetpass'
class App extends React.Component {


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/authweb' exact component={Home}></Route>
          <Route path='/authweb/dashboard' exact component={Dashboard}></Route>
          <Route path='/authweb/permissiondenied' exact component={Permissiondenied}></Route>
          <Route path='/authweb/resetpassword'>
            <Route path='/:token' component={Resetpass}></Route>
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
