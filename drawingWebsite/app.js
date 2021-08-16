import React from 'react'
import './app.css'

class app extends React.Component {
    constructor() {
        super()
        this.state = { drawSize: 5, points: [] }
        this.draw = this.draw.bind(this)
        this.handleAddSize = this.handleAddSize.bind(this)
        this.handleSubSize = this.handleSubSize.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.moused = this.moused.bind(this)
    }

    moused(e) {
        if (e.touches) {
            var rect = document.getElementById('canvas').getBoundingClientRect();
            this.setState({points:[]})
            const x = (e.touches[0]['clientX']- rect.left) / (rect.right - rect.left) *  document.getElementById('canvas').width
            const y = (e.touches[0]['clientY']- rect.top) / (rect.bottom - rect.top) *  document.getElementById('canvas').height
            this.setState({ points: [...this.state.points, { x: x, y: y }] })
        } else {
            this.setState({points:[]})
            const x = e['nativeEvent']['offsetX']
            const y = e['nativeEvent']['offsetY']
            this.setState({ points: [...this.state.points, { x: x, y: y }] })
        }
    }
    draw(e) {

        if (e.touches) {

           var rect = document.getElementById('canvas').getBoundingClientRect();

            const color = document.getElementById("color").value;
            const x = (e.touches[0]['clientX']- rect.left) / (rect.right - rect.left) * document.getElementById('canvas').width
            const y = (e.touches[0]['clientY']- rect.top) / (rect.bottom - rect.top) * document.getElementById('canvas').height
            var canvas = document.getElementById("canvas");

            var ctx = canvas.getContext("2d");
            ctx.lineJoin = ctx.lineCap = 'round';

            ctx.strokeStyle = color
            ctx.lineWidth = this.state.drawSize
            this.state.points.push({ x: x, y: y })


            ctx.beginPath()

            ctx.moveTo(this.state.points[0].x, this.state.points[0].y)
            for (var i = 1; i < this.state.points.length; i++) {
                ctx.lineTo(this.state.points[i].x, this.state.points[i].y);
            }
            ctx.stroke()
        } else {
            if (e.buttons === 1) {
                const color = document.getElementById("color").value;
                const x = e['nativeEvent']['offsetX']
                const y = e['nativeEvent']['offsetY']
                canvas = document.getElementById("canvas");

                ctx = canvas.getContext("2d");
                ctx.lineJoin = ctx.lineCap = 'round';

                ctx.strokeStyle = color
                ctx.lineWidth = this.state.drawSize
                this.state.points.push({ x: x, y: y })


                ctx.beginPath()

                ctx.moveTo(this.state.points[0].x, this.state.points[0].y)
                for (var j = 1; j< this.state.points.length; j++) {
                    ctx.lineTo(this.state.points[j].x, this.state.points[j].y);
                }
                ctx.stroke()

            }
        }
    }
    handleAddSize() {
        this.setState({ drawSize: this.state.drawSize + 1 })
    }
    handleSubSize() {
        this.setState({ drawSize: (this.state.drawSize - 1) })
    }
    handleClear() {
        var canvas = document.getElementById("canvas");
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    render() {
        return (
            <div className="drawing-container">
                <canvas onMouseDown={this.moused} onMouseMove={this.draw} onTouchStart={this.moused} onTouchMove={this.draw} width='650' height='600' id="canvas">
                </canvas>
                <div className="tools-container">
                    <button onClick={this.handleSubSize} className="size-button"><i className="fas fa-minus"></i></button>
                    <span>{this.state.drawSize}</span>
                    <button onClick={this.handleAddSize} className="size-button"><i className="fas fa-plus"></i></button>
                    <input type='color' id='color'></input>
                    <button onClick={this.handleClear} style={{ marginLeft: 'auto' }} className="size-button"><i className="fas fa-trash"></i></button>

                </div>

            </div>
        )
    }


}


export default app;