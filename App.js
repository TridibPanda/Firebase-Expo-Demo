import React from 'react';
import { createStore, combineReducers, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import RecipesReducer from './store/reducers/Recipes';
import AuthReducer from './store/reducers/Auth';

const rootReducer = combineReducers({
  auth: AuthReducer,
  recipes: RecipesReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

