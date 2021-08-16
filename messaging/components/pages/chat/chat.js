import React from 'react'
import './chat.css'
import io from 'socket.io-client'
const queryString = require('query-string')

let socket;
class chat extends React.Component {
    constructor(props) {
        super(props)
        this.handleSendMessage = this.handleSendMessage.bind(this)
        this.handleleaveRoom = this.handleleaveRoom.bind(this)
        this.handleKeypress = this.handleKeypress.bind(this)
        this.state = { messages: [], users: [], pageLoaded: false }
        this.joinRoom = this.joinRoom.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        this.getInvite = this.getInvite.bind(this)

    }
    componentDidMount() {
        this.joinRoom()

    }


    componentWillUnmount() {
        if (socket) {
            socket.disconnect()
        }
    }



    handleEnter(e){
        const pressedkey = e.code
        if (pressedkey === "Enter") {
            this.joinRoom()
        }
    }
    joinRoom() {
        let userName;
        let userRoom;
        if (this.props.location.state) {
            userName = this.props.location.state.name.charAt(0).toUpperCase() + this.props.location.state.name.slice(1);
            userRoom = this.props.location.state.room.charAt(0).toUpperCase() + this.props.location.state.room.slice(1);
        } else {
            
            userRoom = queryString.parse(window.location.search).room.charAt(0).toUpperCase() + queryString.parse(window.location.search).room.slice(1);
            userName = document.getElementById('ask-name-input').value.charAt(0).toUpperCase() + document.getElementById('ask-name-input').value.slice(1);
        }
        if (userName && userRoom) {
            this.setState({ name: userName })
            this.setState({ room: userRoom })
            socket = io.connect(`${window.location.origin}/chat`, { transports: ['websocket', 'polling', 'flashsocket'] })
            //socket = io.connect(`http://localhost:8500/chat`, { transports: ['websocket', 'polling', 'flashsocket'] })

            socket.emit('join', { name:userName, room:userRoom })
            socket.on('message', (msg) => {
                socket.emit('getUsers', { userRoom })
                if (msg.time) {
                    const onlytime = msg.time.split(" ")[0]
                    this.setState({ messages: [...this.state.messages, { message: msg.message, type: msg.type, user: msg.user, time: onlytime }] })
                } else {

                    this.setState({ messages: [...this.state.messages, { message: msg.message, type: msg.type }] })
                }
                document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

            })
            socket.emit('getUsers', { userRoom })
            socket.on('roomUsers', (users) => {
                this.setState({ users: users },()=>{
                    this.setState({pageLoaded:true})
                })
            })
           
        }
    }

    handleSendMessage() {
        const msg = document.getElementsByClassName('message-input')[0].value
        if (msg.length !== 0) {
            this.setState({ messages: [...this.state.messages, { message: msg, type: "sender", user: this.state.name, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).split(" ")[0] }] }, () => {
                document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

            })
            socket.emit('chatMessage', { message: msg, type: "sender" })
            document.getElementsByClassName('message-input')[0].value = ''
        }

    }
    handleleaveRoom() {
        socket.disconnect()
        this.props.history.push('/chatapp')
    }
    handleKeypress(e) {
        const pressedkey = e.code
        if (pressedkey === "Enter") {
            this.handleSendMessage();
        }
    }

    getInvite(){
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        document.getElementsByClassName('invite-button')[0].innerHTML = "Copied"
        setTimeout(()=>{document.getElementsByClassName('invite-button')[0].innerHTML ="Invite"},1000)
    }
    render() {
        return (
            <>
                {

                    this.state.pageLoaded ?
                        <div className="chatwhole-container">
                            <div className="chat-container">
                                <header>
                                    <h1>Chat</h1>
                                    <button onClick={this.getInvite} className="leave-chat invite-button" style={{right:'10rem'}}>Invite</button>
                                    <button onClick={this.handleleaveRoom} className="leave-chat">Leave Room</button>

                                </header>
                                <div className="room-info">
                                    <h2>Room Name:</h2>
                                    <span>{this.state.room}</span>
                                    <div className="user-info-container">
                                        <h2>Users:</h2>
                                        <ul>
                                            {
                                                this.state.users.map((user, i) => {
                                                    return <div key={i} className="list-element">
                                                        <li>{user.name}</li>
                                                    </div>
                                                })
                                            }

                                        </ul>
                                    </div>
                                </div>
                                <div id="chat-box" className="chat-box">

                                    {this.state.messages.map((msg, i) => {
                                        if (msg.type === 'sender') {
                                            return <div key={i} className="message-cont">
                                                {msg.user ?
                                                    <span className="message-box">{msg.time}<br></br>{msg.message}</span>
                                                    : <span className="message-box">{msg.message}</span>}
                                            </div>
                                        } else {
                                            if (msg.type === 'reciever') {
                                                return <div key={i} className="message-cont">
                                                    {msg.user ?
                                                        <span className="message-box-recieve">{msg.user + " " + msg.time}<br></br>{msg.message}</span>
                                                        : <span className="message-box-recieve">{msg.message}</span>}
                                                </div>

                                            }else{
                                                return false
                                            }
                                        }
                                    })
                                    }




                                </div>
                                <div className="message-container">
                                    <input onKeyPress={this.handleKeypress} className="message-input"></input>
                                    <button className="send-message" onClick={this.handleSendMessage}>Send</button>
                                </div>

                            </div>

                        </div>
                        :
                        !this.props.location.state ?
                            <>
                        <div className="chatwhole-container">
                            <div className="chat-container">
                                <div className="ask-name-container">
                                    <label htmlFor="ask-name-input">Name</label>
                                    <input spellCheck={false} autoComplete="off" id="ask-name-input" onKeyDown={this.handleEnter}></input>
                                    <button onClick={this.joinRoom}>Join</button>
                                </div>
                            </div>
                        </div>
                        </>
                        :null
                }

            </>
        )
    }
}



export default chat