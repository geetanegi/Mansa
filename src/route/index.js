import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HandleBackPress from '../components/BackPressHandle';
// import analytics from '@react-native-firebase/analytics';
import Splash from '../screens/Auth/splash';
import AdminHomeStack from '../screens/adminpanel/route/HomeStack';
import AdminAuthStack from '../screens/adminpanel/route/AuthStack';
import NetworkStatus from '../components/networkInfo';
const Route = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const login_data = useSelector(state => state.login?.data);
  const tour_data = useSelector(state => state.tour?.data);
  const admin_flow = useSelector(state => state.adminFlow?.data);
  const adminLogin = useSelector(state => state.adminLogin?.data);
  const onBoarding = useSelector(state => state.Onboarding?.data);
  const profileData = useSelector(state => state.profile?.data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // HandleBackPress();

  return (
    <NavigationContainer fallback={<ActivityIndicator />}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      {isLoading ? (
        <Splash />
      ) : admin_flow ? (
        adminLogin ? (
          <AdminHomeStack />
        ) : (
          <AdminAuthStack />
        )
      ) : login_data ? (
        <HomeStack tour_data={tour_data} profileData={profileData} />
      ) : (
        <AuthStack onBoarding={onBoarding} />
      )}
      <NetworkStatus/>
    </NavigationContainer>
  );
};

export default Route;
