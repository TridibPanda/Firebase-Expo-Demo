import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import InitialScreen from '../screens/InitialScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {

  const userId = useSelector(state => state.auth.uid);
  const isloggedIn = useSelector(state => state.auth.isloggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {userId ? <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
          : !isloggedIn ? <Stack.Screen
            name="InitialScreen"
            component={InitialScreen}
            options={{
              headerShown: false,
              animationTypeForReplace: userId ? 'pop' : 'push',
            }}
          /> :
            <>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerShown: false,
                  animationTypeForReplace: userId ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{
                  headerShown: false,
                  animationTypeForReplace: userId ? 'pop' : 'push',
                }}
              />
            </>
        }
        <Stack.Screen
          name="RecipeDetailsScreen"
          component={RecipeDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddRecipeScreen"
          component={AddRecipeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );

}
export default AppNavigator;