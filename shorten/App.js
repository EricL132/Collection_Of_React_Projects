import React from 'react'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shorturl: "",
            errormessage: "",
            pageLoaded: false
        }
        this.handleredirect()
        this.handleShorten = this.handleShorten.bind(this)
        this.copyshort = this.copyshort.bind(this)
    }
    async handleredirect() {
        if (this.props.location.search) {
            const res = await fetch('/api/s' + this.props.location.search)
            const url = await res.json()
            window.open(url.url, "_self")
        } else {

            this.state.pageLoaded = true
        }

    }

    async handleShorten() {
        this.setState({ shorturl: "" })
        const url = document.getElementById("url-input").value
        if (url && url.includes('://') && (url.includes('https') || url.includes('http')) && url.includes('.')) {

            fetch('/api/shorten', { method: "POST", headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ url: url }) }).then(res => res.json()).then(data => {
                this.setState({ shorturl: data.shorturl })
                document.getElementById("url-input").value = ""
                this.copyshort()
            })

        } else {
            console.log('invalid url')
        }
    }

    copyshort() {
        const buttonEle = document.getElementById('copy-button')
        buttonEle.innerHTML = "Copy"
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = this.state.shorturl;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        setTimeout(() => {
            buttonEle.innerHTML = "Copied"
        }, 100)

    }
    render() {
        return (
            <>
                {this.state.pageLoaded ?
                    <div className="url-short-container">
                        <h1>URL SHORTENER</h1>
                        <div className="short-container">
                            <div className="input-container">
                                <input autoComplete="off" spellCheck={false} id="url-input" placeholder="Url"></input>
                                <button onClick={this.handleShorten}>Shorten</button>
                                {this.state.shorturl ?
                                    <div className="short-url-container">{this.state.shorturl}
                                        <button id="copy-button" onClick={this.copyshort}>Copied</button>
                                    </div>

                                    : null}
                            </div>
                        </div>
                    </div>
                    : null}
            </>
        )
    }
}


export default App;