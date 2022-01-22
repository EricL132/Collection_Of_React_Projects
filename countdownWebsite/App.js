import "./App.css";
import React from "react";
let interval;
class App extends React.Component {
  constructor() {
    super();
    this.state = { loaded: false };
    this.countDown = this.countDown.bind(this);
  }
  
  countDown() {
    this.setState({ loaded: true });
    //Gets date and current date to find time remaining
    const newYearsDate = new Date(`1 1 ${new Date().getFullYear()+1}`);
    const currentDate = new Date();

    //Get time remaining for each interval (seconds, days, hours, mintues, seconds)
    const seconds = (newYearsDate - currentDate) / 1000;
    const days = Math.floor(seconds / 3600 / 24);
    const hours = Math.floor(seconds / 3600 / 24) % 24;
    const minutes = Math.floor(seconds / 3600 / 24) % 60;
    const sec = Math.floor(seconds % 60);

    //Sets element text equal to time of each interval
    document.getElementById("Days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = sec;
  }

  //Runs on load sets interval to run countdown function every 1 second
  componentDidMount() {
    interval = setInterval(() => {
      this.countDown();
    }, 1000);
  }

  //Clears interval when site is closed 
  componentWillUnmount() {
    clearInterval(interval);
  }
  render() {
    return (
      <>
        {this.state.loaded ? (
          <div className="countdown_full">
            <h1>New Years</h1>
            <h2>January 1st</h2>
            <div className="countdown_container">
              <div className="count_dm days_c">
                <p className="big_text" id="Days"></p>
                <span className="countdm_normal_span">Days</span>
              </div>
              <div className="count_dm hours_c">
                <p className="big_text" id="hours"></p>
                <span className="countdm_normal_span">Hours</span>
              </div>
              <div className="count_dm minutes_c">
                <p className="big_text" id="minutes"></p>
                <span className="countdm_normal_span">Minutes</span>
              </div>
              <div className="count_dm seconds_c">
                <p className="big_text" id="seconds"></p>
                <span className="countdm_normal_span">Seconds</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="countdown_full">Loading...</div>
        )}
      </>
    );
  }
}

export default App;
