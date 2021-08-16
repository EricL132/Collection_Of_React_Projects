import React from 'react'
import './home.css'
class home extends React.Component {
    constructor(props) {
        super(props)
        this.handleJoinRoom = this.handleJoinRoom.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        this.state = { error: "" }
    }
    handleJoinRoom() {
        const name = document.getElementById('Name').value
        const room = document.getElementById('Room').value
        if (name.length > 0 && room.length > 0) {
            this.props.history.push({ pathname: `/chatapp/chat`,search:`?room=${room}`, state: { name: name, room: room } })
        } else {
            if (name.length === 0) {
                this.setState({ error: "Name must be longer then 1 character" })
            }
            if (room.length === 0) {
                this.setState({ error: "Room must be longer then 1 character" })
            }
            if (room.length === 0 && name.length === 0) {
                this.setState({ error: "Room and Name must be longer then 1 character" })
            }
        }
    }
    handleEnter(e) {
        const pressedKey = e.code
        if (pressedKey === "Enter") {
            this.handleJoinRoom()
        }
    }
    render() {
        return (
            <div className="whole-container">
                <div className="home-container">
                    <h1>Chat</h1>
                    <div className="input-containers">
                        <input autoComplete="off" spellCheck="false" onKeyPress={this.handleEnter} id="Name" placeholder="Name" className="input-fields"></input>
                    </div>
                    <div className="input-containers">
                        <input autoComplete="off" spellCheck="false" onKeyPress={this.handleEnter} id="Room" placeholder="Room Code" className="input-fields"></input>
                    </div>
                    <span>Enter any code to create room</span>
                    <span style={{ marginTop: '9rem' }}>Or enter existing room to join</span>
                    <button onClick={this.handleJoinRoom}>Join Room</button>
                    <div className="error-container">{this.state.error}</div>
                </div>
            </div>
        )
    }
}


export default home