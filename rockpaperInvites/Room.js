import React from 'react'
import io from 'socket.io-client'
let socket



class room extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            winnerResult: "",
            opponentsMove: "",
            playerMoved: false,
            roomName: "",
            opponentJoined: false
        }
        this.handleSendChoice = this.handleSendChoice.bind(this)
        this.createNewPlayerHand = this.createNewPlayerHand.bind(this)
        this.createNewOppenentHand = this.createNewOppenentHand.bind(this)
        this.handlePlayAgain = this.handlePlayAgain.bind(this)
        this.backToHome = this.backToHome.bind(this)
        this.handleCopyLink = this.handleCopyLink.bind(this)
    }

    backToHome() {
        socket.disconnect()
        this.props.history.push('/rps')
    }
    async componentDidMount() {

        const code = this.props.location.search.split('=')[1]
        this.setState({ roomName: code })
        this.setState({ inviteLink: window.location.href }, () => {
            this.handleCopyLink()
        })

        socket = io.connect(`${window.location.origin}/rockpaper`, { transports: ['websocket', 'polling', 'flashsocket'] })
        socket.emit('join', { code })
        socket.on('disconnectUser', (msg) => {

            this.props.history.push('/rps', { msg })
        })
        socket.on('currentStatus', (msg) => {
            this.setState({ winnerResult: msg.msg })
        })
        socket.on('opponentMoved', (msg) => {
            this.setState({ winnerResult: "Waiting for you to choose" })
            this.setState({ opponentsMove: msg.msg })
        })

        socket.on('opponentLeft', () => {

            window.location.reload()
        })
        socket.on('opponentJoined', () => {
            this.setState({ opponentJoined: true })
        })



    }
    componentWillUnmount(){
        socket.disconnect()
    }
    async handleSendChoice(e) {
        if (this.state.opponentJoined) {
            let ele = e.target
            if (e.target.classList.contains('fas')) {
                ele = e.target.parentNode
            }
            const choice = ele.id
            if (!this.state.playerMoved) {
                socket.emit('playerMoved', { move: choice })
                this.setState({ playerMoved: true })
            }
            this.createNewPlayerHand(choice)
            while (true) {
                if (this.state.opponentsMove) {
                    switch (choice) {
                        case "rock":
                            if (this.state.opponentsMove === "paper") {
                                this.setState({ winnerResult: "You Lost" }, () => {
                                    this.createNewOppenentHand(this.state.opponentsMove)
                                    this.createNewPlayerHand("rock")
                                })

                            }
                            if (this.state.opponentsMove === "rock") {
                                this.setState({ winnerResult: "Tie" }, () => {
                                    this.createNewOppenentHand(this.state.opponentsMove)
                                    this.createNewPlayerHand("rock")
                                })

                            }
                            if (this.state.opponentsMove === "scissors") {
                                this.setState({ winnerResult: "You Won" }, () => {
                                    this.createNewOppenentHand(this.state.opponentsMove)
                                    this.createNewPlayerHand("rock")
                                })

                            }
                            break;
                        case "paper":
                            if (this.state.opponentsMove === "paper") {
                                this.setState({ winnerResult: "Tie" }, () => {
                                    this.createNewOppenentHand(this.state.opponentsMove)
                                    this.createNewPlayerHand("paper")
                                })


                            }
                            if (this.state.opponentsMove === "rock") {
                                this.setState({ winnerResult: "You Won" }, () => {
                                    this.createNewOppenentHand(this.state.opponentsMove)
                                    this.createNewPlayerHand("paper")
                                })


                            }
                            if (this.state.opponentsMove === "scissors") {
                                this.setState({ winnerResult: "You Lost" }, () => {
                                    this.createNewOppenentHand(this.state.opponentsMove)
                                    this.createNewPlayerHand("paper")
                                })

                            }
                            break;
                        case "scissors":
                            if (this.state.opponentsMove === "paper") {
                                this.setState({ winnerResult: "You Won" }, () => {
                                    this.createNewOppenentHand(this.state.opponentsMove)
                                    this.createNewPlayerHand("scissors")
                                })

                            }
                            if (this.state.opponentsMove === "rock") {
                                this.setState({ winnerResult: "You Lost" }, () => {

                                    this.createNewOppenentHand(this.state.opponentsMove)
                                    this.createNewPlayerHand("scissors")
                                })

                            }
                            if (this.state.opponentsMove === "scissors") {
                                this.setState({ winnerResult: "Tie" }, () => {

                                    this.createNewOppenentHand(this.state.opponentsMove)
                                    this.createNewPlayerHand("scissors")

                                })

                            }
                            break;
                        default:
                            break;
                    }
                    break;
                } else {
                    await this.sleep(1000)

                }



            }
        }
    }
    createNewOppenentHand(card) {

        const newEle = document.createElement("div")
        newEle.classList = "card"
        newEle.innerHTML = `<i class="fas fa-hand-${card}" >`
        newEle.style.marginTop = ".4rem"
        document.getElementById('opponent-container').appendChild(newEle)
    }

    createNewPlayerHand(card) {
        if (this.state.opponentsMove) {
            document.getElementById('player-container').innerHTML = `<div id="${card}" class="card-nohover"><i class="fas fa-hand-${card}" ></i></div></div><button id="playAgain" class="play-again-button" style="margin:5px">Play Again</button>`
            document.getElementById('playAgain').addEventListener('click', this.handlePlayAgain)
        } else {
            document.getElementById('player-container').innerHTML = `<div id="${card}" class="card-nohover"><i class="fas fa-hand-${card}" ></i></div>`

        }
    }

    sleep(ms) {

        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    handlePlayAgain() {
        window.location.reload()
    }
    handleCopyLink() {
        if (document.getElementById('invite-span')) {
            document.getElementById('invite-button').innerHTML = "Copy"
            setTimeout(() => {
                if (document.getElementById('invite-span')) {
                    var dummy = document.createElement("textarea");
                    document.body.appendChild(dummy);
                    dummy.value = document.getElementById('invite-span').innerHTML;
                    dummy.select();
                    document.execCommand("copy");
                    document.body.removeChild(dummy);
                    document.getElementById('invite-button').innerHTML = "Copied"
                }
            }, 50)

        }
    }
    render() {
        return (
            <div className="rock-whole-container">
                <div>
                    <div className="rock-mid-container">
                        <div className="back-container"><button onClick={this.backToHome}>Back To Home</button></div>

                        <div id="opponent-container" className="card-container" style={{ alignItems: "flex-start", marginTop: ".4rem" }}>
                        </div>
                        <div className="winner-container">{this.state.winnerResult}</div>
                        <div id="player-container" className="card-container">
                            <div id="rock" className="card" onClick={this.handleSendChoice}><i className="fas fa-hand-rock" ></i></div>
                            <div id="paper" className="card" onClick={this.handleSendChoice}><i className="fas fa-hand-paper"></i></div>
                            <div id="scissors" className="card" onClick={this.handleSendChoice}><i className="fas fa-hand-scissors"></i></div>
                        </div>




                    </div>
                </div>
                {!this.state.opponentJoined ?
                    <div className="invite-container">Invite Link: <div><span id="invite-span">{this.state.inviteLink}</span></div><button id="invite-button" onClick={this.handleCopyLink}>Copy</button></div>
                    : null}
            </div>
        )
    }
}


export default room;