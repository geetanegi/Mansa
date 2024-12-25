import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  AppState,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setAdminLogin} from '../../../../redux/reducers/AdminLogin';
import AdminInput from '../../../../components/adminInput';
import st from '../../../../global/styles';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../global/theme';
import MansaImg from '../../../../components/mansa';
import {useTranslation} from 'react-i18next';
import Button from '../../../../components/button';
import Back from '../../../../components/back';
import {clearAdminFlow} from '../../../../redux/reducers/Adminflow';
import {useFocusEffect} from '@react-navigation/native';
import {API} from '../../../../utils/endpoints';
import {postApi} from '../../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import {
  ValidateMobile,
  ValueEmpty,
  ValidatePassword,
} from '../../../../utils/helperfunctions/validations';

const INITIALINPUT = {
  userNumber: '',
  password: '',
};

const AdminLogin = ({navigation, route}) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [isLoading, setIsLoading] = useState(false);

  const admin_flow = useSelector(state => state.adminFlow?.data);
  const adminLogin = useSelector(state => state.adminLogin?.data);

  useEffect(() => {
    // console.log({route: route.name});
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log('AppState', appState.current);
      // if (route.name === 'AdminLogin') {
      //   if (!adminLogin) {
      //     dispatch(clearAdminFlow(false));
      //   }
      // }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    Keyboard.dismiss();
    const emptyPassword = ValueEmpty(inputs?.password, t);
    const validNumber = ValidateMobile(inputs?.userNumber, t);
    const validPassword = ValidatePassword(inputs?.password);
    let isValid = true;

    if (validNumber != 'success') {
      handleError(validNumber, 'userNumber');
      isValid = false;
    } else {
      handleError('', 'userNumber');
    }

    if (emptyPassword) {
      handleError('*Required', 'password');
      isValid = false;
    } else {
      if (validPassword == 'success') {
        handleError('', 'password');
      } else {
        handleError(validPassword, 'password');
        isValid = false;
      }
    }

    if (isValid) {
      login_handle();
    }
  };

  const login_handle = async () => {
    const url = API.ADMIN_AUTH;
    const params = {
      contact: inputs?.userNumber,
      password: inputs?.password,
    };
    setIsLoading(true);
    try {
      const result = await postApi(url, params);
      console.log({result});
      if (result?.status == 200) {
        const data = result.data;
        console.log({data});
        dispatch(setAdminLogin(true));
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[st.flex, {backgroundColor: colors.white}]}>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.5}}
          colors={[colors.lightFrozy, colors.frozy]}
          style={[st.flex]}>
          <View style={[{marginTop: 30}]}>
            <View style={st.ml_15}>
              <Back onPress={() => dispatch(clearAdminFlow(false))} />
            </View>
            <View style={st.align_E}>
              <MansaImg imgsty={[{height: 200, marginRight: 20}]} />
            </View>
          </View>

          <View style={styles.logincon}>
            <View>
              <Text style={[st.tx14, st.txAlignC, {color: colors.lightText}]}>
                {t('EnterAccount')}
              </Text>

              <View style={st.mt_t10}>
                <AdminInput
                  placeholder={t('MOBILE')}
                  onChangeText={text => handleOnchange(text, 'userNumber')}
                  onFocus={() => handleError(null, 'userNumber')}
                  maxLength={10}
                  error={errors?.userNumber}
                  iconName={'phone-call'}
                  keyboardType={'phone-pad'}
                />
              </View>

              <View>
                <AdminInput
                  placeholder={t('Password')}
                  onChangeText={text => handleOnchange(text, 'password')}
                  onFocus={() => handleError(null, 'password')}
                  error={errors?.password}
                  iconName={'lock'}
                  password
                />
              </View>

              <View style={st.align_E}>
                <Pressable onPress={() => navigation.navigate('Forgot')}>
                  <Text style={[st.tx14, {color: colors.black}]}>
                    {t('Forgot password')}
                  </Text>
                </Pressable>
              </View>

              <View style={[st.mt_B, st.mt_v]}>
                <Button
                  title={t('LOGIN')}
                  backgroundColor={colors.lightFrozy}
                  color={colors.white}
                  onPress={() => {
                    dispatch(setAdminLogin(true));
                    // validation();
                  }}
                />
              </View>

              {/* <View style={st.mt_t10}>
                <Pressable onPress={() =>navigation.navigate('AdminSignUp')}>
                  <Text
                    style={[st.tx14, st.txAlignC, {color: colors.black}]}>
                    {t('DONt_ACC')}
                  </Text>
                </Pressable>
              </View> */}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      {isLoading && <Loader />}
    </KeyboardAvoidingView>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  logincon: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: colors.white,
    padding: 20,
    flex: 1,
  },
});
