// Recipe data
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad"
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles"
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza"
    }
];

// State management
let currentFilter = 'all';
let currentSort = 'none';

// DOM Selection
const recipeContainer = document.querySelector('#recipe-container');
const filterButtons = document.querySelectorAll('[data-filter]');
const sortButtons = document.querySelectorAll('[data-sort]');

// Function to create HTML for a single recipe card
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>
        </div>
    `;
};

// Function to render recipes to the DOM
const renderRecipes = (recipesToRender) => {
    const recipeCardsHTML = recipesToRender
        .map(createRecipeCard)
        .join('');

    recipeContainer.innerHTML = recipeCardsHTML;
};

// Pure filter functions
const filterByDifficulty = (recipesArray, difficulty) => {
    return recipesArray.filter(recipe => recipe.difficulty === difficulty);
};

const filterByTime = (recipesArray, maxTime) => {
    return recipesArray.filter(recipe => recipe.time < maxTime);
};

const applyFilter = (recipesArray, filterType) => {
    switch (filterType) {
        case 'easy':
            return filterByDifficulty(recipesArray, 'easy');
        case 'medium':
            return filterByDifficulty(recipesArray, 'medium');
        case 'hard':
            return filterByDifficulty(recipesArray, 'hard');
        case 'quick':
            return filterByTime(recipesArray, 30);
        case 'all':
        default:
            return recipesArray;
    }
};

// Pure sort functions
const sortByName = (recipesArray) => {
    return [...recipesArray].sort((a, b) => a.title.localeCompare(b.title));
};

const sortByTime = (recipesArray) => {
    return [...recipesArray].sort((a, b) => a.time - b.time);
};

const applySort = (recipesArray, sortType) => {
    switch (sortType) {
        case 'name':
            return sortByName(recipesArray);
        case 'time':
            return sortByTime(recipesArray);
        case 'none':
        default:
            return recipesArray;
    }
};

// Update active button states
const updateActiveButtons = () => {
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        }
    });

    sortButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.sort === currentSort) {
            btn.classList.add('active');
        }
    });
};

// Main update function
const updateDisplay = () => {
    let recipesToDisplay = recipes;

    recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
    recipesToDisplay = applySort(recipesToDisplay, currentSort);

    renderRecipes(recipesToDisplay);
    updateActiveButtons();

    console.log(`Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`);
};

// Event handlers
const handleFilterClick = (event) => {
    currentFilter = event.target.dataset.filter;
    updateDisplay();
};

const handleSortClick = (event) => {
    currentSort = event.target.dataset.sort;
    updateDisplay();
};

// Set up event listeners
const setupEventListeners = () => {
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    sortButtons.forEach(button => {
        button.addEventListener('click', handleSortClick);
    });
};

// Initialize app
setupEventListeners();
updateDisplay();
