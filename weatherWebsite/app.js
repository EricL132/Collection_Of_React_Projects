import React from 'react'
import './app.css'


class app extends React.Component {
    constructor() {
        super()
        this.state = { weatherInfo: "", errorMessage: "", currentTab: "currentweather", weekDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }
        this.getWeatherInfo = this.getWeatherInfo.bind(this)
        this.handleCurrentWeather = this.handleCurrentWeather.bind(this)
        this.handleButtonOptionClick = this.handleButtonOptionClick.bind(this)
        this.handleGetAllWeather = this.handleGetAllWeather.bind(this)
    }
    async getWeatherInfo(location) {
        this.setState({ weatherInfo: "" })
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d57038232fd61ec6cb192ee298e0d247&units=imperial`)
        if (res.status === 200) {
            const weather = await res.json()
            return weather;
        } else {
            return false
        }

    }
    handleButtonOptionClick(e) {
        this.setState({weatherInfo:""})
        this.setState({errorMessage:""})
        document.getElementsByClassName("option-selected")[0].classList = "options-button";
        e.target.classList += " option-selected"
        this.setState({ currentTab: e.target.id })
    }
    async handleCurrentWeather(e) {
        e.preventDefault()
        const location = e.target[0].value
        e.target[0].value = ''
        const weather = await this.getWeatherInfo(location)
        if (weather) {
            this.state.errorMessage = ""
            this.setState({ weatherInfo: weather })
        } else {
            this.setState({ errorMessage: 'Location not found' })
        }
    }
    componentDidMount() {

    }
    async handleGetAllWeather(e) {
        e.preventDefault()
        const location = e.target[0].value
        e.target[0].value = ''
        let weather = await this.getWeatherInfo(location)
        console.log(weather)
        if (weather) {
            this.state.searchName = weather.name
            this.state.errorMessage = ""
            const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=d57038232fd61ec6cb192ee298e0d247&units=imperial`)
            weather = await res.json()
            console.log(weather)
            this.setState({ weatherInfo: weather })
        } else {
            this.setState({ errorMessage: 'Location not found' })
        }

    }

    render() {
        return (
            <div className='weather-container'>
                <div className="mid-container">
                    <div id="options-container">
                        <button id="currentweather" onClick={this.handleButtonOptionClick} className="options-button option-selected">Current Weather</button>
                        <button id="hourweather" onClick={this.handleButtonOptionClick} className="options-button">Hourly Forecast 2 Days</button>
                        <button id="dailyweather" onClick={this.handleButtonOptionClick} className="options-button">7 Days Forecast</button>
                    </div>
                    {console.log(this.state.currentTab)}
                    <div className='container'>

                        {this.state.currentTab === "currentweather" ?
                            <>
                                <form className="weather-form" onSubmit={this.handleCurrentWeather}>
                                    <input placeholder="Search Location" className="searchInput"></input>
                                    <button>Search</button>
                                </form>
                                {this.state.weatherInfo ?
                                    <div className="weatherinfo-container">
                                        <div className="info-holder">
                                            <span>{this.state.weatherInfo.name}</span>
                                            <span className="temp">{Math.floor(parseInt(this.state.weatherInfo.main.temp))}<sup>o</sup>F</span>
                                            <span className="weatherdescription">{this.state.weatherInfo.weather[0].main}</span>
                                        </div>
                                        <div className="left-side-box" >
                                            <img alt="weather" src={`https://openweathermap.org/img/wn/${this.state.weatherInfo.weather[0].icon}@2x.png`} style={{ width: "120px" }}></img>
                                            <span className="highlow">{Math.floor(parseInt(this.state.weatherInfo.main.temp_min))}<sup>o</sup>/{Math.floor(parseInt(this.state.weatherInfo.main.temp_max))}<sup>o</sup></span>
                                        </div>

                                    </div>
                                    : <div style={{ justifySelf: "center", width: "100%", marginTop: "1rem" }}>{this.state.errorMessage}</div>}
                            </>
                            :
                            <>
                                {this.state.currentTab === "hourweather" ?
                                    <>
                                        <form className="weather-form" onSubmit={this.handleGetAllWeather}>
                                            <input placeholder="Search Location" className="searchInput"></input>
                                            <button>Search</button>

                                        </form>
                                        <div id="all-hours-container">
                                        <span id="daily-weather-name">{this.state.searchName}</span>
                                            {this.state.weatherInfo ?
                                                this.state.weatherInfo.hourly.map((weather) => {
                                                    return <div className="hourly-container">
                                                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="type of weather"></img>
                                                        <span style={{ marginTop: "-10px" }}>{Math.floor(parseInt(weather.temp))}<sup>o</sup>F</span>
                                                        <span>{new Date(weather.dt * 1000).getHours()}:00{new Date(weather.dt * 1000).getHours() >= 12 ? "PM" : "AM"}</span>
                                                    </div>
                                                })

                                                : <div style={{ justifySelf: "center", width: "100%" }}>{this.state.errorMessage}</div>}

                                        </div>
                                    </>
                                    :
                                    <>
                                        {
                                            this.state.currentTab === "dailyweather" ?
                                                <>
                                                    <form className="weather-form" onSubmit={this.handleGetAllWeather}>
                                                        <input placeholder="Search Location" className="searchInput"></input>
                                                        <button>Search</button>
                                                    </form>

                                                    {this.state.weatherInfo ?
                                                        <>
                                                            <span id="daily-weather-name">{this.state.searchName}</span>
                                                            {this.state.weatherInfo.daily.map((day) => {
                                                                return <div className="daily-weather-container">
                                                                    <div className="info-holder">
                                                                        <span>{this.state.weekDays[new Date(day.dt * 1000).getDay()]} {new Date(day.dt * 1000).toLocaleString().split(",")[0]}</span>
                                                                        <span >{Math.floor(parseInt(day.temp.day))}<sup>o</sup>F</span>
                                                                        <span >{day.weather[0].main}</span>
                                                                    </div>
                                                                    <div className="left-side-box">

                                                                        <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="type of weather"></img>
                                                                        <span className="highlow" style={{ marginTop: "-1rem" }}>{Math.floor(parseInt(day.temp.min))}<sup>o</sup>/{Math.floor(parseInt(day.temp.max))}<sup>o</sup></span>
                                                                    </div>
                                                                </div>
                                                            })

                                                            }

                                                        </>
                                                        : <div style={{ justifySelf: "center", width: "100%", marginTop: "1rem" }}>{this.state.errorMessage}</div>}
                                                </>
                                                :
                                                null

                                        }
                                    </>



                                }

                            </>
                        }

                    </div>

                </div>
            </div >
        )
    }
}


export default app