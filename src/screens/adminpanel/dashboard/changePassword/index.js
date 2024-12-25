import {StyleSheet, Text, View, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import {useTranslation} from 'react-i18next';
import AdminInput from '../../../../components/adminInput';
import {colors} from '../../../../global/theme';
import Button from '../../../../components/button';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';
import {API} from '../../../../utils/endpoints';
import {postApi, getApi} from '../../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import PopUpMessage from '../../../../components/popup';
import {
  ValueEmpty,
  ValidatePassword,
} from '../../../../utils/helperfunctions/validations';
const INITIALINPUT = {
  confirm_password: '',
  password: '',
};

const ChangePassword = ({navigation}) => {
  const {t} = useTranslation();
  const [admin, setAdmin] = useState('');

  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([])

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
    const emptyPassword = ValueEmpty(inputs?.password);
    const emptyConfirmPassword = ValueEmpty(inputs?.confirm_password);
    const validPassword = ValidatePassword(inputs?.password);

    let isValid = true;

    if (emptyPassword) {
      handleError('*Required', 'password');
      isValid = false;
    } else if (validPassword != 'success') {
      handleError(validPassword, 'password');
      isValid = false;
    } else {
      handleError('', 'password');
    }

    if (emptyConfirmPassword) {
      handleError('*Required', 'confirm_password');
      isValid = false;
    } else if (inputs?.password != inputs?.confirm_password) {
      handleError(
        'Confirm password is not same as password',
        'confirm_password',
      );
      isValid = false;
    } else {
      handleError('', 'confirm_password');
    }

    if (isValid) {
      update_password();
    }
  };

  const update_password = async () => {
    const url = API.SAVE_PASSWORD;
    const params = {
      roleid: admin,
      password: inputs?.password,
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
        setSubtitle(data?.message);
        setInputs(INITIALINPUT)
        setAdmin('')
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
        title={t('ChangePassword')}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />
      <View style={st.pd20}>
        <Text style={[st.tx14, st.txAlignC, {color: colors.lightText}]}>
          Please enter your new password
        </Text>

        <View>
          <View style={[styles.picker_sty, st.mt_v]}>
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
              allowFontScaling={false}
            />
          </View>
        </View>
        <View style={st.mt_t10}>
          <AdminInput
            placeholder={t('Password')}
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            error={errors?.password}
            iconName={'lock'}
            password = {true}
            value={inputs?.password}
          />
        </View>
        <View style={st.mt_t10}>
          <AdminInput
            placeholder={t('ConfirmPassword')}
            onChangeText={text => handleOnchange(text, 'confirm_password')}
            onFocus={() => handleError(null, 'confirm_password')}
            error={errors?.confirm_password}
            iconName={'lock'}
            password = {true}
            value={inputs?.confirm_password}
          />
        </View>

        <Button
          title={t('SUBMIT')}
          onPress={() => validation()}
          backgroundColor={colors.lightFrozy}
          color={colors.white}
        />
      </View>
      {isLoading && <Loader />}
      {show_alert_msg()}
    </View>
  );
};

export default ChangePassword;

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
