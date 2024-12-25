import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
  Keyboard,
  Platform,
  PermissionsAndroid,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import st from '../../../global/styles';
import {colors, images} from '../../../global/theme';
import {useTranslation} from 'react-i18next';
import Input from '../../../components/input';
import Button from '../../../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../../../redux/reducers/Login';
import AuthHeader from '../../../components/Auth_Header';
import MansaImg from '../../../components/mansa';
import {setAdminFlow} from '../../../redux/reducers/Adminflow';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import {API} from '../../../utils/endpoints';
import {postApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import {setRole} from '../../../redux/reducers/Role';
import {ValidateMobile} from '../../../utils/helperfunctions/validations';
import {setLocation} from '../../../redux/reducers/location';
import {View} from 'react-native-animatable';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIALINPUT = {
  userNumber: '',
};

const Login = ({navigation}) => {
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState();

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const onBoarding = useSelector(state => state.Onboarding?.data);
  const locationData = useSelector(state => state.location?.data);
  let watchID;
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const isAndroid = Platform.OS == 'android' ? true : false;

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    Keyboard.dismiss();
    const validNumber = ValidateMobile(inputs?.userNumber, t);
    let isValid = true;

    if (validNumber != 'success') {
      handleError(validNumber, 'userNumber');
      isValid = false;
    } else {
      handleError('', 'userNumber');
    }

    if (isValid) {
      handleSubmitPress();
    }
  };

  const backAction = () => {
    let exit_msg = t('Hold');
    let exit_title = t('exit');
    Alert.alert(exit_msg, exit_title, [
      {
        text: t('Cancel'),
        onPress: () => null,
        style: 'cancel',
      },
      {text: t('Yes'), onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  const handleSubmitPress = async () => {
    console.log({inputs});
    const url = `${API.LOGIN}`; //${inputs?.userNumber}`;
    const param = {
      contact: inputs?.userNumber,
      deviceToken: fcmToken,
      isAndroid: isAndroid,
    };
    console.log({url, param});
    try {
      setIsLoading(true);
      const result = await postApi(url, param);
      // console.log({result: result.status});
      if (result?.status == 202) {
        const data = result.data;
        // console.log({data});
        navigation.navigate('OTP', {phone: inputs?.userNumber});
        const roledata = {
          id: 1,
          name: 'user',
          active: true,
          description: '',
        };
        dispatch(setRole(roledata));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }

    // navigation.navigate('OTP', {phone: inputs?.userNumber});
    // const roledata = {
    //   id: 1,
    //   name: 'user',
    //   active: true,
    //   description: '',
    // };
    // dispatch(setRole(roledata));
  };

  useEffect(() => {
    getfirebaseToken();
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: t('LocationRequired'),
              message: t('needsToAccess'),
              buttonNeutral: t('AskLater'),
              buttonNegative: t('Cancel'),
              buttonPositive: t('Yes'),
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');
        console.log({position});
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
        getCurrentAddress(position.coords.latitude, position.coords.longitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  const getCurrentAddress = (Latitude, Longitude) => {
    var NY = {
      lat: Latitude,
      lng: Longitude,
    };
    Geocoder.geocodePosition(NY)
      .then(res => {
        // console.log({res: res[0]});
        if (res) {
          dispatch(setLocation(res[0]));
        }
      })
      .catch(err => console.log(err));
  };

  const getfirebaseToken = async () => {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('new genrated token', fcmtoken);
        await AsyncStorage.setItem('token', fcmtoken);
        setFcmToken(fcmtoken);
      } else {
        console.warn(
          'Failed to generate FCM token. Token is null or undefined.',
        );
      }
    } catch (e) {
      console.error('Error while fetching FCM token:', e);

      // Optional: Handle specific errors
      if (e.code === 'messaging/service-not-available') {
        console.warn('FCM Service not available. Retrying...');
        // You could add a retry mechanism here if needed.
      }
    }
  };

  const guestUserLogin = async () => {
    const url = `${API.GUEST_LOGIN}`;
    const param = {
      location: locationData?.locality,
      deviceToken: fcmToken,
      isAndroid: isAndroid,
    };
    console.log({param});
    try {
      setIsLoading(true);
      const result = await postApi(url, param);
      if (result?.status == 200) {
        const data = result.data;
        console.log({guestUserLogin: data});
        dispatch(setLogin(true));
        const roledata = {
          id: 2,
          name: 'guest',
          active: true,
          description: '',
        };
        dispatch(setRole(roledata));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  return (
    <View style={st.container}>
      <AuthHeader
        title={t('LOGIN')}
        onBack={() => {
          if (navigation.canGoBack()) navigation.goBack();
          else backAction();
        }}
        auth={true}
        // user={true}
        // gotoAdmin={() => dispatch(setAdminFlow(true))}
      />
      <ScrollView>
        <View style={st.pd20} animation={'fadeInRight'} delay={300}>
          <View>
            <Input
              placeholder={t('ENTERMOBILE')}
              onChangeText={text => handleOnchange(text, 'userNumber')}
              onFocus={() => handleError(null, 'userNumber')}
              maxLength={10}
              error={errors?.userNumber}
              iconName={images.mobile}
              label={t('MOBILE')}
              keyboardType={'phone-pad'}
              value={inputs.userNumber}
            />
          </View>

          <Button
            title={t('SUBMIT')}
            backgroundColor={colors.lightBlue}
            color={colors.white}
            onPress={() => {
              validation();
            }}
          />

          <View style={[st.align_C, {marginVertical: '10%'}]}>
            <View style={[st.box, {zIndex: 999}]}>
              <Text
                style={[
                  st.tx18,
                  st.txAlignC,
                  {marginTop: 3, color: colors.black},
                ]}>
                {t('OR')}
              </Text>
            </View>
            <View
              style={[
                st.seprator,
                {width: '100%', position: 'absolute', top: 15},
              ]}
            />
          </View>

          <TouchableOpacity
            onPress={() => guestUserLogin()}
            style={[styles.gustBtn, st.row, st.align_C, st.mt_t10]}>
            <Image source={images.guest} />
            <View style={{marginLeft: '15%'}}>
              <Text style={[st.tx14, st.txAlignC, {color: colors.black}]}>
                {t('GUEST')}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={[
              st.black_box,
              {flex: null, marginTop: '4%', backgroundColor: colors.lightBlue},
            ]}>
            <Text style={[st.tx14, st.txAlignC, st.txbold, {letterSpacing: 1}]}>
              {t('LOGIN_CON')}
            </Text>
          </View>
          <View
            style={[
              st.tringle,
              {
                marginTop: -8,
                marginLeft: '22%',
                borderBottomColor: colors.lightBlue,
                transform: [{rotate: '-60deg'}],
              },
            ]}
          />
          <View style={st.mt_t10} />
          <MansaImg />
        </View>
      </ScrollView>

      {isLoading && <Loader />}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  gustBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
});
