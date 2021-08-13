import { RECIPES, RECIPE_DETAILS, ADD_RECIPE } from '../actions/Recipes';

const initialState = {
    recipes: [],
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