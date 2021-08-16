import React from 'react'

class dashboard extends React.Component {
    componentDidMount() {

    }
    render() {
        return (
            <div id="google-auth-container">
                <div className="dash-container">
                    <img id="dash-image" alt="google" src={this.props.state.userInfo.info.picture} ></img>
                    <h1 style={{ alignSelf: "center" }}>{this.props.state.userInfo.info.name}</h1>
                    <h1>{this.props.state.userInfo.info.email.slice(0, 1).toUpperCase() + this.props.state.userInfo.info.email.slice(1, this.props.state.userInfo.info.email.length)}</h1>
                    <button className="default-button" onClick={this.props.signOut}>Sign Out</button>
                </div>
            </div>
        )
    }
}

export default dashboard