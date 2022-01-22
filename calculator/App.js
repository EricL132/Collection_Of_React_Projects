import React from "react";
import "./App.css";
class App extends React.Component {
  constructor() {
    super();
    this.pushNumToArray = this.pushNumToArray.bind(this);
    this.pushOperationToArray = this.pushOperationToArray.bind(this);
    this.removeOne = this.removeOne.bind(this);
    this.performOperation = this.performOperation.bind(this);
    this.performEqual = this.performEqual.bind(this);
    this.renderCurrentString = this.renderCurrentString.bind(this);
    this.handleNegateAnswer = this.handleNegateAnswer.bind(this);
    this.handleClearCurrent = this.handleClearCurrent.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleOneOver = this.handleOneOver.bind(this);
    this.handleSquareRoot = this.handleSquareRoot.bind(this);
    this.handleSquare = this.handleSquare.bind(this);
    this.handlePercent = this.handlePercent.bind(this);
    this.state = {
      operators: {
        "+": function (a, b) {
          return a + b;
        },
        "-": function (a, b) {
          return a - b;
        },
        "*": function (a, b) {
          return a * b;
        },
        "/": function (a, b) {
          return a / b;
        },
      },
      current: [],
      currentString: "",
      upperprint: [],
      previousString: "",
      equal: "",
      handleOneOver: "",
    };
  }

  //Find result
  performEqual() {
    if (this.state.upperprint.length !== 0) {
      const uppernum = this.state.upperprint
        .toString()
        .replaceAll(",", "")
        .slice(0, -1);
      const newnum = this.state.currentString.toString();
      const result = this.state.operators[
        this.state.upperprint[this.state.upperprint.length - 1]
      ](parseFloat(uppernum), parseFloat(newnum)).toString();
      this.setState({
        equal:
          uppernum.toString() +
          this.state.upperprint[this.state.upperprint.length - 1] +
          newnum.toString(),
      });
      this.setState({ currentString: result });
    }
  }
  //Function called when operations key is clicked again with no new input (use old input and perform operation)
  performOperation(oper) {
    if (!this.state.equal) {
      if (this.state.current.length === 0) {
        this.setState(
          {
            upperprint: [this.state.upperprint[0], oper],
          },
          () => {
            this.renderUpperString();
          }
        );
      } else {
        const upperString = parseFloat(
          this.state.upperprint.toString().replaceAll(",", "").slice(0, -1)
        );
        const operation =
          this.state.upperprint[this.state.upperprint.length - 1];
        const currentToAdd = parseFloat(
          this.state.current.toString().replaceAll(",", "")
        );
        const result = this.state.operators[operation](
          upperString,
          currentToAdd
        ).toString();

        this.setState({ upperprint: [result, oper] }, () => {
          this.setState({ current: [] });
          this.setState({ currentString: result });
          this.renderUpperString();
        });
      }
    } else {
      this.setState({ upperprint: [this.state.currentString, oper] }, () => {
        this.setState({ current: [] });
        this.setState({ equal: "" });
        this.renderUpperString();
      });
    }
  }

  //Function called when a operation button is clicked (adds operation to array)
  pushOperationToArray(e) {
    if (this.state.current.length > 0) {
      const operator = e.target.innerText;
      if (
        !this.state.upperprint.includes("*") &&
        !this.state.upperprint.includes("+") &&
        !this.state.upperprint.includes("/") &&
        !this.state.upperprint.includes("-") &&
        !this.state.equal
      ) {
        this.setState({ upperprint: [...this.state.current, operator] }, () => {
          console.log(this.state.upperprint);
          this.renderUpperString();
          this.setState({ current: [] });
          this.setState({ currentString: "" });
        });
      } else {
        this.performOperation(operator);
      }
    }
  }

  //Adds new number (on button click)
  pushNumToArray(e) {
    const number = e.target.innerText;
    this.setState({ current: [...this.state.current, number] }, () => {
      this.renderCurrentString();
    });
  }

  //Handles back button
  removeOne() {
    if (!this.state.equal) {
      this.setState(
        {
          current: this.state.current.filter((item, i) => {
            return i !== this.state.current.length - 1;
          }),
        },
        () => {
          this.renderCurrentString();
        }
      );
    } else {
      this.setState({ current: [this.state.currentString] });
      this.setState({ previousString: "" });
      this.setState({ upperprint: [] }, () => {
        this.setState({ equal: false });
        this.renderUpperString();
      });
    }
  }

  //Shows new string after operations and math is done
  renderCurrentString() {
    const items = this.state.current.toString().replaceAll(",", "");
    if (items.length > 12) {
      this.setState({ currentString: items.substring(0, 13) });
    } else {
      this.setState({ currentString: items });
    }
  }

  //Shows new previous string after operations and math is done (string on top of results)
  renderUpperString() {
    const items = this.state.upperprint.toString().replaceAll(",", "");
    this.setState({ previousString: items });
  }

