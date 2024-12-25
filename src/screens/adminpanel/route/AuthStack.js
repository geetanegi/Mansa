import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminLogin from '../auth/login';
import AdminSignUp from '../auth/signup';
import Forgot from '../auth/forgot';
import OTP from '../auth/otp';
import RecoverPass from '../auth/recover';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='AdminLogin' >
      <Stack.Screen name="AdminLogin" component={AdminLogin} />
      <Stack.Screen name="AdminSignUp" component={AdminSignUp} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="RecoverPass" component={RecoverPass} />
    </Stack.Navigator>
  );
};

export default AuthStack;
