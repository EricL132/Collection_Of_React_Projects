import React from 'react'
import './app.css'

class app extends React.Component {
    constructor() {
        super()
        this.state = {youLost:false, clickable: true, levelBeat: false, pictures: [], level: 1, previousCard: "", solved: [], cards: [],lives:'' }
        this.handleMove = this.handleMove.bind(this)
        this.getPictures = this.getPictures.bind(this)
        this.checkWin = this.checkWin.bind(this)
        this.goNextLevel = this.goNextLevel.bind(this)
        this.restartGame = this.restartGame.bind(this)
    }
    componentDidMount() {
        this.getPictures()
    }

    async getPictures() {
        const res = await fetch(`https://picsum.photos/v2/list?page=${Math.floor(Math.random() * (10 - 1) + 1)}&limit=100`)
        const pictures = await res.json();
        const slots = []
        for (var i = 0; i < this.state.level * 2; i++) {
            let img
            let break_while = true
            while (break_while) {
                img = pictures[Math.floor(Math.random() * (99 - 1) + 1)].download_url
                if(this.state.pictures.length===0){
                    break_while=false
                }else{

                    for(var p=0;p<this.state.pictures.length;p++){
                        if(this.state.pictures[p].img !== img){
                            break_while=false
                        }
                    }
                }
                

            }


            slots.push(img)
            this.setState({lives:this.state.level*4})
            this.setState({ pictures: [...this.state.pictures, { id: i, img: img }, { id: i, img: img }] })

        }
        const numpic = this.state.pictures.length
        for (var j = 0; j < numpic; j++) {
            const picslot = Math.floor(Math.random() * (this.state.pictures.length - 0) + 0)
            this.state.cards.push(<div key={j} cardid={this.state.pictures[picslot].id} onClick={(this.state.clickable ? this.handleMove : null)} className="card-container"><img style={{ display: "none" }} src={this.state.pictures[picslot].img} alt="guessing"></img></div>)
            this.state.pictures.splice(picslot, 1)
        }

        this.setState({ cards: this.state.cards })




    }
    checkWin() {
        if (this.state.solved.length === this.state.level * 2) {

            this.setState({ levelBeat: true })
        }
    }

    goNextLevel() {
        this.setState({ levelBeat: false })
        this.setState({ level: this.state.level + 1 })
        this.setState({ solved: [] })
        this.setState({ cards: [] })
        this.getPictures()
    }
    handleMove(e) {
        const ca = document.getElementsByClassName('card-container')
        for (var i = 0; i < ca.length; i++) {
            ca[i].style.pointerEvents = "none";
        }

        const cardele = e.target
        if (cardele.firstChild) {
            cardele.firstChild.style.display = ""
            if (this.state.previousCard && cardele.getAttribute('cardid') === this.state.previousCard.getAttribute('cardid')) {
                this.setState({ solved: [...this.state.solved, cardele] }, () => {
                    this.checkWin()
                })
                this.setState({ previousCard: '' })
                for (var k = 0; k < ca.length; k++) {
                    ca[k].style.pointerEvents = "";
                }
                return
            } else {
                if (this.state.previousCard.firstChild) {
                    if(this.state.lives===0){
                        this.setState({youLost:true})
                    }
                    cardele.firstChild.style.display = ""
                    setTimeout(() => {
                        const prev = this.state.previousCard
                        this.setState({previousCard:prev.firstChild.style.display = "none"})
                        cardele.firstChild.style.display = "none"
                        for (var i = 0; i < ca.length; i++) {
                            ca[i].style.pointerEvents = "";
                        }
                        this.setState({ previousCard: '' })
                        this.setState({lives:this.state.lives-1})
                        return;
                    }, 1000)


                } else {
                    for (var a = 0; a < ca.length; a++) {
                        ca[a].style.pointerEvents = "";
                    }
                    this.setState({ previousCard: cardele })
                }
            }




        } else {
            setTimeout(() => {
                for (var i = 0; i < ca.length; i++) {
                    ca[i].style.pointerEvents = "";
                }
            }, 1000
            )
        }

    }

    restartGame(){
        this.setState({youLost:false})
        this.setState({ levelBeat: false })
        this.setState({ level: 1 })
        this.setState({ solved: [] })
        this.setState({ cards: [] })
        this.getPictures()
    }
    render() {



        return (
            <>
            {!this.state.youLost ? <div className="mem-container">
                <h1 className="level-title">Level {this.state.level}</h1>
                <h2 className="lives-title">Lives: {this.state.lives+1}</h2>
                <div className="game-container">
                    {this.state.cards}
                </div>
                {this.state.levelBeat ?
                    <div className="pass-level-container"><span>You beat level {this.state.level}</span><button onClick={this.goNextLevel}>Next Level</button></div>
                    : null}

            </div>
            : <div className="mem-container">
                <div className="lost-container">
                    <span>You lost</span>
                    <button onClick={this.restartGame}>Play again</button>
                </div>
                </div>}
            </>
        )
    }



}






export default app