import React from 'react'
import './app.css'


class app extends React.Component {
    constructor() {
        super()
        this.state = { todos: [] }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCrossTodo = this.handleCrossTodo.bind(this)
        this.loadFromLS = this.loadFromLS.bind(this)
        this.saveToLS = this.saveToLS.bind(this)
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this)
    }
    componentDidMount() {
        this.loadFromLS()
    }
    loadFromLS() {
        const todos1 = JSON.parse(localStorage.getItem('todos'))
        this.setState({ todos: todos1 })
    }
    saveToLS() {
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }
    handleSubmit(e) {
        e.preventDefault()
        const todoInput = document.getElementsByClassName('todoInput')[0].value
        document.getElementsByClassName('todoInput')[0].value = ""
        if (todoInput) {
            if (this.state.todos) {
                this.setState({ todos: [...this.state.todos, { text: todoInput, completed: '' }] }, () => {
                    this.saveToLS()
                })
            } else {
                this.setState({ todos: [{ text: todoInput, completed: '' }] }, () => {
                    this.saveToLS()
                })
            }
        }
    }
    handleCrossTodo(e) {
        const todoIndex = e.target.getAttribute('data-index')
        const arrayList = [...e.target.classList]
        if (!arrayList.includes("completed")) {

            this.setState({
                todos: this.state.todos.map((todos, i) => {
                    if (i === todoIndex) {
                        return { text: this.state.todos[i]['text'], completed: 'completed' }
                    } else {
                        return todos
                    }
                })
            }, () => {
                this.saveToLS()
            })
        } else {
            this.setState({
                todos: this.state.todos.map((todos, i) => {
                    if (i === todoIndex) {
                        return { text: this.state.todos[i]['text'], completed: '' }
                    } else {
                        return todos
                    }
                })
            }, () => {
                this.saveToLS()
            })
        }


    }

    handleRemoveTodo(e) {
        e.preventDefault()
        const todoIndex = e.target.getAttribute('data-index')
        this.setState({
            todos: this.state.todos.filter((todos, i) => {
                if (i !== todoIndex) {
                    return todos
                }else{
                    return false
                }
            })
        }, () => {
            this.saveToLS()
        })
    }
    render() {
        return (
            <div className='todo-container'>
                <h1>todo</h1>
                <form onSubmit={this.handleSubmit} id="form">
                    <input autoComplete="off" spellCheck="false" type="text" id="input" className="todoInput" placeholder="Enter todo"></input>
                    {this.state.todos ?
                        <ul className="todos">

                            {this.state.todos.map((todos, i) => {
                                return <li onContextMenu={this.handleRemoveTodo} onTouchMove={this.handleRemoveTodo} className={todos['completed']} onClick={this.handleCrossTodo} data-index={i} key={i}>{todos['text']}</li>
                            })
                            }
                        </ul>
                        : null}
                </form>
                <small style={{ marginTop: "2rem" }}>Left click to mark complete</small>
                <small>Right click to remove</small>
                <small>Drag on mobile to remove</small>

                </div>
        )
    }
}

export default app;