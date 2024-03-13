//*GLOBALS*//

const navElement = document.getElementById('navigation');
const myRecipes = document.getElementById('recipes');

//*PAGE LOAD*//

getCategoryData()

/*MODEL CODE---------------------------------------------------------------------------------------------------*/

// function getRecipeData() {
//     fetch('')
        
//         .then(response => response.json())
    
// }

//Create function for receiving the database data.
// function getCategoryData() {
//     //Fetching the database.
//     fetch('www.themealdb.com/api/json/v1/1/categories.php')

//         //Convert the response to JSON format.
//         .then(res => res.json())

//         //Pass JSON to the receiveCategoryData function.
//         .then(json => receiveCategoryData(json));
// }

function getCategoryData() {
    // Fetching the database.
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
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


/*CONTROLLER CODE--------------------------------------------------------------------------------------------*/

function receiveCategoryData(categoryData) {
    console.log(categoryData);

    categoryData.forEach((category) => {
        console.log(category.strCategory);
    })

    createNavBar(categoryData);
}


/*VIEW CODE--------------------------------------------------------------------------------------------*/

function createNavBar(myCategories) {

    let myHTML = `<button onclick=navCallBack('all')>All Categories</button>`;
    
    myCategories.forEach((category) => {
        let categoryElements = `<button>${category.strCategory}</button>`;

        myRecipes.innerHTML += categoryElements;
    })

}