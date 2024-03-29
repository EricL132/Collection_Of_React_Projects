import React from 'react'
import './app.js'


/* class meals extends React.Component {
    constructor(props) {
        super(props)
        this.state = { randomMealImg: "" }
        this.getInfo = this.getInfo.bind(this)
    }
    getInfo(e) {
        e.stopPropagation()
        this.props.loadMealInfo(e)
    }

    render() {
        return (
            <>
            {this.props.searchResult['meals'] ?
                this.props.searchResult['meals'].map((meal, i = 10) => {

                return <div key={i} mealid={meal['idMeal']} >
                    <div className="meal-header">
                        <img mealid={meal['idMeal']} onClick={this.getInfo} src={meal['strMealThumb']}></img>
                    </div>
                    <div className="meal-body">
                        <h4>{meal['strMeal']}</h4>
                        <button mealid={meal['idMeal']} className={`fav-btn ${this.state.activeFavorite}`} onClick={this.props.doFavorite}><i className="fas fa-heart"></i></button>
                    </div>
                </div>

            })
            :alert('Dish not found')}
            </>
        )
    }
} */


function Meals(props) {
    return (
        <>
            {props.searchResult['meals'] ?
                props.searchResult['meals'].map((meal, i = 10) => {

                    return <div key={i} mealid={meal['idMeal']} >
                        <div className="meal_header">
                            <img mealid={meal['idMeal']} onClick={(e)=>props.loadMealInfo(e)} src={meal['strMealThumb']} alt="meal" className="meal_img"></img>
                        </div>
                        <div className="name_container">
                            <h4 className="margin_0">{meal['strMeal']}</h4>
                            <button mealid={meal['idMeal']} className={`favorite_button`} onClick={props.doFavorite}><i className="fas fa-heart"></i></button>
                        </div>
                    </div>

                })
                : alert('Dish not found')}
        </>
    )

}
export default Meals;