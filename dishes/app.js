import React, { useCallback, useEffect, useState } from "react";
import "./app.css";
import ListFav from "./listFav";
import Meals from "./meals";

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
        currentRandomMeal: "",
    });
    const [firstRun, set_firstRun] = useState(true);

    //Checks if meal is already in favorites
    const checkIfFavorite = useCallback(() => {
        state.mealList.map((meals) => {
            const btns = document.getElementsByClassName("fav-btn");
            const arrColl = [...btns];
            return arrColl.map((b) => {
                if (meals["meals"][0]["idMeal"] === b.getAttribute("mealid")) {
                    return b.classList.add("active");
                } else {
                    return false;
                }
            });
        });
    }, [state]);
    useEffect(() => {
        //Gets meals from localstorage
        async function getMealsTolist() {
            return new Promise(async (resolve) => {
                const meals = await getMealsFromLS();
                await Promise.all(
                    meals.map(async (meal) => {
                        const a = await getMealByID(meal);
                        setState((old) => ({
                            ...old,
                            mealList: [...old.mealList, a],
                        }));
                    })
                );
                resolve();
            });
        }

        //Gets meals from themealdb api
        async function getRandomMeal() {
            fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                .then((res) => res.json())
                .then((data) => {
                    const randomMeal = data["meals"][0];
                    setState((old) => ({
                        ...old,
                        randomMeal: data,
                        randomMealImg: randomMeal["strMealThumb"],
                        randomMealName: randomMeal["strMeal"],
                        currentRandomMeal: randomMeal["idMeal"],
                    }));
                });
        }

        if (firstRun) {
            getRandomMeal();
            getMealsTolist().then(() => {
                checkIfFavorite();
            });
            set_firstRun(false);
        }
    }, [checkIfFavorite, firstRun]);

    //Gets current favorite meals from localstorage
    async function getMealsFromLS() {
        const mealIDs = JSON.parse(localStorage.getItem("mealIDs"));
        return mealIDs === null ? [] : mealIDs;
    }
    //Get meal by mealID
    async function getMealByID(id) {
        const res = await fetch(
            "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
        );
        const searchData = await res.json();
        return searchData;
    }

    //Search for meal
    async function getMealBySearch() {
        const searchInput = document.getElementById("searchText");
        const res = await fetch(
            "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
                searchInput.value
        );
        const searchRes = await res.json();
        setState((old) => ({ ...old, searchResult: searchRes }));
        checkIfFavorite();
    }

    //Remove favorite dish
    async function removeFav(meal) {
        const mealIDs = await getMealsFromLS();
        localStorage.setItem(
            "mealIDs",
            JSON.stringify(mealIDs.filter((meals) => meals !== meal))
        );

        setState((old) => ({
            ...old,
            mealList: state.mealList.filter(
                (meals) => meals["meals"][0]["idMeal"] !== meal
            ),
        }));
    }

    //Gets meal info when clicked into meal
    async function loadMealInfo(e) {
        e.stopPropagation();
        const meal = e.currentTarget.getAttribute("mealid");
        const mealInfo = await getMealByID(meal);
        for (var i = 0; i < 20; i++) {
            if (mealInfo["meals"][0]["strIngredient" + i]) {
                const ingre = `strIngredient${i}`;
                const measure = `strMeasure${i}`;
                setState((old) => ({
                    ...old,
                    mealIngredients: [
                        ...old.mealIngredients,
                        mealInfo["meals"][0][ingre] +
                            " - " +
                            mealInfo["meals"][0][measure],
                    ],
                }));
            }
        }

        setState((old) => ({ ...old, clickedMealInfo: mealInfo }));
        setState((old) => ({ ...old, showmealInfo: true }));
    }
    //Favorite dish
    async function doFavorite(e) {
        e.persist();
        const mealid = e.currentTarget.getAttribute("mealid");
        if (!e.currentTarget.className.includes("active")) {
            e.currentTarget.classList.add("active");

            const mealIDs = await getMealsFromLS();
            const meal = await getMealByID(mealid);
            setState((old) => ({
                ...old,
                mealList: [...state.mealList, meal],
            }));

            localStorage.setItem(
                "mealIDs",
                JSON.stringify([...mealIDs, mealid])
            );
        } else {
            e.currentTarget.classList.remove("active");

            const mealIDs = await getMealsFromLS();
            localStorage.setItem(
                "mealIDs",
                JSON.stringify(mealIDs.filter((meals) => meals !== mealid))
            );

            setState((old) => ({
                ...old,
                mealList: state.mealList.filter((meal) => {
                    return meal["meals"][0]["idMeal"] !== mealid;
                }),
            }));
        }
    }
    //Close meal info popup
    function closePopup() {
        setState((old) => ({ ...old, showmealInfo: false }));
        setState((old) => ({ ...old, mealIngredients: [] }));
        setState((old) => ({ ...old, clickedMealInfo: null }));
    }

    return (
        <div className="mid_con">
            <div className="dishes_container">
                <header className="dishes_head">
                    <input
                        id="searchText"
                        type="text"
                        className="search_input"
                        autoComplete="off"
                    ></input>
                    <button
                        onClick={getMealBySearch}
                        id="search"
                        className="fas fa-search search_button"
                    ></button>
                </header>

                <div className="fav_container">
                    <h3 className="select_false">Saved Recipes</h3>
                    <ul
                        className="fav_meals_ul"
                        onWheel={(e) => {
                            if (e.target.nodeName === "LI") {
                                e.target.parentNode.scrollLeft += e.deltaY;
                            } else {
                                e.target.offsetParent.parentNode.scrollLeft +=
                                    e.deltaY;
                            }
                        }}
                    >
                        <ListFav
                            {...state}
                            removeFav={removeFav}
                            getMealsFromLS={getMealsFromLS}
                            loadMealInfo={loadMealInfo}
                        />
                    </ul>
                </div>

                <div className="meal">
                    <div className="meal_header">
                        <span className="random_meal">Random Recipe</span>
                        <img
                            className="meal_img"
                            mealid={state.currentRandomMeal}
                            onClick={loadMealInfo}
                            src={state.randomMealImg}
                            onLoad={(e) =>
                                (e.target.style.visibility = "visible")
                            }
                            alt="random meal"
                        ></img>
                    </div>
                    <div className="name_container">
                        <h4 className="margin_0">{state.randomMealName}</h4>
                        <button
                            mealid={state.currentRandomMeal}
                            className={`favorite_button`}
                            onClick={doFavorite}
                        >
                            <i className="fas fa-heart"></i>
                        </button>
                    </div>
                    <Meals
                        {...state}
                        doFavorite={doFavorite}
                        loadMealInfo={loadMealInfo}
                    ></Meals>
                </div>
            </div>
            {state.showmealInfo && state.clickedMealInfo && (
                <div className="meal_info_container" display="none">
                    <div className="meal_info">
                        <button onClick={closePopup} className="close_popup">
                            <i className="fas fa-window-close"></i>
                        </button>
                        <div>
                            <h1 className="text_center">
                                {state.clickedMealInfo["meals"][0]["strMeal"]}
                            </h1>
                            <img
                                className="image_fit"
                                src={
                                    state.clickedMealInfo["meals"][0][
                                        "strMealThumb"
                                    ]
                                }
                                alt="meal"
                            ></img>
                        </div>
                        <div>
                            <p>
                                {
                                    state.clickedMealInfo["meals"][0][
                                        "strInstructions"
                                    ]
                                }
                            </p>
                            <h3>Ingredients: </h3>
                            <ul>
                                {state.mealIngredients.map((ing, i) => {
                                    return <li key={i}>{ing}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
