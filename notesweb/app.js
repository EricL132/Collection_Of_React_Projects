import React from 'react'
import './app.css'

class app extends React.Component {
    constructor() {
        super()
        this.state = { notes: [] }
        this.addNote = this.addNote.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
        this.saveToLS = this.saveToLS.bind(this)
        this.grabFromLs = this.grabFromLs.bind(this)
        this.deleteAll = this.deleteAll.bind(this)
    }
    componentDidMount() {
        this.grabFromLs();
    }
    async addNote() {
        if(this.state.notes){
            this.setState({ notes: [...this.state.notes, ""] }, () => { localStorage.setItem('notes', JSON.stringify(this.state.notes)) })
        }else{
            this.setState({ notes: [""] }, () => { localStorage.setItem('notes', JSON.stringify(this.state.notes)) })
        }
    }
    deleteNote(e) {
        const el = e.currentTarget.parentElement.parentNode
        this.state.notes.splice(el.getAttribute('data-key'), 1)
        this.setState({ notes: this.state.notes })
        localStorage.setItem('notes', JSON.stringify(this.state.notes))
    }
    saveToLS(e) {
        const text = e.currentTarget.value
        const el = e.currentTarget.parentElement.parentNode
        let currentnotes = this.state.notes
        currentnotes[el.getAttribute('data-key')] = text
        this.setState({notes:currentnotes})
        localStorage.setItem('notes', JSON.stringify(this.state.notes))
    }
    async grabFromLs() {
        const localNotes = JSON.parse(localStorage.getItem('notes'));
        this.setState({ notes: localNotes })
    }

    async deleteAll() {
        this.setState({ notes: [] }, () => { localStorage.setItem('notes', JSON.stringify(this.state.notes)) })

    }
    render() {
        return (
            <div className='notes-container'>
                <button onClick={this.addNote} className="addNote"><i className="fas fa-plus"></i> Add Note</button>
                <button onClick={this.deleteAll} style={{ top: "4rem" }} className="addNote"><i className="fas fa-minus"></i> Delete All</button>
                { this.state.notes?this.state.notes.map((htm, i) => {
                    return <div key={i} data-key={i} className='note-container'>
                        <div className='tools-container'>
                            <button onClick={this.deleteNote} className="closeNote"><i className="fas fa-trash-alt"></i></button>
                        </div>
                        <div className="text-container">
                            <textarea spellCheck="false" onChange={this.saveToLS} defaultValue={this.state.notes[i]}></textarea>

                        </div>


                    </div>

                })
               :null }
            </div>
        )
    }
}

export default app;