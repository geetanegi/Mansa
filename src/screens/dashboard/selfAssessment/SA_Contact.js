import {
  StyleSheet,
  Text,
  ScrollView,
  Modal,
  Keyboard,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Footer from '../../../components/footer';
import AuthHeader from '../../../components/Auth_Header';
import st from '../../../global/styles';
import {useTranslation} from 'react-i18next';
import {colors, images} from '../../../global/theme';
import Button from '../../../components/button';
import Back from '../../../components/back';
import Input from '../../../components/input';
import {
  ValueEmpty,
  ValidateMobile,
} from '../../../utils/helperfunctions/validations';
import {API} from '../../../utils/endpoints';
import {getApi, postApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import DialText from '../../../components/dialPad';
import {View} from 'react-native-animatable';

const INITIALINPUT = {
  Number: '',
};

const INITIALOTP = {
  otp: '1234',
};

const SA_Contact = ({navigation, route}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [isLoading, setIsLoading] = useState(false);

  const [otpInputs, setOtpInputs] = useState(INITIALOTP);
  const [otperrors, setOtpErrors] = useState(INITIALOTP);

  const [showOtp, setShowOtp] = useState(false);

  const [data, setData] = useState([]);
  const ageId = route?.params?.ageId;
  const assessment = route?.params?.assessment

  const getQuestions = async () => {
    const url = API.GET_DISTRICT;
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        setData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const handleOnchangeOtp = (text, input) => {
    setOtpInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleErrorOtp = (error, input) => {
    setOtpErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    Keyboard.dismiss();
    const emptyNumber = ValueEmpty(inputs?.Number);
    const validNumber = ValidateMobile(inputs?.Number);
    let isValid = true;

    if (emptyNumber) {
      handleError('*Required', 'Number');
      isValid = false;
    } else {
      if (validNumber != 'success') {
        handleError(validNumber, 'Number');
        isValid = false;
      } else {
        handleError('', 'Number');
      }
    }

    if (isValid) {
      // saveCallBackHandle();
      setShowOtp(true);
    }
  };

  const saveCallBackHandle = async () => {
    const url = API.SAVE_CALLBACK;
    const params = {
      contact: inputs.Number,
    };
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await postApi(url, params);

      if (result?.status == 201) {
        const data = result.data;
        setShowOtp(true);
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
    <View style={st.flex}>
      <AuthHeader
        title={''}
        assessment={
          ageId == 10 || ageId == 2 || assessment == false ? false : true
        }
        gotoAssessment={() => navigation.navigate('SA_lowScore')}
        onBack={() => navigation.goBack()}
        auth={true}
      />
      <ScrollView>
        <View style={st.pd20} animation={'fadeInRight'} delay={500}>
          <Text style={[st.tx20, st.txAlignC, {color: colors.black}]}>
            {t('Contact_title')}
          </Text>

          <DialText gradient={false} />
          {/* <Button
            backgroundColor={colors.blue}
            color={colors.white}
            title={t('Contact_btn_title_3')}
            onPress={() => setModalVisible(true)}
          /> */}
          {data?.map((i, n) => {
            return (
              <View key={n}>
                <Button
                  backgroundColor={colors.blue}
                  color={colors.white}
                  title={t('Contact_btn_title_1')}
                  onPress={() =>
                    // navigation.navigate('ViewPdf', {url: i?.fileName})
                    navigation.navigate('MankakshTab', {url: i?.fileName})
                  }
                />
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={[st.mt_v, st.align_C]}
        animation={'fadeInRight'}
        delay={1000}>
        <Button
          backgroundColor={colors.blue}
          color={colors.white}
          title={t('go_home')}
          onPress={() => navigation.navigate('Main')}
        />
      </View>
      <Footer />

      {isLoading && <Loader />}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Back
                iconColor={colors.black}
                onPress={() => setModalVisible(false)}
              />
              <View style={st.mt_t10}>
                <View>
                  {!showOtp ? (
                    <Input
                      placeholder={t('ENTERMOBILE')}
                      onChangeText={text => handleOnchange(text, 'Number')}
                      onFocus={() => handleError(null, 'Number')}
                      error={errors?.Number}
                      iconName={images.mobile}
                      label={t('ENTERMOBILE')}
                      labelColor={colors.black}
                      inputsty={[st.inputsty]}
                      textSty={[st.tx14, {color: colors.black}]}
                      maxLength={10}
                      keyboardType={'phone-pad'}
                    />
                  ) : (
                    <Input
                      placeholder={t('ENTER_OTP')}
                      onChangeText={text => handleOnchangeOtp(text, 'otp')}
                      onFocus={() => handleErrorOtp(null, 'otp')}
                      // error={otperrors?.otp}
                      iconName={images.mobile}
                      label={t('ENTER_OTP')}
                      labelColor={colors.black}
                      inputsty={[st.inputsty]}
                      textSty={[st.tx14, {color: colors.black}]}
                      value={otpInputs?.otp}
                      editable={false}
                    />
                  )}
                </View>
              </View>
            </View>

            <Button
              backgroundColor={colors.blue}
              color={colors.white}
              title={
                !showOtp
                  ? inputs.Number
                    ? t('otprequest')
                    : t('Submit')
                  : t('Submit')
              }
              onPress={() => {
                if (showOtp) {
                  setModalVisible(!modalVisible);
                  setShowOtp(false);
                  setInputs(INITIALINPUT);
                } else {
                  validation();
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SA_Contact;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  modalView: {
    // margin: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: Platform.OS == 'android' ? 10 : 0,
    borderTopWidth: 2,
    borderStartWidth: 2,
    borderEndWidth: 2,
    borderColor: colors.grey,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
