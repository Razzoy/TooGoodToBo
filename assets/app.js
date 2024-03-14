//*GLOBALS*//
const searchbarElement = document.getElementById("search_bar");
const searchIcon = document.getElementById("search-icon");
const navElement = document.getElementById("navigation");
const myRecipes = document.getElementById("recipes");

//*PAGE LOAD*//

getCategoryData();
getRecipeData();

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
      console.log("Error fetching product data:", error);
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
      //   receiveCategoryData(data.categories); // Call the appropriate function with the data
    })
    .catch((error) => {
      console.log("Error fetching category data:", error);
    });
}

/*CONTROLLER CODE--------------------------------------------------------------------------------------------*/

//Calls the searchForRecipe function when the user clicks on the search icon
searchIcon.addEventListener("click", searchForRecipe);

//Old code that ran on enter click
// searchbarElement.addEventListener("keydown", function(key) {
//     if (key.keyCode === 13) {
//         searchForRecipe();
//     }
// });

function searchForRecipe() {
  /*Gets the value from the search bar and 
    places it into the recipeSearch variable
     & sends it to the getRecipeData function */
  const recipeSearch = searchbarElement.value.trim();
  if (recipeSearch === "") {
    console.log("No Recipes found");
  }
  getRecipeData(recipeSearch);
}

function receiveCategoryData(categoryData) {
  console.log(categoryData);

  categoryData.forEach((category) => {
    console.log(category.strCategory);
  });

  createNavBar(categoryData);
}

function receivedRecipeData(productData) {
  console.log(productData);
}

/*VIEW CODE--------------------------------------------------------------------------------------------*/

//Category Navigation
function createNavBar(myCategories) {
  let myHTML = `<button onclick=navCallBack('all')>All Categories</button>`;

  myCategories.forEach((category) => {
    let categoryElements = `<button>${category.strCategory}</button>`;

    myRecipes.innerHTML += categoryElements;
  });
}
