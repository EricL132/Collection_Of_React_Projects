import './App.css';
import React from 'react'

class App extends React.Component {
    constructor() {
        super()
        this.doBubbleSort = this.doBubbleSort.bind(this)

        this.doQuickSort = this.doQuickSort.bind(this)
        this.partition = this.partition.bind(this)
        this.doQuickSort = this.doQuickSort.bind(this)
        this.handleSpeedChange = this.handleSpeedChange.bind(this)
        this.generateArray = this.generateArray.bind(this)
        this.sleep = this.sleep.bind(this)
        this.state = { sortingArray: [], speed: 10, width: 6, isQuickSort: false, isBubbleSort: false }


    }
    componentDidMount() {
        this.generateArray();
    }
    generateArray() {
        const arr = []
        if (this.state.sortingArray.length > 0) {
            this.setState({ isQuickSort: false })
            this.setState({ isBubbleSort: false })
            Array.from(document.getElementsByClassName('item-bar')).map((ele) => { return ele.style.backgroundColor = "#63b88f" })
        }
        for (var i = 0; i < 22; i++) {
            arr.push(Math.floor(Math.random() * (500 - 10) + 10))
        }

        this.setState({ sortingArray: arr })
    }

    sleep = ms => new Promise(res => setTimeout(res, ms))
    async doBubbleSort() {
        this.setState({ isQuickSort: false })
        this.setState({ isBubbleSort: true })
        for (var i = 0; i < this.state.sortingArray.length; i++) {

            for (var j = 0; j < this.state.sortingArray.length - i - 1; j++) {
                const bars = document.getElementsByClassName('item-bar')
                bars[j].style.backgroundColor = "lightblue"
                bars[j + 1].style.backgroundColor = "lightblue"
                await this.sleep(this.state.speed)
                if (this.state.sortingArray[j] > this.state.sortingArray[j + 1]) {
                    bars[j].style.backgroundColor = "yellow"
                    bars[j + 1].style.backgroundColor = "yellow"
                    await this.sleep(this.state.speed)
                    const temp = this.state.sortingArray[j]
                    this.state.sortingArray[j] = this.state.sortingArray[j + 1]
                    this.state.sortingArray[j + 1] = temp


                }

                bars[j].style.backgroundColor = "#63b88f"
                bars[j + 1].style.backgroundColor = "#63b88f"




            }

            document.getElementsByClassName('item-bar')[this.state.sortingArray.length - i - 1].style.backgroundColor = "#ac84c8"
            this.forceUpdate()



        }
        Array.from(document.getElementsByClassName('item-bar')).map(async (ele) => {

            ele.style.backgroundColor = "pink"
        })

    }


    async doQuickSort() {
        this.setState({ isBubbleSort: false })
        this.setState({ isQuickSort: true })
        const array = Array.from(this.state.sortingArray)
        await this.quickSort(array, 0, array.length - 1)
        Array.from(document.getElementsByClassName('item-bar')).map(async (ele) => {

            ele.style.backgroundColor = "pink"
        })

    }




    async quickSort(arr, start, end) {
        if (start >= end) {
            return;
        }
        await this.partition(arr, start, end).then(async (index) => {
            await Promise.all([this.quickSort(arr, start, index - 1), this.quickSort(arr, index + 1, end)]);

        });




    }