  //Negates the current numbers sign +/-
  handleNegateAnswer() {
    this.setState({ upperprint: [] }, () => {
      if (this.state.currentString.includes("-")) {
        this.setState(
          { current: [this.state.currentString.substring(1)] },
          () => {
            this.setState({ previousString: "" });
            this.setState({ equal: false });
            this.renderCurrentString();
          }
        );
      } else {
        this.setState({ current: ["-" + this.state.currentString] }, () => {
          this.setState({ previousString: "" });
          this.setState({ equal: false });
          this.renderCurrentString();
          console.log(this.state.current);
        });
      }
    });
  }

  //Clears all inputs
  clearAll() {
    this.setState({ equal: false });
    this.setState({ current: [] });
    this.setState({ currentString: "" });
    this.setState({ upperprint: [] });
    this.setState({ previousString: "" });
  }

  //Clears current inputs
  handleClearCurrent() {
    if (this.state.equal) {
      this.setState({ equal: false });
      this.setState({ current: [] });
      this.setState({ currentString: "" });
      this.setState({ upperprint: [] });
      this.setState({ previousString: "" });
    } else {
      this.setState({ current: [] });
      this.setState({ currentString: "" });
    }
  }
  //Performs 1/x Operation
  handleOneOver() {
    if (this.state.currentString !== "") {
      const res = this.state.operators["/"](
        1,
        parseFloat(this.state.currentString)
      ).toString();
      this.setState({ current: [res] });
      this.setState({ upperprint: [] });
      this.setState({ previousString: "" }, () => {
        this.renderCurrentString();
      });
    }
  }

  //Performs squae root operation
  handleSquareRoot() {
    if (this.state.currentString !== "") {
      const res = Math.sqrt(parseFloat(this.state.currentString)).toString();
      this.setState({ current: [res] });
      this.setState({ upperprint: [] });
      this.setState({ previousString: "" }, () => {
        this.renderCurrentString();
      });
    }
  }

  //Performs x^2 operation
  handleSquare() {
    if (this.state.currentString !== "") {
      const res = this.state.operators["*"](
        parseFloat(this.state.currentString),
        parseFloat(this.state.currentString)
      ).toString();
      this.setState({ current: [res] });
      this.setState({ upperprint: [] });
      this.setState({ previousString: "" }, () => {
        this.renderCurrentString();
      });
    }
  }

  //Performs % operation
  handlePercent() {
    if (this.state.currentString !== "") {
      if (this.state.previousString !== "") {
        const res = (
          (parseFloat(this.state.previousString) / 100) *
          parseInt(this.state.currentString)
        ).toString();
        this.setState({ current: [res] });
        this.setState({ upperprint: [] });
        this.setState({ previousString: "" }, () => {
          this.renderCurrentString();
          this.setState({ equal: true });
        });
      } else {
        this.setState({ current: [] });
        this.setState({ currentString: ["0"] });
        this.setState({ previousString: "" });
      }
    }
  }

  render() {
    return (
      <div className="calculator_app">
        <div className="calculator_container">
          <div className="calculator_screen">
            <h1 className="name_header">Calculator</h1>
            {!this.state.equal ? (
              <div className="previous_box">{this.state.previousString}</div>
            ) : (
              <div>
                <div className="previous_box">{this.state.equal}</div>
              </div>
            )}

            <div className="result_box">
              {this.state.equal && <span className="equal_span">=</span>}
              <span className="result_span">{this.state.currentString}</span>
            </div>
          </div>

          <div className="input_screen">
            <div className="calculator_button" onClick={this.handlePercent}>
              <span>%</span>
            </div>
            <div
              className="calculator_button"
              onClick={this.handleClearCurrent}
            >
              <span>CE</span>
            </div>
            <div className="calculator_button" onClick={this.clearAll}>
              <span>C</span>
            </div>
            <div className="calculator_button" onClick={this.removeOne}>
              <span>
                <i className="fas fa-backspace"></i>
              </span>
            </div>
            <div className="calculator_button" onClick={this.handleOneOver}>
              <span>1/x</span>
            </div>
            <div className="calculator_button" onClick={this.handleSquare}>
              <span>x^2</span>
            </div>
            <div className="calculator_button" onClick={this.handleSquareRoot}>
              <span>
                2<i className="fas fa-square-root-alt"></i>
              </span>
            </div>
            <div
              className="calculator_button"
              onClick={this.pushOperationToArray}
            >
              <span>/</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>7</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>8</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>9</span>
            </div>
            <div
              className="calculator_button"
              onClick={this.pushOperationToArray}
            >
              <span>*</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>4</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>5</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>6</span>
            </div>
            <div
              className="calculator_button"
              onClick={this.pushOperationToArray}
            >
              <span>-</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>1</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>2</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>3</span>
            </div>
            <div
              className="calculator_button"
              onClick={this.pushOperationToArray}
            >
              <span>+</span>
            </div>
            <div
              className="calculator_button"
              onClick={this.handleNegateAnswer}
            >
              <span>+/-</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>0</span>
            </div>
            <div className="calculator_button" onClick={this.pushNumToArray}>
              <span>.</span>
            </div>
            <div className="calculator_button" onClick={this.performEqual}>
              <span>=</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
