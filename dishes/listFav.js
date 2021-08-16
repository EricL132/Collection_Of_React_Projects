import React from 'react'
import './app.css'

/* class favList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { meals: [], mealList: [] }
        this.removeFav = this.removeFav.bind(this)
        this.showInfo = this.showInfo.bind(this)
    }
    removeFav(a) {
        this.props.removeFav(a.currentTarget.getAttribute('name'))
    }
    showInfo(e) {
        e.stopPropagation()
        this.props.loadMealInfo(e)
    }
    render() {
        return (
            this.props.mealList.map((meals, i) => {
                return <li key={i}><img onClick={this.showInfo} mealid={meals['meals'][0]['idMeal']} src={meals['meals'][0]['strMealThumb']} ></img><span>{meals['meals'][0]['strMeal']}</span><button name={meals['meals'][0]['idMeal']} onClick={this.removeFav} className="deleteFav"><i className="fas fa-window-close"></i></button></li>
            })
        )
    }
}

 */


function FavList(props) {
    return (
        props.mealList.map((meals, i) => {
            return <li key={i}><img alt="meal" onClick={(e)=>props.loadMealInfo(e)} mealid={meals['meals'][0]['idMeal']} src={meals['meals'][0]['strMealThumb']} ></img><span>{meals['meals'][0]['strMeal']}</span><button name={meals['meals'][0]['idMeal']} onClick={(e)=>props.removeFav(e.currentTarget.getAttribute('name'))} className="deleteFav"><i className="fas fa-window-close"></i></button></li>
        })
    )

}
export default FavList;