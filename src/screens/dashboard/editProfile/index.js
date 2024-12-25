import {StyleSheet, Text, ScrollView, Keyboard, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../global/theme';
import Button from '../../../components/button';
import RadioButton from '../../../components/radio_button';
import FloatingInput from '../../../components/floating_Input';
import Footer from '../../../components/footer';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';
import {
  ValueEmpty,
  specialCharactorRemove,
  ValidateName,
  ValidateMobile,
} from '../../../utils/helperfunctions/validations';
import AuthHeader from '../../../components/Auth_Header';
import {API} from '../../../utils/endpoints';
import {getApi, postApi, putApi} from '../../../utils/apicalls';
import {
  handleAPIErrorResponse,
  dateFormet,
  validateAge,
} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import {useDispatch, useSelector} from 'react-redux';
import PopUpMessage from '../../../components/popup';
import {View} from 'react-native-animatable';
import {languageConversion} from '../../../utils/helperfunctions/functions';
import {family} from '../../../global/fonts';

const INITIALINPUT = {
  userNumber: '',
  name: '',
  age: '',
  gender: '',
  district: '',
  occupation: '',
  occupation_name: '',
};

const Profile = ({navigation, route}) => {
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [occupList, setOccupList] = useState([]);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState();

  const profileData = useSelector(state => state.profile?.data);
  const roleData = useSelector(state => state.role?.data);
  const locationData = useSelector(state => state.location?.data);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const {t, i18n} = useTranslation();

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
    navigation.navigate('Dashboard');
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

  const validation = () => {
    Keyboard.dismiss();
    const validAge = validateAge(inputs?.age, t);
    const emptyOcc_name = ValueEmpty(inputs?.occupation_name);
    const validName = ValidateName(inputs?.name, t);
    const validDis = ValidateName(inputs?.district, t);
    const validNumber = ValidateMobile(inputs?.userNumber, t);

    let isValid = true;

    if (emptyAge) {
      handleError(t('Required'), 'age');
      isValid = false;
    } else if (validAge != 'success') {
      handleError(validAge, 'age');
      isValid = false;
    } else {
      handleError('', 'age');
    }

    if (inputs?.name?.trim() != '') {
      if (validName == 'success') {
        handleError('', 'name');
      } else {
        handleError(validName, 'name');
        isValid = false;
      }
    }

    if (inputs?.district?.trim() != '') {
      if (validDis == 'success') {
        handleError('', 'district');
      } else {
        handleError(validDis, 'district');
        isValid = false;
      }
    }

    if (inputs.userNumber.trim() != '') {
      if (validNumber != 'success') {
        handleError(validNumber, 'userNumber');
        isValid = false;
      } else {
        handleError('', 'userNumber');
      }
    }

    if (!inputs?.occupation) {
      handleError(t('Required'), 'occupation');
      isValid = false;
    } else {
      handleError('', 'occupation');
    }

    if (selectedLanguage == 11) {
      if (emptyOcc_name) {
        handleError(t('Required'), 'occupation_name');
        isValid = false;
      } else {
        handleError('', 'occupation_name');
      }
    }

    if (isValid) {
      handleSubmitPress();
    }
  };

  const handleSubmitPress = () => {
    updateUser_handle();
  };

  const getUser_handle = async () => {
    const url = API.GET_USER_PROFILE + profileData?.data[0]?.id;
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        const setData = {
          userNumber: data.contact,
          name: data.username,
          age: data.age?.toString(),
          gender: data.gender,
          district: data?.district,
          occupation: data?.occid,
          occupation_name: data?.occsubtype,
        };
        setInputs(setData);
        setSelectedLanguage(data?.occid);
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
    // const url = API.UPDATE_USER + profileData?.data[0]?.id;
    const url = API.SAVE_USER;
    const params = {
      username: inputs?.name,
      contact: inputs?.userNumber,
      age: inputs?.age,
      gender: inputs?.gender,
      occid: inputs?.occupation,
      district: inputs?.district,
      Occsubtype: inputs?.occupation_name,
      roleId: roleData,
      locality: locationData?.locality,
      city: locationData?.adminArea,
      subAdminArea: locationData?.subAdminArea,
      loginDate: dateFormet(),
      id: profileData?.data[0]?.id,
    };

    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      if (result?.status == 200) {
        const data = result.data;
        setIsLoading(false);
        setTitle(t('Congratulations'));
        setSubtitle(t('profile updated'));
        setPopupMessageVisibility(true);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getOccupation_handle = async () => {
    const url = API.Get_Occupation + languageConversion(i18n);

    try {
      setIsLoading(true);
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        const tempList = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            label: data[i].name,
            value: data[i].occid,
          };
          tempList.push(obj);
        }
        setOccupList(tempList);
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
    const unsubscribe = navigation.addListener('focus', () => {
      getUser_handle();
      getOccupation_handle();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={st.container}>
      <AuthHeader
        title={t('Edit Profile')}
        onBack={() => navigation.navigate('Main')}
        gotohome={() => navigation.navigate('Main')}
      />

      <ScrollView>
        <View style={st.pd20} animation={'fadeInRight'} delay={500}>
          <View style={styles.inputContainer}>
            <FloatingInput
              label={t('FULL_NAME')}
              onChangeText={text => handleOnchange(text, 'name')}
              onFocus={() => handleError(null, 'name')}
              error={errors?.name}
              value={inputs.name}
              // iconName={images.user}
              inputsty={st.inputsty}
              placeholderTextColor={'#fff'}
            />

            <FloatingInput
              label={t('Age')}
              onChangeText={text => handleOnchange(text, 'age')}
              onFocus={() => handleError(null, 'age')}
              error={errors?.age}
              value={inputs.age}
              inputsty={st.inputsty}
              keyboardType={'numeric'}
              maxLength={2}
            />

            <RadioButton
              PROP={PROP}
              txtColor={colors.white}
              initialValue={inputs?.gender}
              t={t}
              onSelect={val => {
                handleOnchange(val, 'gender');
              }}
            />

            <View style={[st.picker_sty, st.mt_v]}>
              <RNPickerSelect
                placeholder={{
                  label: t('OCCUP'),
                  value: null,
                }}
                value={selectedLanguage}
                style={selectBoxStyle}
                onValueChange={value => {
                  setSelectedLanguage(value);
                  handleOnchange(value, 'occupation');
                  handleError(null, 'occupation');
                }}
                items={occupList}
                Icon={() => {
                  return (
                    <Icon name="chevron-down" size={20} color={colors.white} />
                  );
                }}
                allowFontScaling={false}
              />
            </View>
            {errors?.occupation && (
              <Text style={[{color: colors.danger, fontSize: 12}]}>
                {errors.occupation}
              </Text>
            )}
            {selectedLanguage == 11 && (
              <FloatingInput
                label={t('OCCUP_NAME')}
                onChangeText={text => handleOnchange(text, 'occupation_name')}
                onFocus={() => handleError(null, 'occupation_name')}
                error={errors?.occupation_name}
                value={inputs.occupation_name}
                inputsty={st.inputsty}
              />
            )}

            <FloatingInput
              label={t('DIST')}
              onChangeText={text => handleOnchange(text, 'district')}
              onFocus={() => handleError(null, 'district')}
              error={errors?.district}
              value={inputs.district}
              inputsty={st.inputsty}
            />

            <FloatingInput
              label={t('Mobil')}
              onChangeText={text => handleOnchange(text, 'userNumber')}
              onFocus={() => handleError(null, 'userNumber')}
              maxLength={10}
              error={errors?.userNumber}
              value={inputs.userNumber}
              // iconName={images.mobile}
              inputsty={st.inputsty}
              keyboardType={'phone-pad'}
            />

            <View style={[st.mt_B]}>
              <Button
                title={t('Update')}
                backgroundColor={colors.lightBlue}
                color={colors.white}
                onPress={() => {
                  if (profileData?.data[0]?.id) {
                    validation();
                  } else {
                    alert(
                      'Please first complete your self-assessment then you will be able to edit your profile',
                    );
                  }
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {show_alert_msg()}
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  inputContainer: {
    // backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

const PROP = [
  {
    key: 'male',
    text: 'Male',
  },
  {
    key: 'female',
    text: 'Female',
  },
  {
    key: 'other',
    text: 'Other',
  },
];

const selectBoxStyle = {
  inputIOS: {
    height: 45,
    color: colors.white,
    paddingHorizontal: 10, // to ensure the text is never behind the icon
    fontSize: 14,
    fontFamily: family.regular,
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
  placeholder: {
    color: colors.white,
    fontSize: 14,
  },
  inputAndroid: {
    height: 45,
    color: colors.white,
    paddingHorizontal: 10, // to ensure the text is never behind the icon
    fontSize: 14,
    fontFamily: family.regular,
  },
};
