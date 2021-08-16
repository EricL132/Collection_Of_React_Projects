import React, { useCallback, useEffect, useState } from 'react'
import './app.css'
import ListFav from './listFav'
import Meals from './meals'



function App() {

    const [state, setState] = useState({
        mealIngredients: [],
        clickedMealInfo: "",
        showmealInfo: true,
        searchResult: { meals: [] },
        searchHidden: false,
        mealList: [],
        randomMealImg: "",
        randomMealName: "",
        activeFavorite: [false],
        randomMeal: "",
        mealid: "",
        currentRandomMeal: ""
    })
    const [firstRun,set_firstRun] = useState(true)
    const checkIfFavorite = useCallback(()=> {
        state.mealList.map((meals) => {
            const btns = document.getElementsByClassName('fav-btn')
            const arrColl = [...btns]
           return arrColl.map((b) => {
                if (meals['meals'][0]['idMeal'] === b.getAttribute('mealid')) {
                  return   b.classList.add('active')
                }else{
                    return false
                }
            })

        })

    },[state])
    useEffect(() => {
        
        async function getMealsTolist() {
            return new Promise(async (resolve) => {
                const meals = await getMealsFromLS()
                await Promise.all(meals.map(async (meal) => {
                    const a = await getMealByID(meal)
                    setState(old => ({ ...old, mealList: [...old.mealList, a] }))
                }))
                resolve();
            })
    
        }
        async function getRandomMeal() {

            fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json()).then(data => {
                const randomMeal = data['meals'][0]
                setState(old => ({ ...old, randomMeal: data, randomMealImg: randomMeal['strMealThumb'], randomMealName: randomMeal['strMeal'], currentRandomMeal: randomMeal['idMeal'] }))

            })

        }
    
        
        if(firstRun){
            getRandomMeal()
            getMealsTolist().then(() => {
                checkIfFavorite()
            })
            set_firstRun(false)
        }

    }, [checkIfFavorite,firstRun])





    async function getMealsFromLS() {
        const mealIDs = JSON.parse(localStorage.getItem('mealIDs'))
        return mealIDs === null ? [] : mealIDs;
    }


    async function getMealByID(id) {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
        const searchData = await res.json()
        return searchData
    }
    async function getMealBySearch() {
        const searchInput = document.getElementById('searchText')
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchInput.value)
        const searchRes = await res.json();
        setState(old => ({ ...old, searchResult: searchRes }))
        checkIfFavorite()
    }



    async function removeFav(meal) {
        const mealIDs = await getMealsFromLS()
        localStorage.setItem('mealIDs', JSON.stringify(mealIDs.filter((meals) =>
            meals !== meal
        )))

        setState(old => ({
            ...old, mealList: state.mealList.filter((meals) =>
                meals['meals'][0]['idMeal'] !== meal
            )
        }))


    }


    async function loadMealInfo(e) {
        e.stopPropagation()
        const meal = e.currentTarget.getAttribute('mealid')
        const mealInfo = await getMealByID(meal)
        for (var i = 0; i < 20; i++) {
            if (mealInfo['meals'][0]['strIngredient' + i]) {
                const ingre = `strIngredient${i}`
                const measure = `strMeasure${i}`
                setState(old => ({ ...old, mealIngredients: [...old.mealIngredients, mealInfo['meals'][0][ingre] + " - " + mealInfo['meals'][0][measure]] }))
            }
        }

        setState(old => ({ ...old, clickedMealInfo: mealInfo }))
        setState(old => ({ ...old, showmealInfo: true }))
    }


    async function doFavorite(e) {
        e.persist()
        const mealid = e.currentTarget.getAttribute('mealid')
        if (!e.currentTarget.className.includes('active')) {
            e.currentTarget.classList.add('active')

            const mealIDs = await getMealsFromLS()
            const meal = await getMealByID(mealid)
            setState(old => ({ ...old, mealList: [...state.mealList, meal] }))

            localStorage.setItem('mealIDs', JSON.stringify([...mealIDs, mealid]))
        } else {
            e.currentTarget.classList.remove('active')





            const mealIDs = await getMealsFromLS()
            localStorage.setItem('mealIDs', JSON.stringify(mealIDs.filter((meals) =>
                meals !== mealid
            )))

            setState(old => ({
                ...old, mealList: state.mealList.filter((meal) => {
                    return meal['meals'][0]['idMeal'] !== mealid
                })
            }))


        }
    }

    function closePopup() {
        setState(old => ({ ...old, showmealInfo: false }))
        setState(old => ({ ...old, mealIngredients: [] }))
        setState(old => ({ ...old, clickedMealInfo: null }))
    }

    return (

        <div className="dish-full">
            <div className="mobile-container">
                <header>
                    <input id="searchText" type="text"></input>
                    <button onClick={getMealBySearch} id="search" className="fas fa-search"></button>
                </header>
                <div className="fav-container" >
                    <h3>Favorite Dishes</h3>
                    <ul className="fav-meals" onWheel={(e) => {
                        if (e.target.nodeName === "LI") {
                            e.target.parentNode.scrollLeft += (e.deltaY);
                        } else {
                            e.target.offsetParent.parentNode.scrollLeft += (e.deltaY);
                        }
                    }}>
                        <ListFav {...state} removeFav={removeFav} getMealsFromLS={getMealsFromLS} loadMealInfo={loadMealInfo} />
                    </ul>
                </div>




                <div className="meals">
                    <div className="meal">
                        <div className="meal-header">
                            <span className="random">Random Recipe</span>
                            <img mealid={state.currentRandomMeal} onClick={loadMealInfo} src={state.randomMealImg} alt="random meal"></img>
                        </div>
                        <div className="meal-body">
                            <h4>{state.randomMealName}</h4>
                            <button mealid={state.currentRandomMeal} className={`fav-btn`} onClick={doFavorite}><i className="fas fa-heart"></i></button>
                        </div>
                        <Meals {...state} doFavorite={doFavorite} loadMealInfo={loadMealInfo} ></Meals>
                    </div>

                </div>
            </div>
            {state.showmealInfo && state.clickedMealInfo ?
                <div className="meal-info-container" display='none'>
                    <div className="meal-info">
                        <button onClick={closePopup} className="close-popup"><i className="fas fa-window-close"></i></button>
                        <div>
                            <h1>{state.clickedMealInfo['meals'][0]['strMeal']}</h1>
                            <img src={state.clickedMealInfo['meals'][0]['strMealThumb']} alt="meal"></img>
                        </div>
                        <div>
                            <p>{state.clickedMealInfo['meals'][0]['strInstructions']}
                            </p>
                            <h3>Ingredients: </h3>
                            <ul>
                                {
                                    state.mealIngredients.map((ing, i) => {
                                        return <li key={i}>{ing}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                : null}
        </div>

    )
}

















/* class App extends React.Component {
    constructor() {
        super()
        this.state = { mealIngredients: [], clickedMealInfo: null, showmealInfo: true, searchResult: { meals: [] }, searchHidden: false, mealList: [], randomMealImg: "https://i.stack.imgur.com/Vkq2a.png", randomMealName: "", activeFavorite: [false] }
        this.getRandomMeal = this.getRandomMeal.bind(this)
        this.doFavorite = this.doFavorite.bind(this)
        this.getMealsFromLS = this.getMealsFromLS.bind(this)
        this.getMealsTolist = this.getMealsTolist.bind(this)
        this.getMealByID = this.getMealByID.bind(this)
        this.removeFav = this.removeFav.bind(this)
        this.getMealBySearch = this.getMealBySearch.bind(this)
        this.checkIfFavorite = this.checkIfFavorite.bind(this)
        this.closePopup = this.closePopup.bind(this)
        this.loadMealInfo = this.loadMealInfo.bind(this)

    }
    async componentDidMount() {
        await this.getRandomMeal()
        await this.getMealsTolist().then(() => {
            this.checkIfFavorite()
        })




    }
    async getMealByID(id) {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
        const searchData = await res.json()
        return searchData
    }
    async getMealsTolist() {
        return new Promise(async (resolve) => {
            const meals = await this.getMealsFromLS()
            await Promise.all(meals.map(async (meal) => {
                const a = await this.getMealByID(meal)
                this.setState({ mealList: [...this.state.mealList, a] })

            }))
            resolve();
        })



    }
    async getRandomMeal() {
        return new Promise(async (resolve) => {
            const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            const resData = await res.json()
            const randomMeal = resData['meals'][0]
            this.setState({ randomMeal: resData })
            this.setState({ randomMealImg: randomMeal['strMealThumb'] })
            this.setState({ randomMealName: randomMeal['strMeal'] })
            this.setState({ currentRandomMeal: randomMeal['idMeal'] })
            const favRan = document.getElementsByClassName('fav-btn')[0]
            favRan.setAttribute('mealid', this.state.currentRandomMeal)
            resolve();
        })

    }

    async getMealBySearch() {
        const searchInput = document.getElementById('searchText')
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchInput.value)
        const searchRes = await res.json();
        this.setState({ searchResult: searchRes })
        this.checkIfFavorite()
    }
    async doFavorite(e) {
        e.stopPropagation()
        e.persist()
        const mealid = e.currentTarget.getAttribute('mealid')
        if (!e.currentTarget.className.includes('active')) {
            e.currentTarget.classList.add('active')
            this.setState({ activeFavorite: 'active' })
            const mealIDs = await this.getMealsFromLS()
            const meal = await this.getMealByID(mealid)
            this.setState({ activeFavorite: this.state.activeFavorite })
            this.setState({ mealList: [...this.state.mealList, meal] })
            localStorage.setItem('mealIDs', JSON.stringify([...mealIDs, mealid]))
        } else {
            e.currentTarget.classList.remove('active')
            this.setState({ activeFavorite: '' })
            const mealIDs = await this.getMealsFromLS()
            localStorage.setItem('mealIDs', JSON.stringify(mealIDs.filter((meals) =>
                meals !== mealid
            )))
            this.setState({
                mealList: this.state.mealList.filter((meal) => {
                    return meal['meals'][0]['idMeal'] !== mealid
                })
            })

        }
    }


    async removeFav(meal) {
        const mealIDs = await this.getMealsFromLS()
        localStorage.setItem('mealIDs', JSON.stringify(mealIDs.filter((meals) =>
            meals !== meal
        )))
        this.setState({
            mealList: this.state.mealList.filter((meals) =>
                meals['meals'][0]['idMeal'] !== meal
            )
        })

    }

    async getMealsFromLS() {
        const mealIDs = JSON.parse(localStorage.getItem('mealIDs'))
        return mealIDs === null ? [] : mealIDs;
    }
    checkIfFavorite() {
        this.state.mealList.map((meals) => {
            const btns = document.getElementsByClassName('fav-btn')
            const arrColl = [...btns]
            arrColl.map((b) => {
                if (meals['meals'][0]['idMeal'] === b.getAttribute('mealid')) {
                    b.classList.add('active')
                }
            })

        })

    }
    closePopup() {
        this.setState({ showmealInfo: false })
        this.setState({ mealIngredients: [] })
        this.setState({ clickedMealInfo: null })

    }

    async loadMealInfo(e) {
        e.stopPropagation()
        const meal = e.currentTarget.getAttribute('mealid')
        const mealInfo = await this.getMealByID(meal)
        for (var i = 0; i < 20; i++) {
            if (mealInfo['meals'][0]['strIngredient' + i]) {
                this.setState({ mealIngredients: [...this.state.mealIngredients, mealInfo['meals'][0]['strIngredient' + i] + " - " + mealInfo['meals'][0]['strMeasure' + i]] })
            }
        }
        this.setState({ clickedMealInfo: mealInfo })
        this.setState({ showmealInfo: true })
    }

    render() {

        return (

            <div className="dish-full">
                <div className="mobile-container">
                    <header>
                        <input id="searchText" type="text"></input>
                        <button onClick={this.getMealBySearch} id="search" className="fas fa-search"></button>
                    </header>
                    <div className="fav-container">
                        <h3>Favorite Dishes</h3>
                        <ul onClick={this.scrollBar} className="fav-meals">
                            <ListFav {...this.state} removeFav={this.removeFav} getMealsFromLS={this.getMealsFromLS} loadMealInfo={this.loadMealInfo} />
                        </ul>
                    </div>




                    <div className="meals">
                        <div className="meal">
                            <div className="meal-header">
                                <span className="random">Random Recipe</span>
                                <img mealid={this.state.currentRandomMeal} onClick={this.loadMealInfo} src={this.state.randomMealImg}></img>
                            </div>
                            <div className="meal-body">
                                <h4>{this.state.randomMealName}</h4>
                                <button className={`fav-btn`} onClick={this.doFavorite}><i className="fas fa-heart"></i></button>
                            </div>
                            <Meals {...this.state} doFavorite={this.doFavorite} loadMealInfo={this.loadMealInfo} ></Meals>
                        </div>

                    </div>
                </div>
                {this.state.showmealInfo && this.state.clickedMealInfo ?
                    <div className="meal-info-container" display='none'>
                        <div className="meal-info">
                            <button onClick={this.closePopup} className="close-popup"><i className="fas fa-window-close"></i></button>
                            <div>
                                <h1>{this.state.clickedMealInfo['meals'][0]['strMeal']}</h1>
                                <img src={this.state.clickedMealInfo['meals'][0]['strMealThumb']}></img>
                            </div>
                            <div>
                                <p>{this.state.clickedMealInfo['meals'][0]['strInstructions']}
                                </p>
                                <h3>Ingredients: </h3>
                                <ul>
                                    {
                                        this.state.mealIngredients.map((ing, i) => {
                                            return <li key={i}>{ing}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>


        )
    }
} */

export default App;