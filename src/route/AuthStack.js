import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Auth/splash';
import IntroSlides from '../screens/Auth/introslides';
import Disclamer from '../screens/Auth/disclamer';
import SelectLanguage from '../screens/Auth/selectlang';
import Login from '../screens/Auth/login';
import Signup from '../screens/Auth/signup';
import Slide2 from '../screens/Auth/introslides/Slide2';
import Slide3 from '../screens/Auth/introslides/Slide3';
import OTP from '../screens/Auth/otp';

const Stack = createNativeStackNavigator();

const AuthStack = ({onBoarding}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={onBoarding ? 'Login' : 'IntroSlides'}>
      <Stack.Screen name="IntroSlides" component={IntroSlides} />
      <Stack.Screen name="Slide3" component={Slide3} />
      <Stack.Screen name="Slide2" component={Slide2} />
      {/* Slide3 */}
      <Stack.Screen name="Disclamer" component={Disclamer} />
      <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />

      <Stack.Screen name="OTP" component={OTP} />
      {/*  */}
    </Stack.Navigator>
  );
};

export default AuthStack;
