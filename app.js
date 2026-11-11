const container = document.getElementById("recipes");
const message = document.getElementById("message");
const searchInput = document.getElementById("search");
const cuisineSelect = document.getElementById("cuisine");

let allRecipes = [];

// Get recipes from API
async function loadRecipes() {
    try {
        const response = await fetch("https://dummyjson.com/recipes?limit=0");

        if (!response.ok) {
            throw new Error("Failed to load recipes");
        }

        const data = await response.json();

        allRecipes = data.recipes;

        message.textContent = "";

        loadCuisines();
        filterRecipes();

    } catch (error) {
        message.textContent = "Error loading recipes.";
        console.error(error);
    }
}

// Fill cuisine dropdown
function loadCuisines() {
    const cuisines = [...new Set(allRecipes.map(recipe => recipe.cuisine))];

    cuisines.forEach(cuisine => {
        const option = document.createElement("option");

        option.value = cuisine;
        option.textContent = cuisine;

        cuisineSelect.appendChild(option);
    });
}

// Filter by name and cuisine
function filterRecipes() {
    const search = searchInput.value.toLowerCase();
    const cuisine = cuisineSelect.value;

    const filtered = allRecipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(search);
        const matchesCuisine = cuisine === "" || recipe.cuisine === cuisine;

        return matchesSearch && matchesCuisine;
    });

    displayRecipes(filtered);
}

// Display recipe cards
function displayRecipes(recipes) {
    container.innerHTML = "";

    if (recipes.length === 0) {
        message.textContent = "No recipes found.";
        return;
    }

    message.textContent = "";

    recipes.forEach(recipe => {
        const column = document.createElement("div");
        column.className = "col-md-4";

        const card = document.createElement("div");
        card.className = "card h-100";

        const image = document.createElement("img");
        image.src = recipe.image;
        image.alt = recipe.name;
        image.className = "card-img-top";

        const body = document.createElement("div");
        body.className = "card-body";

        const title = document.createElement("h5");
        title.textContent = recipe.name;

        const cuisine = document.createElement("p");
        cuisine.textContent = recipe.cuisine;

        // Button to open recipe details
        const button = document.createElement("a");
        button.href = `recipe.html?id=${recipe.id}`;
        button.className = "btn btn-primary";
        button.textContent = "View Recipe";

        body.append(title, cuisine, button);
        card.append(image, body);
        column.appendChild(card);
        container.appendChild(column);
    });
}

searchInput.addEventListener("input", filterRecipes);
cuisineSelect.addEventListener("change", filterRecipes);

loadRecipes();