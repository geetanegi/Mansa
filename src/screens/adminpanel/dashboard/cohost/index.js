import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../../global/styles';
import Back from '../../../../components/back';
import {colors} from '../../../../global/theme';
import {useTranslation} from 'react-i18next';
import AdminInput from '../../../../components/adminInput';
import Button from '../../../../components/button';
import AdminStackHeader from '../../../../components/adminStackHeader';
// import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';
import {API} from '../../../../utils/endpoints';
import {getApi, postApi} from '../../../../utils/apicalls';
import {
  handleAPIErrorResponse,
  ValidateMail,
  ValidateMobile,
  ValidatePassword,
  ValueEmpty,
} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import PopUpMessage from '../../../../components/popup';

const INITIALINPUT = {
  Designation: '',
  Institute: '',
  Email: '',
  mobile: '',
  Section: '',
  Password: '',
  ConfirmPassword: '',
};

const Addhost = ({navigation}) => {
  const {t} = useTranslation();
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [admin, setAdmin] = useState('');
  const [section, setSection] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
    navigation.goBack();
  };

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        gotoSuggestion={() => {
          setPopupMessageVisibility(false);
        }}
        twoButton={false}
        box={false}
      />
    );
  };

  const getRole_handle = async () => {
    const url = API.GET_ROLE;
    console.log({url});
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      console.log({GET_Role: result.data});

      if (result?.status == 200) {
        const data = result.data;
        const tempdata = [];
        for (let i = 0; data.length > i; i++) {
          let obj = {
            label: data[i].roleName,
            value: data[i].id,
          };
          tempdata.push(obj);
        }
        console.log({tempdata});
        setData(tempdata);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const validation = () => {
    Keyboard.dismiss();
    const emptyDesignation = ValueEmpty(inputs?.Designation);
    const emptyInstitute = ValueEmpty(inputs?.Institute);
    const emptyEmail = ValueEmpty(inputs?.Email);
    const validEmail = ValidateMail(inputs?.Email);
    const emptymobile = ValueEmpty(inputs?.mobile);
    const validMobile = ValidateMobile(inputs?.mobile);
    const emptyPassword = ValueEmpty(inputs?.Password);
    const emptyConfirmPassword = ValueEmpty(inputs?.ConfirmPassword);
    const validPassword = ValidatePassword(inputs?.Password);

    let isValid = true;

    if (emptyDesignation) {
      handleError('*Required', 'Designation');
      isValid = false;
    } else {
      handleError('', 'Designation');
    }

    if (emptyInstitute) {
      handleError('*Required', 'Institute');
      isValid = false;
    } else {
      handleError('', 'Institute');
    }

    if (emptyEmail) {
      handleError('*Required', 'Email');
      isValid = false;
    } else {
      if (validEmail == 'success') {
        handleError('', 'Email');
      } else {
        handleError(validEmail, 'Email');
        isValid = false;
      }
    }

    if (emptymobile) {
      handleError('*Required', 'mobile');
      isValid = false;
    } else if (validMobile != 'success') {
      handleError(validMobile, 'mobile');
      isValid = false;
    } else {
      handleError('', 'mobile');
    }

    if (emptyPassword) {
      handleError('*Required', 'Password');
      isValid = false;
    } else if (validPassword != 'success') {
      handleError(validPassword, 'Password');
      isValid = false;
    } else {
      handleError('', 'Password');
    }

    if (emptyConfirmPassword) {
      handleError('*Required', 'ConfirmPassword');
      isValid = false;
    } else if (inputs?.Password != inputs?.ConfirmPassword) {
      handleError(
        'Confirm password is not same as password',
        'ConfirmPassword',
      );
      isValid = false;
    } else {
      handleError('', 'ConfirmPassword');
    }

    if (isValid) {
      updateUser_handle();
    }
  };

  const updateUser_handle = async () => {
    const url = API.UPDATE_ADMIN_PROFILE;
    const params = {
      id: 255,
      username: inputs?.Email,
      password: inputs?.Password,
      // oldPassword: null,
      email: inputs?.Email,
      contact: inputs?.mobile,
      designation: inputs?.Designation,
      institute: inputs?.Institute,
      roleId: {
        id: 1,
      },
    };

    console.log({url, params});
    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({updateUser_handle: data});
        setIsLoading(false);
        setTitle('Congratulations');
        setSubtitle('Co-host has been added successfully');
        setPopupMessageVisibility(true);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getRole_handle();
  }, []);

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={t('Add Co-host')}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />
      <ScrollView>
        <View style={st.pd20}>
          <View>
            <View style={st.mt_t10}>
              <AdminInput
                placeholder={t('Designation')}
                onChangeText={text => handleOnchange(text, 'Designation')}
                onFocus={() => handleError(null, 'Designation')}
                error={errors?.Designation}
                iconName={'user'}
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('Institute')}
                onChangeText={text => handleOnchange(text, 'Institute')}
                onFocus={() => handleError(null, 'Institute')}
                error={errors?.Institute}
                iconName={'layers'}
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('AdminEmail')}
                onChangeText={text => handleOnchange(text, 'Email')}
                onFocus={() => handleError(null, 'Email')}
                error={errors?.Email}
                iconName={'mail'}
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('MOBILE')}
                onChangeText={text => handleOnchange(text, 'mobile')}
                onFocus={() => handleError(null, 'mobile')}
                maxLength={10}
                error={errors?.mobile}
                iconName={'phone-call'}
              />
            </View>

            <View>
              <AdminInput
                placeholder={'Password'}
                onChangeText={text => handleOnchange(text, 'Password')}
                onFocus={() => handleError(null, 'Password')}
                error={errors?.Password}
                iconName={'lock'}
                password
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('ConfirmPassword')}
                onChangeText={text => handleOnchange(text, 'ConfirmPassword')}
                onFocus={() => handleError(null, 'ConfirmPassword')}
                error={errors?.ConfirmPassword}
                iconName={'lock'}
                password
              />
            </View>

            <View style={[st.mt_B]}>
              <Button
                title={t('SUBMIT')}
                backgroundColor={colors.lightFrozy}
                color={colors.white}
                onPress={() => validation()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {isLoading && <Loader />}
      {show_alert_msg()}
    </View>
  );
};

export default Addhost;

const styles = StyleSheet.create({
  picker_sty: {
    borderWidth: 1.5,
    borderColor: '#D0DBEA',
    borderRadius: 7,
  },
});
