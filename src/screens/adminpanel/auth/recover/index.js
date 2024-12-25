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
import {API} from '../../../../utils/endpoints';
import {postApi} from '../../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import {
  ValidatePassword,
  ValueEmpty
} from '../../../../utils/helperfunctions/validations';

const INITIALINPUT = {
  Password: '',
};

const RecoverPass = ({navigation}) => {
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

    const emptyPassword = ValueEmpty(inputs?.Password);
    const validPassword = ValidatePassword(inputs?.Password);

    let isValid = true;

    if (emptyPassword) {
      handleError('*Required', 'Password');
      isValid = false;
    } else {
      if (validPassword == 'success') {
        handleError('', 'Password');
      } else {
        handleError(validPassword, 'Password');
        isValid = false;
      }
    }

    if (isValid) {
      // handleSubmitPress();
      navigation.navigate('AdminLogin');
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
        navigation.navigate('AdminLogin');
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
                {t('Recover')}
              </Text>

              <Text style={[st.tx14, st.txAlignC, {color: colors.lightText}]}>
                {t('NewPass')}
              </Text>

              <View style={st.mt_t10}>
                <AdminInput
                  placeholder={t('Password')}
                  onChangeText={text => handleOnchange(text, 'Password')}
                  onFocus={() => handleError(null, 'Password')}
                  error={errors?.Password}
                  iconName={'lock'}
                  password
                />
              </View>

              <View style={[st.mt_B, st.mt_v]}>
                <Button
                  title={t('SUBMIT')}
                  backgroundColor={colors.lightFrozy}
                  color={colors.white}
                  onPress={() => {
                    // navigation.navigate('AdminLogin');
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

export default RecoverPass;

const styles = StyleSheet.create({
  logincon: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: colors.white,
    padding: 20,
    flex: 1,
  },
});
