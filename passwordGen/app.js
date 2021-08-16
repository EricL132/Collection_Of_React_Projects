import React from 'react'
import './app.css'

class app extends React.Component {
    constructor() {
        super()
        this.state = { generatedpass: '' }
        this.generatePass = this.generatePass.bind(this)
        this.copyToClip = this.copyToClip.bind(this)
    }
    generatePass() {
        let generatedString = ''
        let possibleString = ''
        const upperString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const lowerString = 'abcdefghijklmnopqrstuvwxyz'
        const numbersstring = '0123456789'
        const symbolString = '!@#$%^&*()_+=-?.'
        const length = document.getElementById('length').value
        const upper = document.getElementById('upper').checked
        const lower = document.getElementById('lower').checked
        const number = document.getElementById('number').checked
        const symbol = document.getElementById('symbol').checked
        if (upper) {
            possibleString += upperString
        }
        if (lower) {
            possibleString += lowerString
        }
        if (number) {
            possibleString += numbersstring
        }
        if (symbol) {
            possibleString += symbolString
        }
        for (var i = 0; i < length; i++) {
            generatedString += possibleString.charAt(Math.floor(Math.random() * possibleString.length))
        }
        this.setState({ generatedpass: generatedString })
    }
    copyToClip() {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = this.state.generatedpass;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
    render() {
        return (
            <div className='gen-container'>
                <div className="gen-whole-container">
                    <h2 style={{ paddingTop: '2rem' }}>Password Generator</h2>
                    <div className="password-container">
                        {this.state.generatedpass}
                        <button onClick={this.copyToClip} className="copy"><i className="fas fa-copy"></i></button>

                    </div>
                    <div className="password-body">
                        <div className="choice">
                            <label htmlFor="length">Password Length</label>
                            <input defaultValue="20" type="number" id="length"></input>
                        </div>
                        <div className="choice">
                            <label htmlFor="upper">Contain Uppercase Letters</label>
                            <input type="checkbox" id="upper"></input>
                        </div>
                        <div className="choice">
                            <label htmlFor="lower">Contain Lowercase Letters</label>
                            <input type="checkbox" id="lower"></input>
                        </div>
                        <div className="choice">
                            <label htmlFor="number">Contain Numbers</label>
                            <input type="checkbox" id="number"></input>
                        </div>
                        <div className="choice">
                            <label htmlFor="symbol">Contain Unique Symbols</label>
                            <input type="checkbox" id="symbol"></input>
                        </div>
                        <button onClick={this.generatePass} id="generate">Generate Password</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default app;