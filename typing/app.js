import React from 'react'
import './app.css'

let interval;

class app extends React.Component {
    constructor() {
        super()
        this.state = { words: [], joinedWords: [], speed: 0,errors:0,time:0,typedWords:0}
        this.getWords = this.getWords.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.updateSpeed = this.updateSpeed.bind(this)
        this.leftinput = this.leftinput.bind(this)
        this.starttimer = this.starttimer.bind(this)
    }
    componentDidMount() {
        this.getWords()

    }

    componentWillUnmount(){
        clearInterval(interval)
    }
    updateSpeed(){
        if(interval){
            this.setState({time:this.state.time+1})
            this.setState({speed:Math.floor((this.state.typedWords/5)/ (this.state.time/60))})
        }

    }
    async getWords() {
        const numWords = Math.floor(Math.random() * (20 - 10) + 10)
        const res = await fetch(`https://random-word-api.herokuapp.com/word?number=${numWords}`)
        const resWords = await res.json()
        const resResult = []
        resWords.map((word) => {
           return resResult.push(word.split(''))

        })
        this.setState({ words: resResult })
        let joinedWords = resResult.join(",_,")
        this.setState({ joinedWords: joinedWords.split(',') })
        this.setState({ joinedWords2win: joinedWords.split(',') })

    }

    handleKeyPress(e) {
        if ((e.key === this.state.joinedWords2win[0]) || (this.state.joinedWords2win[0]==="_" && e.key===" ")) {
            this.setState({typedWords:this.state.typedWords+1})
            const contain = Array.from(e.target.children)
            const result = contain.find((child) => {
                return !child.classList.contains('typed')
            })
            result.classList = "typed"
            this.state.joinedWords2win.shift()

            if(this.state.joinedWords2win.length===0){
                this.setState({words: []})
                this.setState({joinedWords: []})
                this.getWords()
                this.leftinput(false)
            }
        }else{
            this.setState({errors:this.state.errors+1})
        }

        
    }
    leftinput(resetSpeed){
        const typedletters = Array.from(document.getElementsByClassName('typed'))
        
        typedletters.map((ele)=>{
            return ele.classList = ""
        })
        this.setState({ joinedWords2win: this.state.joinedWords.slice(0)})
        
        if(resetSpeed!==false){ 
            this.setState({speed:0})    
            this.setState({errors:0})  
            this.setState({typedWords:0})  
            this.setState({time:0})   
            clearInterval(interval);
        }


    }

    starttimer(){
        interval = setInterval(() => {
            this.updateSpeed()
          }, 1000)
    }
    render() {
        return (
            <div className="typing-whole-container">
                <div className="tools-container">
                    <span className="speed-container">Speed: {this.state.speed}</span>
                    <span className="speed-container"style={{marginLeft:"4rem"}}>Errors: {this.state.errors}</span>
                </div>
                <div className="Info-container" >
                    <div className="words-container" tabIndex="0" onFocus={this.starttimer} onBlur={this.leftinput} onKeyPress={this.handleKeyPress}>
                        {
                            this.state.joinedWords.map((letter, i) => {
                                return <span key={i}>{letter}</span>


                            })
                        }
                    </div>
                </div>
                <span className="click-activate">Click to activate</span>
            </div>
        )
    }
}



export default app;