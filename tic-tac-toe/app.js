import React from 'react'
import './app.css'

class app extends React.Component {
    constructor() {
        super()
        this.state = {
            whosTurn: "",
            winConditions: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [6, 4, 2],
                [0, 4, 8]
            ],
            winner: ""

        }
        this.handleFirst = this.handleFirst.bind(this)
        this.handleMove = this.handleMove.bind(this)
        this.checkWin = this.checkWin.bind(this)
        this.handleRestart = this.handleRestart.bind(this)
    }
    handleFirst(e) {
        const who = e.target.value
        this.setState({ whosTurn: who })
    }
    handleMove(e) {

        const box = e.target
        if (!this.state.winner) {
            if (this.state.whosTurn === 'x') {
                if (!box.classList.contains('fa-times') && !box.classList.contains('fa-circle') && e.target.children.length<1) {
                    const newEle = document.createElement('i')
                    newEle.className = 'box fas fa-times'
                    box.appendChild(newEle)
                    this.setState({ whosTurn: "o" })
                    this.checkWin('fa-times')
                }
            } else {
                if (!box.classList.contains('fa-times') && !box.classList.contains('fa-circle')&& e.target.children.length<1) {
                    const newEle = document.createElement('i')
                    newEle.className = 'box far fa-circle'
                    box.appendChild(newEle)
                    this.setState({ whosTurn: "x" })
                    this.checkWin('fa-circle')
                }
            }
        }
    }

    async checkWin(playedMove) {
        const boxes = document.getElementsByClassName('tick-box')
        const moves = document.getElementsByClassName('box')
        const winner = this.state.winConditions.some(combination => {
            return combination.every(index => {
                if (boxes[index].children[0]) {
                    return boxes[index].children[0].classList.contains(playedMove)
                } else {
                    return false;
                }
            })
        })
        if (winner) {
            if (playedMove === "fa-times") {
                this.setState({ winner: "x won the game" })
            } else {
                this.setState({ winner: "o won the game" })
            }
        }

        if(moves.length===9){
            this.setState({ winner: "Tie" })
        }

    }
    async handleRestart() {
        this.setState({ winner: "" })
        this.setState({ whosTurn: "" }, () => {
            const button = document.getElementsByClassName('button-container')
            if(button[0].firstElementChild.nodeName!=="BUTTON"){
                button[0].removeChild(button[0].firstElementChild)
            }
        })

    }
    render() {
        return (
            <div className="tic-tac-whole-container">

                {this.state.whosTurn ?
                    <>
                        <div className="game-container">
                            <div className="tick-box" onClick={this.handleMove}></div>
                            <div className="tick-box" onClick={this.handleMove}></div>
                            <div className="tick-box" onClick={this.handleMove}></div>
                            <div className="tick-box" onClick={this.handleMove}></div>
                            <div className="tick-box" onClick={this.handleMove}></div>
                            <div className="tick-box" onClick={this.handleMove}></div>
                            <div className="tick-box" onClick={this.handleMove}></div>
                            <div className="tick-box" onClick={this.handleMove}></div>
                            <div className="tick-box" onClick={this.handleMove}></div>
                        </div>

                        {this.state.winner ? <div className='winner-container'><span>{this.state.winner}</span><button onClick={this.handleRestart} className='restart-button'>Restart game</button></div> : null}

                    </>
                    : <div className="who-container">
                        <h1>Who goes first?</h1>
                        <div className="button-container">
                            <button value="x" onClick={this.handleFirst}>x goes first</button>
                            <button value="o" onClick={this.handleFirst}>o goes first</button>
                        </div>
                    </div>


                }

            </div>
        )
    }
}

export default app;