import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//Screens
import HomeScreen from '../screens/Home';
import Login from '../screens/Login';
import tweets from '../screens/tweets';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="tweets" component={tweets} />
    </Stack.Navigator>
  );
}

export default MyStack;
