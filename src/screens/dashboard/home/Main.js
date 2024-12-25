import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
  Linking,
  AppState,
  Platform,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Header from '../../../components/Header';
import st from '../../../global/styles';
import {colors, images} from '../../../global/theme';
import Footer from '../../../components/footer';
import {useTranslation, I18n} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import DialText from '../../../components/dialPad';
import DeviceInfo from 'react-native-device-info';
import {API} from '../../../utils/endpoints';
import {getApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import {
  requestUserPermission,
  notificationListner,
} from '../../../notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VersionCheck from 'react-native-version-check';
import messaging from '@react-native-firebase/messaging';

const Home = ({navigation, route}) => {
  const {t} = useTranslation();
  const [greet, setGreet] = useState('');

  const profileData = useSelector(state => state.profile?.data);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const getfirebaseToken = async () => {
    try {
      const fcmtoken = await AsyncStorage.getItem('token');
      return fcmtoken;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    requestUserPermission();
    // notificationListner();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        checkForUpdates();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // Handle foreground notification
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { notification, data } = remoteMessage;
      console.log('Handle foreground notification')
    });

    // Handle background and killed app notifications
    messaging().onNotificationOpenedApp(remoteMessage => {
      const { data } = remoteMessage;
      // Navigate based on notification data
      navigation.navigate('Notification', { itemId: data });
    });

    // Check if the app was opened from a notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const { data } = remoteMessage;
          // Navigate to the screen
          navigation.navigate('Notification', { itemId: data });
        }
      });

    return unsubscribe;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

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

  const getGreetHandle = () => {
    var myDate = new Date();
    var hrs = myDate.getHours();

    var msg;

    if (hrs < 12) msg = t('Good Morning, Guest');
    else if (hrs >= 12 && hrs <= 15) msg = t('Good Afternoon, Guest');
    else if (hrs >= 15 && hrs <= 24) msg = t('Good Evening, Guest');

    setGreet(msg);
  };

  const getLatestVersionFromServer = async () => {
    const url = `${API.GET_VERSION}`;
    try {
      const result = await getApi(url);
      const data = result?.data;
      return data[0]?.version;
    } catch (e) {
      handleAPIErrorResponse(e);
    }
  };

  const checkForUpdates = async () => {
    try {
      const currentVersion = DeviceInfo.getVersion();
      const latestVersion = await getLatestVersionFromServer();

      // const latestVersion = await VersionCheck.getLatestVersion();
      // const currentVersion = await VersionCheck.getCurrentVersion();

      console.log({latestVersion, currentVersion});
      if (latestVersion && currentVersion < latestVersion) {
        Alert.alert(
          'Update Required',
          'A new version of the app is available. Please update to continue using the app.',
          [
            {
              text: 'Update Now',
              onPress: () => {
                if (Platform.OS == 'android') {
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.mannhit',
                  );
                } else {
                  Linking.openURL('https://apps.apple.com/app/your-app-id');
                }
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getGreetHandle();
      checkForUpdates();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getGreetHandle();
  }, []);

  return (
    <View style={[st.flex]}>
      <Header
        navigation={navigation}
        getGreetHandle={getGreetHandle}
        getfirebaseToken={() => getfirebaseToken()}
      />
      <ScrollView style={[st.flex]}>
        <View
          style={{
            height: 150,
            width: '100%',
            backgroundColor: colors.blue,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
            borderBottomStartRadius: 100,
            borderBottomEndRadius: 100,
          }}>
          <Text style={[st.tx20, st.ml_15]}>{greet}</Text>
        </View>

        <View>
          <View style={st.align_C}>
            <View style={{marginTop: '-25%'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AskAssessment');
                }}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={st.animatedCir_1}>
                  <Image source={images.self_assessment} style={st.iconsty} />
                  <Text style={[st.tx16, st.txAlignC]}>{t('SELF_ASSESS')}</Text>
                </LinearGradient>
                <View style={st.animatedCir_2Pos}>
                  <LinearGradient
                    colors={[colors.circle_2, colors.circle_1]}
                    style={st.animatedCir_2}>
                    <View></View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[st.row, st.justify_A, st.mh_10]}>
          <View>
            <View style={st.align_C}>
              <TouchableOpacity onPress={() => navigation.navigate('Video')}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={[st.animatedCir_1, {width: 135, height: 135}]}>
                  <Image source={images.video} style={st.iconsty} />
                  <Text style={[st.tx16, st.txAlignC]}>{t('AWARENESS')}</Text>
                </LinearGradient>
                <View style={st.animatedCir_2Pos}>
                  <LinearGradient
                    colors={[colors.circle_2, colors.circle_1]}
                    style={st.animatedCir_2}>
                    <View></View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={st.align_C}>
              <TouchableOpacity
                onPress={() => navigation.navigate('IEC-Material')}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={[st.animatedCir_1, {width: 135, height: 135}]}>
                  <Image source={images.IEC} style={{width: 77, height: 44}} />
                  <Text style={[st.tx16, st.txAlignC]}>
                    {t('IEC-Material')}
                  </Text>
                </LinearGradient>
                <View style={st.animatedCir_2Pos}>
                  <LinearGradient
                    colors={[colors.circle_2, colors.circle_1]}
                    style={st.animatedCir_2}>
                    <View></View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[st.row, st.justify_A, st.mh_10]}>
          <View>
            <View style={st.align_C}>
              <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={[st.animatedCir_1, {width: 135, height: 135}]}>
                  <Image source={images.mankasha} style={st.iconsty} />
                  <Text style={[st.tx16, st.txAlignC]}>{t('Mankaksha')}</Text>
                </LinearGradient>
                <View style={st.animatedCir_2Pos}>
                  <LinearGradient
                    colors={[colors.circle_2, colors.circle_1]}
                    style={st.animatedCir_2}>
                    <View></View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={st.align_C}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TeleManas')}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={[st.animatedCir_1, {width: 135, height: 135}]}>
                  <Image source={images.telemanas} style={st.iconsty} />
                  <Text style={[st.tx16, st.txAlignC]}>{t('TELE')}</Text>
                </LinearGradient>
                <View style={st.animatedCir_2Pos}>
                  <LinearGradient
                    colors={[colors.circle_2, colors.circle_1]}
                    style={st.animatedCir_2}>
                    <View></View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[st.align_C, st.mh_10]}>
          <View>
            <View style={st.align_C}>
              <TouchableOpacity onPress={() => navigation.navigate('MythFact')}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={[st.animatedCir_1, {width: 135, height: 135}]}>
                  <Image source={images.myth} style={st.iconsty} />
                  <Text style={[st.tx16, st.txAlignC]}>{t('MythsFacts')}</Text>
                </LinearGradient>
                <View style={st.animatedCir_2Pos}>
                  <LinearGradient
                    colors={[colors.circle_2, colors.circle_1]}
                    style={st.animatedCir_2}>
                    <View></View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <DialText />
        </View>
      </ScrollView>
      <View>
        <Footer />
      </View>
    </View>
  );
};

export default Home;
