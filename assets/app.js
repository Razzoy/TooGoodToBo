//*GLOBALS*//
const searchbarElement = document.getElementById("search_bar");
const searchIcon = document.getElementById("search-icon");
const navElement = document.getElementById("navigation");
const myRecipes = document.getElementById("recipes");
const recipeCategories = document.getElementById("recipe-categories");

let myMeals = null;

//*PAGE LOAD*//

getCategoryData();
getRecipeData();
getRecipeCategoryData();

/*MODEL CODE---------------------------------------------------------------------------------------------------*/

function getRecipeData(searchedRecipe) {
  //Gets the paramenter from searchForRecipe and uses it in the template string
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedRecipe}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      receivedRecipeData(json.meals);
    })
    .catch((error) => {
      console.log("Error fetching recipe data:", error);
    });
}

function getRecipeCategoryData(selectedCategory) {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedCategory}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      receivedRecipeData(json.meals);
    })
    .catch((error) => {
      console.log("Error fetching recipe data:", error);
    });
}

//#region old category code
//Create function for receiving the database data.
// function getCategoryData() {
//     //Fetching the database.
//     fetch('www.themealdb.com/api/json/v1/1/categories.php')

//         //Convert the response to JSON format.
//         .then(res => res.json())

//         //Pass JSON to the receiveCategoryData function.
//         .then(json => receiveCategoryData(json));
// }
//#endregion old code

function getCategoryData() {
  // Fetching the database.
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
     receiveCategoryData(data.categories); // Call the appropriate function with the data
    })
    .catch((error) => {
      console.log("Error fetching category data:", error);
    });
}

//Gets local storage
function getLocalStorage(key) {
  let localData = localStorage.getItem(key);
  return JSON.parse(localData || "[]");
}

//Saves to local storage
function setLocalStorage(key, value) {
  let serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
}



/*CONTROLLER CODE--------------------------------------------------------------------------------------------*/

//Calls the searchForRecipe function when the user clicks on the search icon
searchIcon.addEventListener("click", searchForRecipe);

// #region Old code that ran on enter click
// searchbarElement.addEventListener("keydown", function(key) {
//     if (key.keyCode === 13) {
//         searchForRecipe();
//     }
// });
// #endregion

function searchForRecipe() {
  /*Gets the value from the search bar and 
    places it into the recipeSearch variable
     & sends it to the getRecipeData function */
  const recipeSearch = searchbarElement.value.trim();
  if (recipeSearch === "") {
    console.log("No Recipes found");
    return;
  }
  getRecipeData(recipeSearch);

  //Saves the variable to local storage
  setLocalStorage("recipeSearchHistory", recipeSearch);
}

function selectCategory(clickedCategory) {
  console.log(clickedCategory);
  
}

function receiveCategoryData(categoryData) {
  console.log(categoryData);

  categoryData.forEach((category) => {
    console.log(category.strCategory);
  });

  createNavBar(categoryData);
}

function receivedRecipeData(mealData) {
  console.log(mealData);
  myMeals = mealData;
  createMealCards(myMeals);
}

//WIP//

function mealCallBack(myId) {

  let myClickedMeal = null

  myMeals.forEach(meal => {
      if (meal.idMeal == myId) {
          myClickedMeal = meal;
      }
  });

  if (myClickedMeal == null) {
      alert('There is no meals!')
  } else {
      clearApp();
      buildMeal(myClickedMeals);
  }
}



/*VIEW CODE---------  -----------------------------------------------------------------------------------*/

//Category Navigation
function createNavBar(myCategories) {
  let myHTML = `<button onclick=navCallBack('all')>All Categories</button>`;

  myCategories.forEach((category) => {
    let categoryElements = `<button class="category-btn" onclick="selectCategory(${category.idCategory})">${category.strCategory}</button>`;

    recipeCategories.innerHTML += categoryElements;
  });
}

function showSearchHistory(searchHistory) {
  let searchedRecipe = searchHistory
  searchedRecipe = getLocalStorage("recipeSearchHistory");

  searchedRecipe.forEach((searchedElement) => {
    console.log(searchedElement);
  });
}

function createMealCards(myCards) {

  clearApp();

  myCards.forEach(meal => {


      let myRecipeCard = `<figure onclick="mealCallBack(${meal.idMeal})"><img src="${meal.strMealThumb}"><h2>${meal.strMeal}</h2>`

      myRecipes.innerHTML += myRecipeCard;
  });
}

//WIP//

function buildMeal(meals) {
  let imageHTML = '';

  // Gennemgå hvert billede i product.images arrayet
  meal.strMealThumb.forEach((image, index) => {
      // Tilføj en klasse til det første billede
      let isFirstImage = index === 0 ? 'first-image' : '';
      // Opret HTML-markup for billedet og tilføj den til imageHTML
      imageHTML += `<img src="${image}" class="${isFirstImage}">`
  })

  let myHTML = `<figure class = "MealDetails" onclick = "GetMealData()"> <h2>${Meal.title}</h2>${imageHTML} <p>${Meal.description}</p> </figure>`


  myRecipes.innerHTML = myHTML;

  // Fjern display: grid fra #featuredProducts
  
}

function clearApp() {
  myRecipes.innerHTML = '';
}