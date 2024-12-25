import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Pressable,
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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {API} from '../../../../utils/endpoints';
import {postApi} from '../../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import {ValueEmpty} from '../../../../utils/helperfunctions/validations';

const OTP = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [code, setOtp] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const phone = route?.params?.phone;

  const validation = () => {
    Keyboard.dismiss();
    const validNumber = ValueEmpty(code);
    let isValid = true;

    if (validNumber) {
      isValid = false;
      setCodeError('*Required');
    } else {
      setCodeError('');
    }

    if (isValid) {
      // handleSubmitPress();
      navigation.navigate('RecoverPass');
    }
  };

  const handleSubmitPress = async () => {
    console.log({inputs});
    const url = `${API.OTP}${phone}/${inputs?.userNumber}`;

    try {
      setIsLoading(true);
      const result = await postApi(url);
      if (result?.status == 200) {
        const data = result.data;
        console.log({data});
        navigation.navigate('RecoverPass');
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
              <Back onPress={() => navigation.goBack()} />
            </View>
            <View style={st.align_E}>
              <MansaImg imgsty={[{height: 200, marginRight: 20}]} />
            </View>
          </View>

          <View style={styles.logincon}>
            <View>
              <Text style={[st.tx20, st.txAlignC, {color: colors.black}]}>
                {t('CheckPhone')}
              </Text>

              <Text style={[st.tx14, st.txAlignC, {color: colors.lightText}]}>
                {t('SendCode')}
              </Text>

              <View style={st.mt_t10}>
                <OTPInputView
                  style={{height: 100}}
                  pinCount={4}
                  code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  onCodeChanged={code => {
                    setOtp(code);
                  }}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={[
                    styles.underlineStyleBase,
                    st.tx18,
                    {color: colors.black},
                  ]}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                    setCodeError('');
                  }}
                />
              </View>
              <View>
                {codeError && <Text style={st.error}>{codeError}</Text>}
              </View>

              <View style={st.mt_v}>
                <Text style={[st.tx14, st.txAlignC, {color: colors.black}]}>
                  {'code expires in:'}{' '}
                  <Text style={{color: colors.danger}}>{'03:12'}</Text>
                </Text>
              </View>

              <View style={[st.mt_B, st.mt_v]}>
                <Button
                  title={t('Next')}
                  backgroundColor={colors.lightFrozy}
                  color={colors.white}
                  onPress={() => {
                    // navigation.navigate('RecoverPass');
                    validation();
                  }}
                />

                <Button
                  title={t('SendAgain')}
                  backgroundColor={colors.white}
                  color={colors.black}
                  onPress={() => navigation.navigate('RecoverPass')}
                  disabled={true}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
      {isLoading && <Loader />}
    </KeyboardAvoidingView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  logincon: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: colors.white,
    padding: 20,
    flex: 1,
  },
  underlineStyleBase: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: colors.lightText,
    borderRadius: 10,
  },
  borderStyleBase: {
    width: 20,
    height: 50,
  },

  borderStyleHighLighted: {
    borderColor: colors.lightFrozy,
  },
  underlineStyleHighLighted: {
    borderColor: colors.lightFrozy,
  },
});
