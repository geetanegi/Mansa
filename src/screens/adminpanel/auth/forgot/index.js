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
import {postApi} from '../../../../utils/apicalls';
import {API} from '../../../../utils/endpoints';
import {handleAPIErrorResponse} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import {ValidateMobile} from '../../../../utils/helperfunctions/validations';

const INITIALINPUT = {
  userNumber: '',
};

const AdminLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    Keyboard.dismiss();

    const validNumber = ValidateMobile(inputs?.userNumber);

    let isValid = true;

    if (validNumber != 'success') {
      handleError(validNumber, 'userNumber');
      isValid = false;
    } else {
      handleError('', 'userNumber');
    }

    if (isValid) {
      // handleSubmitPress();
      navigation.navigate('OTP', {phone: inputs?.userNumber});
    }
  };

  const handleSubmitPress = async () => {
    console.log({inputs});
    const url = `${API.LOGIN}${inputs?.userNumber}`;
    try {
      setIsLoading(true);
      const result = await postApi(url);
      if (result?.status == 200) {
        const data = result.data;
        console.log({data});
        navigation.navigate('OTP', {phone: inputs?.userNumber});
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
                {t('Passwordrecovery')}
              </Text>

              <Text style={[st.tx14, st.txAlignC, {color: colors.lightText}]}>
                {t('NumberRecovery')}
              </Text>

              <View style={st.mt_t10}>
                <AdminInput
                  placeholder={t('MOBILE')}
                  onChangeText={text => handleOnchange(text, 'userNumber')}
                  onFocus={() => handleError(null, 'userNumber')}
                  maxLength={10}
                  error={errors?.userNumber}
                  iconName={'phone-call'}
                />
              </View>

              <View style={[st.mt_B, st.mt_v]}>
                <Button
                  title={t('SendOtp')}
                  backgroundColor={colors.lightFrozy}
                  color={colors.white}
                  onPress={() => {
                    // navigation.navigate('OTP');
                    validation();
                  }}
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
