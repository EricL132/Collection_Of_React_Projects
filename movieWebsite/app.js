import React from 'react'
import './app.css'


class app extends React.Component {
    constructor() {
        super()
        this.state = { searchInput: '', movieList: [] }
        this.getMovies = this.getMovies.bind(this)
        this.doSearch = this.doSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.getMovies()
    }
    async getMovies() {
        const res = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1')
        const movies = await res.json()
        this.setState({ movieList: movies['results'] })
    }
    searchMovie() {

    }

    async doSearch(e) {
        e.preventDefault()
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${this.state.searchInput}`)
        const movies = await res.json()
        console.log(movies)
        this.setState({ movieList: movies['results'] })
    }
    handleChange(e) {
        this.setState({ searchInput: e.currentTarget.value })
    }
    render() {
        return (

            <div className='movieweb-container'>
                <header>
                    <div className="search">
                        <form onSubmit={this.doSearch}>
                            <input value={this.state.searchInput} onChange={this.handleChange} type='text' spellCheck='false' className="searchInput" placeholder="Search"></input>

                        </form>
                    </div>
                </header>
                <div className="movie-container">
                    <ul className="movie-list-container">
                        {this.state.movieList.map((movies, i) => {
                            if (movies['poster_path']) {
                                return <li key={i} className="movie-list">
                                    <img src={"https://image.tmdb.org/t/p/w1280/" + movies['poster_path']} alt="movie"></img>
                                    <div className="movie-info">
                                        <h3>{movies['title']}</h3>
                                        <span>{movies['vote_average']}</span>
                                    </div>
                                    <div className="overview">
                                        <h3 style={{ color: "black" }}>Overview:</h3>

                                        {movies['overview']}

                                    </div>
                                </li>
                            }else{
                                return false
                            }
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}


export default app