import { RECIPES, RECIPE_DETAILS, ADD_RECIPE } from '../actions/Recipes';
const Recipes = [
    {
        recipeName: 'Chat',
        ingredients: 'Chat chat',
        direction: 'chat',
        uid: 'u1',
        image: 'https://da-software.net/wp-content/uploads/2020/01/blog-da-software-maxlength-en.jpg',
        recipeId: `1`
    },
    {
        recipeName: 'Tea',
        ingredients: 'Chat chat',
        direction: 'chat',
        uid: 'u2',
        image: 'https://da-software.net/wp-content/uploads/2020/01/blog-da-software-maxlength-en.jpg',
        recipeId: `2`
    },
    {
        recipeName: 'Coffee',
        ingredients: 'Chat chat',
        direction: 'What follows within the Fundamentals section of this documentation is a tour of the most important aspects of React Navigation. It should cover enough for you to know how to build your typical small mobile application, and give you the background that you need to dive deeper into the more advanced parts of React Navigation.',
        uid: 'u1',
        image: 'https://da-software.net/wp-content/uploads/2020/01/blog-da-software-maxlength-en.jpg',
        recipeId: `3`
    },
    {
        recipeName: 'Chat',
        ingredients: 'Chat chat',
        direction: 'chat',
        uid: 'u1',
        image: 'https://da-software.net/wp-content/uploads/2020/01/blog-da-software-maxlength-en.jpg',
        recipeId: `4`
    },
    {
        recipeName: 'Tea',
        ingredients: 'Chat chat',
        direction: 'chat',
        uid: 'u2',
        image: 'https://da-software.net/wp-content/uploads/2020/01/blog-da-software-maxlength-en.jpg',
        recipeId: `5`
    },
    {
        recipeName: 'Coffee',
        ingredients: 'Chat chat',
        direction: 'What follows within the Fundamentals section of this documentation is a tour of the most important aspects of React Navigation. It should cover enough for you to know how to build your typical small mobile application, and give you the background that you need to dive deeper into the more advanced parts of React Navigation.',
        uid: 'u1',
        image: 'https://da-software.net/wp-content/uploads/2020/01/blog-da-software-maxlength-en.jpg',
        recipeId: `6`
    }
]

const initialState = {
    recipes: Recipes,
    recipe:{}
  };

  const RecipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECIPES:
            return {recipes: action.recipes,recipe: {}};
        case ADD_RECIPE:
            return {...state, recipes:state.recipes.concat(action.addRecipe)};
        case RECIPE_DETAILS:
            const details = state.recipes.find(recipe => recipe.recipeId === action.recipeId);
            return {...state,recipe:details};
        default:
            return state;
    }
  };
  
  export default RecipesReducer;