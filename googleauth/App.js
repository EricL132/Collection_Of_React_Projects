import React from 'react'
import './App.css';
import Dashboard from './dashboard'
import ReactDOM from 'react-dom'
class App extends React.Component {
  constructor() {
    super()
    this.signOut = this.signOut.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
    this.state = { loggedIn: false }
  }

  componentDidMount() {
    window.gapi.signin2.render('g-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 200,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn
    })


  }
  componentWillMount() {
    this.checkLoggedin()
  }
  async checkLoggedin() {
    await fetch('/account/userinfo').then(async (res) => {
      if (res.status === 200) {
        const userInfo = await res.json()

        this.setState({ userInfo: userInfo })
        this.setState({ loggedIn: true })
      }
    })
  }
  async signOut() {
    await fetch('/account/logout')
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      window.location.reload()
    })

  }

  async onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    await fetch('/account/login', { method: "POST", headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ token: id_token }) }).then(async (res) => {
      if (res.status === 200) {
        await fetch('/account/userinfo').then(async (res) => {
          const userInfo = await res.json()
          this.setState({ userInfo: userInfo })
          if (res.status === 200) {
            ReactDOM.render(<Dashboard state={this.state} signOut={this.signOut} />, document.getElementById('root'))
          }

        })
      }
    })

  }


  render() {

    return (
      <>

        {!this.state.loggedIn ?
          <div id="google-auth-container">
            <div id="login-container">
              <div id="g-signin2"></div>
            </div>
          </div>
          : <Dashboard state={this.state} signOut={this.signOut} />
        }

      </>
    )
  }
}

export default App;
