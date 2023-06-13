import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import Home from './Dashboard/Home';
import Splash from './Splash';

const stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen name="Welcome" component={WelcomeScreen} />
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="Signup" component={SignupScreen} />
        <stack.Screen name="Home" component={Home} />
        <stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
