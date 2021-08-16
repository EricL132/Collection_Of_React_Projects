import React from 'react'
import './App.css'
let reload
class App extends React.Component {
    constructor() {
        super()
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.checkIfOver = this.checkIfOver.bind(this)
        this.handleGameover = this.handleGameover.bind(this)
        this.handleRestart = this.handleRestart.bind(this)
        this.moveSnake = this.moveSnake.bind(this)
        this.handleHitSelf = this.handleHitSelf.bind(this)
        this.state = {
            speed: 100,
            snakeBoxes: [
                [50, 50], [52, 50]
            ],

            food: this.handleRandomCord(),
            direction: "down",
            gameover: false

        }
    }

    componentDidMount() {

       reload = setInterval(this.moveSnake, this.state.speed)
        this.setState({
            foodStyle: {
                top: `${this.state.food[0]}%`,
                left: `${this.state.food[1]}%`
            }
        }, () => {
        })

        document.onkeydown = this.handleKeyPress;
    }
    componentWillUnmount(){
        clearInterval(reload)
    }
    handleKeyPress(e) {
        switch (e.keyCode) {
            case 40:
                if (this.state.direction !== 'up') {
                    this.setState({ direction: 'down' })
                }
                break;
            case 39:
                if (this.state.direction !== 'left') {

                    this.setState({ direction: "right" })
                }
                break;
            case 38:
                if (this.state.direction !== 'down') {

                    this.setState({ direction: "up" })
                }
                break;
            case 37:
                if (this.state.direction !== 'right') {

                    this.setState({ direction: 'left' })
                }
                break;
            default:
                break;
        }
    }
    moveSnake() {
        if (this.state.snakeBoxes.length > 0) {
            this.handleAteFood()
            let boxes = [...this.state.snakeBoxes]
            let head = boxes[boxes.length - 1]
            switch (this.state.direction) {
                case "down":

                    head = [head[0], head[1] + 2]

                    break;
                case "right":
                    head = [head[0] + 2, head[1]]

                    break;
                case "up":
                    head = [head[0], head[1] - 2]

                    break;
                case "left":
                    head = [head[0] - 2, head[1]]

                    break;
                default:
                    break;
            }
            boxes.push(head)
            boxes.shift()
            this.setState({ snakeBoxes: boxes })
            this.handleHitSelf()
            this.checkIfOver();
            this.setState({speed:this.state.speed-90})
        }
    }

    checkIfOver() {
        if (this.state.gameover === false) {
            let head = this.state.snakeBoxes[this.state.snakeBoxes.length - 1]
            if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
                this.handleGameover();
            }
        }

    }


    handleAteFood() {
        if (this.state.snakeBoxes.length > 0) {
            const snake = [...this.state.snakeBoxes]
            const head = this.state.snakeBoxes[this.state.snakeBoxes.length - 1]

            if (head[1] === this.state.food[0] && head[0] === this.state.food[1]) {
                snake.unshift([]);
                this.setState({ snakeBoxes: snake }, () => {
                   this.setState({food: this.handleRandomCord()},()=>{
                    this.setState({
                        foodStyle: {
                            top: `${this.state.food[0]}%`,
                            left: `${this.state.food[1]}%`
                        }
                    })
                   })
                })
            }
        }
    }
    handleHitSelf() {
        if (this.state.gameover === false) {
            let snake = [...this.state.snakeBoxes]
            let head = this.state.snakeBoxes[this.state.snakeBoxes.length - 1]
            snake.pop()
            snake.forEach((box) => {
                if (head[0] === box[0] && head[1] === box[1]) {
                    this.handleGameover()
                }
            })
        }

    }
    handleGameover() {
        this.setState({ snakeBoxes: [] })
        this.setState({ gameover: true })
    }
    handleRestart() {
        this.setState({ snakeBoxes: [[50, 50], [52, 50]] })
        this.setState({ gameover: false })
    }



    handleRandomCord() {

        const x = Math.floor((Math.random() * (98 - 1 + 1) + 1) / 2) * 2
        const y = Math.floor((Math.random() * (98 - 1 + 1) + 1) / 2) * 2;
        return [x, y]
    }


    render() {
        return (
            <div className="snake-game-whole-container">
                <div className="snake-game-container">
                    {this.state.snakeBoxes ?

                        this.state.snakeBoxes.map((box,i) => {
 
                            return <div key={i}className="snake-box" style={{ top: `${box[1]}%`, left: `${box[0]}%` }}></div>
                            
                        })

                        : null}


                    <div className="food-box" style={this.state.foodStyle}></div>
                    {this.state.gameover ?
                        <div className="game-over-container">
                            <div className="game-over-message">
                                <h1>Game Over</h1>
                                <button onClick={this.handleRestart}>Click to restart</button>
                            </div>
                        </div>
                        : null}


                </div>
            </div>
        )
    }
}

export default App;