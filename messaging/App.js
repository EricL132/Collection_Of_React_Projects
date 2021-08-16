import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import './App.css';
import Home from './components/pages/home/home'
import Chat from './components/pages/chat/chat'
class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/chatapp' exact component={Home}></Route>
          <Route path='/chatapp/chat' component={Chat}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
