import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import st from '../../../../global/styles';
import Back from '../../../../components/back';
import {colors} from '../../../../global/theme';
import {useTranslation} from 'react-i18next';
import AdminInput from '../../../../components/adminInput';
import Button from '../../../../components/button';
import AdminStackHeader from '../../../../components/adminStackHeader';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';
import {getApi, postApi} from '../../../../utils/apicalls';
import {API} from '../../../../utils/endpoints';
import {
  handleAPIErrorResponse,
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

const EditProfile = ({navigation}) => {
  const {t} = useTranslation();
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [admin, setAdmin] = useState(1);
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
    navigation.goBack()
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

  const getUser_handle = async () => {
    const url = API.GET_ADMIN_PROFILE;
    console.log({url});
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      console.log({result: result.data});
      if (result?.status == 200) {
        const data = result.data;
        const setData = {
          Designation: data?.designation,
          Institute: data?.institution,
          Email: data?.username,
          mobile: data?.contact,
          Section: '',
          Password: data?.password,
          ConfirmPassword: data?.password,
        };
        setAdmin(data?.roleId);
        setInputs(setData);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
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

  const updateUser_handle = async () => {
    const url = API.UPDATE_ADMIN_PROFILE;
    const params = {
      id: 255,
      email: inputs?.Email,
      contact: inputs?.mobile,
      designation: inputs?.Designation,
      institute: inputs?.Institute  ,
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
        setSubtitle('Your profile has been updated successfully');
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser_handle();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={t('Register')}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />
      <ScrollView>
        <View style={st.pd20}>
          <View>
            <View style={[styles.picker_sty, st.mt_t10]}>
              <RNPickerSelect
                placeholder={{
                  label: 'Select',
                  value: null,
                }}
                style={selectBoxStyle}
                onValueChange={value => setAdmin(value)}
                items={data}
                Icon={() => {
                  return <Icon name="chevron-down" size={20} />;
                }}
                value={admin}
                disabled
                allowFontScaling={false}
              />
            </View>

            <View style={st.mt_t10}>
              <AdminInput
                placeholder={t('Designation')}
                onChangeText={text => handleOnchange(text, 'Designation')}
                onFocus={() => handleError(null, 'Designation')}
                error={errors?.Designation}
                iconName={'user'}
                value={inputs?.Designation}
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('Institute')}
                onChangeText={text => handleOnchange(text, 'Institute')}
                onFocus={() => handleError(null, 'Institute')}
                error={errors?.Institute}
                iconName={'layers'}
                value={inputs?.Institute}
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('AdminEmail')}
                onChangeText={text => handleOnchange(text, 'Email')}
                onFocus={() => handleError(null, 'Email')}
                error={errors?.Email}
                iconName={'mail'}
                value={inputs?.Email}
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
                value={inputs?.mobile}
                editable={false}
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('Password')}
                onChangeText={text => handleOnchange(text, 'password')}
                onFocus={() => handleError(null, 'password')}
                error={errors?.Password}
                iconName={'lock'}
                password
                value={inputs.Password}
                editable={false}
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
                value={inputs?.ConfirmPassword}
                editable={false}
              />
            </View>

            <View style={[st.mt_B]}>
              <Button
                title={t('SUBMIT')}
                backgroundColor={colors.lightFrozy}
                color={colors.white}
                onPress={() => updateUser_handle()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {show_alert_msg()}
      {isLoading && <Loader />}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  picker_sty: {
    borderWidth: 1.5,
    borderColor: '#D0DBEA',
    borderRadius: 7,
  },
});

const selectBoxStyle = {
  inputIOS: {
    height: 45,
    paddingHorizontal: 10, // to ensure the text is never behind the icon
    fontSize: 14,
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
  placeholder: {
    color: 'lightgray',
    fontSize: 14,
  },
  inputAndroid: {
    height: 45,
    paddingHorizontal: 10, // to ensure the text is never behind the icon
    fontSize: 14,
  },
};
