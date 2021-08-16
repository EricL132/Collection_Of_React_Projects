import React from 'react'



class firstpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            choosedRoom: false,
            singlePlayer: false,
            twoPlayer: false,
            winnerResult: ""
        }
        this.handleGameType = this.handleGameType.bind(this)
        this.handleWinner = this.handleWinner.bind(this)
        this.handlePlayAgain = this.handlePlayAgain.bind(this)
    }


    handleGameType(e) {
        this.props.location.state = ""
        if (!this.state.singlePlayer && !this.state.twoPlayer) {
            if (e.target.id === "singleplayer") {
                this.setState({ choosedRoom: true })
                this.setState({ singlePlayer: true })
            } else if (e.target.id === "twoplayer") {
                const availcode = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let room = ""
                for (var i = 0; i < 6; i++) {
                    room += availcode.charAt(Math.floor(Math.random() * availcode.length))
                }
                this.props.history.push(`/rps/room?code=${room}`)
            }
        } else {
            this.setState({ winnerResult: "" })
            this.setState({ singlePlayer: false })
            this.setState({ twoPlayer: false })
            this.setState({ choosedRoom: false })
        }
    }


    handleWinner(e) {
        e.persist()
        const options = ["rock", "paper", "scissors"]
        let ele = e.target
        if (e.target.classList.contains('fas')) {
            ele = e.target.parentNode
        }
        const choice = ele.id


        const generateChoice = options[Math.floor(Math.random() * (3 - 0) + 0)]
        switch (choice) {
            case "rock":

                if (generateChoice === "paper") {
                    this.setState({ winnerResult: "You Lost" }, () => {
                        this.createNewOppenentHand("paper")
                        this.createNewPlayerHand("rock")
                    })

                }
                if (generateChoice === "rock") {
                    this.setState({ winnerResult: "Tie" }, () => {
                        this.createNewOppenentHand("rock")
                        this.createNewPlayerHand("rock")
                    })

                }
                if (generateChoice === "scissors") {
                    this.setState({ winnerResult: "You Won" }, () => {
                        this.createNewOppenentHand("scissors")
                        this.createNewPlayerHand("rock")
                    })

                }
                break;
            case "paper":
                if (generateChoice === "paper") {
                    this.setState({ winnerResult: "Tie" }, () => {
                        this.createNewOppenentHand("paper")
                        this.createNewPlayerHand("paper")
                    })


                }
                if (generateChoice === "rock") {
                    this.setState({ winnerResult: "You Won" }, () => {
                        this.createNewOppenentHand("rock")
                        this.createNewPlayerHand("paper")
                    })


                }
                if (generateChoice === "scissors") {
                    this.setState({ winnerResult: "You Lost" }, () => {
                        this.createNewOppenentHand("scissors")
                        this.createNewPlayerHand("paper")
                    })

                }
                break;
            case "scissors":
                if (generateChoice === "paper") {
                    this.setState({ winnerResult: "You Won" }, () => {
                        this.createNewOppenentHand("paper")
                        this.createNewPlayerHand("scissors")
                    })

                }
                if (generateChoice === "rock") {
                    this.setState({ winnerResult: "You Lost" }, () => {

                        this.createNewOppenentHand("rock")
                        this.createNewPlayerHand("scissors")
                    })

                }
                if (generateChoice === "scissors") {
                    this.setState({ winnerResult: "Tie" }, () => {

                        this.createNewOppenentHand("scissors")
                        this.createNewPlayerHand("scissors")



                    })

                }
                break;
            default:
                break;
        }

    }

    createNewOppenentHand(card) {
        const newEle = document.createElement("div")
        newEle.classList = "card"
        newEle.innerHTML = `<i class="fas fa-hand-${card}" >`
        document.getElementById('opponent-container').appendChild(newEle)
    }

    createNewPlayerHand(card) {
        const playerEle = document.createElement("div")
        playerEle.classList = "card-container"
        playerEle.id = 'player-container'
        playerEle.innerHTML = `<div class="winner-container">${this.state.winnerResult}</div><div id="${card}" class="card-nohover"><i class="fas fa-hand-${card}" ></i></div><button id="playAgain" class="play-again-button" style="margin:5px">Play Again</button>`
        document.getElementsByClassName('rock-mid-container')[0].appendChild(playerEle)
        document.getElementById('playAgain').addEventListener('click', this.handlePlayAgain)
    }


    handlePlayAgain() {
        document.getElementsByClassName('rock-mid-container')[0].innerHTML = `<div class="back-container"><button >Back To Home</button></div>
        <div id="opponent-container" class="card-container" style= "align-items:flex-start; margin-top:.4rem"></div>`
        document.getElementsByClassName('back-container')[0].addEventListener('click', this.handleGameType)
        this.setState({ winnerResult: "" })

    }

    render() {
        return (
            <div className="rock-whole-container">
                {!this.state.choosedRoom ?
                    <>
                        <div className="options-container">
                            <button id="singleplayer" className="options-button" onClick={this.handleGameType}>Single Player</button>
                            <button id="twoplayer" className="options-button" onClick={this.handleGameType}>Invite Friend</button>
                        </div>
                        {this.props.location.state ?
                            <span className="error-span">{this.props.location.state.msg.error}</span>

                            : null}
                    </>
                    :
                    <>
                        {this.state.singlePlayer ?
                            <>
                                <div className="rock-mid-container">
                                    <div className="back-container"><button onClick={this.handleGameType}>Back To Home</button></div>

                                    {!this.state.winnerResult ?
                                        <>
                                            <div id="opponent-container" className="card-container" style={{ alignItems: "flex-start", marginTop: ".4rem" }}>
                                            </div>
                                            <div className="winner-container">{this.state.winnerResult}</div>
                                            <div id="player-container" className="card-container">
                                                <div id="rock" className="card" onClick={this.handleWinner}><i className="fas fa-hand-rock" ></i></div>
                                                <div id="paper" className="card" onClick={this.handleWinner}><i className="fas fa-hand-paper"></i></div>
                                                <div id="scissors" className="card" onClick={this.handleWinner}><i className="fas fa-hand-scissors"></i></div>

                                            </div>
                                        </>
                                        : <>
                                            <div id="opponent-container" className="card-container" style={{ alignItems: "flex-start", marginTop: ".4rem" }}></div>
                                            <div className="winner-container">{this.state.winnerResult}</div>
                                        </>}


                                </div>
                            </>
                            : null}
                    </>

                }

            </div>
        )
    }
}



export default firstpage;