    partition(arr, start, end) {
        return new Promise(async (resolve) => {
            const pivotValue = arr[end];
            document.getElementsByClassName('item-bar')[end].style.backgroundColor = "yellow"
            let pivotIndex = start;
            for (let i = start; i < end; i++) {
                document.getElementsByClassName('item-bar')[i].style.backgroundColor = "lightblue"
                await this.sleep(this.state.speed)
                if (arr[i] < pivotValue) {
                    document.getElementsByClassName('item-bar')[i].style.backgroundColor = "red"
                    document.getElementsByClassName('item-bar')[pivotIndex].style.backgroundColor = "red"
                    await this.sleep(this.state.speed);
                    [this.state.sortingArray[i], this.state.sortingArray[pivotIndex]] = [this.state.sortingArray[pivotIndex], this.state.sortingArray[i]];
                    document.getElementsByClassName('item-bar')[i].style.backgroundColor = "#63b88f";
                    document.getElementsByClassName('item-bar')[pivotIndex].style.backgroundColor = "#63b88f";
                    [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                    pivotIndex++;
                    this.forceUpdate()
                }
                document.getElementsByClassName('item-bar')[i].style.backgroundColor = "#63b88f"

            }

            [this.state.sortingArray[pivotIndex], this.state.sortingArray[end]] = [this.state.sortingArray[end], this.state.sortingArray[pivotIndex]];
            this.forceUpdate();
            [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
            document.getElementsByClassName('item-bar')[end].style.backgroundColor = "#63b88f";
            document.getElementsByClassName('item-bar')[pivotIndex].style.backgroundColor = "#ac84c8";
            resolve(pivotIndex)
        })

    }

    handleSpeedChange() {
        this.setState({ speed: document.getElementById('speed-input').value })
        this.setState({ width: document.getElementById('width-input').value })
    }



    render() {
        return (
            <div className="sorting-whole-container">
                <div className="box-container">
                    <div className="options-container">
                        <h1>Visualizer</h1>
                        <div className="setting-container">
                            <label htmlFor="speed-input">Speed (ms)</label>
                            <input type="number" id="speed-input" defaultValue="10" onChange={this.handleSpeedChange}></input>
                            <label htmlFor="width-input">Width</label>
                            <input type="number" id="width-input" defaultValue="6" onChange={this.handleSpeedChange}></input>
                        </div>
                        <div className="button-container">
                            <button className="sort-buttons" onClick={this.doQuickSort}>Quick Sort</button>
                            <button className="sort-buttons" onClick={this.doBubbleSort}>Bubble Sort</button>
                            <button className="sort-buttons" onClick={this.generateArray}>New Array</button>
                        </div>
                    </div>

                    <div className="sorting-container">
                        {this.state.sortingArray.map((num, i) => {
                            return <div key={i} numb={num} slot={i} className="item-bar" style={{ height: num, width: `${this.state.width}px` }}></div>
                        })

                        }
                        {this.state.isQuickSort ?
                            <div className="Info-container">
                                <div className="info-container-div"><div style={{backgroundColor:"yellow",minWidth:"20px",minHeight:"20px"}}></div><span>Pivot</span></div>
                                <div className="info-container-div"><div style={{backgroundColor:"#ac84c8",minWidth:"20px",minHeight:"20px"}}></div><span>Sorted</span></div>
                                <div className="info-container-div"><div style={{backgroundColor:"red",minWidth:"20px",minHeight:"20px"}}></div><span>Comparing</span></div>
                                <div className="info-container-div"><div style={{backgroundColor:"lightblue",minWidth:"20px",minHeight:"20px"}}></div><span>Current Index</span></div>
                                <div className="info-container-div"><div style={{backgroundColor:"pink",minWidth:"20px",minHeight:"20px"}}></div><span>Done Sorting</span></div>
                                <div className="info-container-div"><div style={{backgroundColor:"#63b88f",minWidth:"20px",minHeight:"20px"}}></div><span>Default</span></div>
                            </div>
                            : null}
                        {this.state.isBubbleSort ?
                            <div className="Info-container">
                                <div className="info-container-div"><div style={{backgroundColor:"#ac84c8",minWidth:"20px",minHeight:"20px"}}></div><span>Sorted</span></div>
                                <div className="info-container-div"><div style={{backgroundColor:"lightblue",minWidth:"20px",minHeight:"20px"}}></div><span>Comparing</span></div>
                                <div className="info-container-div"><div style={{backgroundColor:"yellow",minWidth:"20px",minHeight:"20px"}}></div><span>Swap</span></div>
                                <div className="info-container-div"><div style={{backgroundColor:"pink",minWidth:"20px",minHeight:"20px"}}></div><span>Done Sorting</span></div>
                                <div className="info-container-div"><div style={{backgroundColor:"#63b88f",minWidth:"20px",minHeight:"20px"}}></div><span>Default</span></div>
                            </div>
                            : null}
                    </div>

                </div>

            </div>
        )
    }
}

export default App;
