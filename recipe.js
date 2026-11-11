const container = document.getElementById("recipe");
const message = document.getElementById("message");

// Get recipe ID from URL
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

async function loadRecipe() {
    if (!recipeId) {
        message.textContent = "No recipe selected.";
        return;
    }

    try {
        const response = await fetch(
            `https://dummyjson.com/recipes/${recipeId}`
        );

        if (!response.ok) {
            throw new Error("Recipe not found");
        }

        const recipe = await response.json();

        message.textContent = "";

        // Recipe title
        const title = document.createElement("h1");
        title.textContent = recipe.name;

        // Recipe image
        const image = document.createElement("img");
        image.src = recipe.image;
        image.alt = recipe.name;
        image.className = "img-fluid rounded mb-3";
        image.style.maxWidth = "400px";

        // Cuisine
        const cuisine = document.createElement("p");
        cuisine.textContent = `Cuisine: ${recipe.cuisine}`;

        // Cooking time
        const time = document.createElement("p");
        time.textContent =
            `Total time: ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutes`;

        // Ingredients heading
        const ingredientsTitle = document.createElement("h3");
        ingredientsTitle.textContent = "Ingredients";

        // Ingredients list
        const ingredients = document.createElement("ul");

        recipe.ingredients.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ingredients.appendChild(li);
        });

        // Instructions heading
        const instructionsTitle = document.createElement("h3");
        instructionsTitle.textContent = "Instructions";

        // Instructions list
        const instructions = document.createElement("ol");

        recipe.instructions.forEach(step => {
            const li = document.createElement("li");
            li.textContent = step;
            instructions.appendChild(li);
        });

        container.append(
            title,
            image,
            cuisine,
            time,
            ingredientsTitle,
            ingredients,
            instructionsTitle,
            instructions
        );

    } catch (error) {
        message.textContent = "Could not load recipe.";
        console.error(error);
    }
}

loadRecipe();