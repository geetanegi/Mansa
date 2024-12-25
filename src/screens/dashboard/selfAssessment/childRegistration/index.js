import {StyleSheet, Text, ScrollView, Keyboard, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../../global/styles';
import {useTranslation, I18n} from 'react-i18next';
import AuthHeader from '../../../../components/Auth_Header';
import {View} from 'react-native-animatable';
import Button from '../../../../components/button';
import {colors} from '../../../../global/theme';
import Footer from '../../../../components/footer';
import FloatingInput from '../../../../components/floating_Input';
import RNPickerSelect from 'react-native-picker-select';
import Loader from '../../../../components/loader';
import RadioButton from '../../../../components/radio_button';
import {family} from '../../../../global/fonts';
import Icon from 'react-native-vector-icons/Feather';
import {
  ValueEmpty,
  ValidateName,
  specialCharactorRemove,
  validateAge,
  dateFormet,
} from '../../../../utils/helperfunctions/validations';
import {languageConversion} from '../../../../utils/helperfunctions/functions';
import {getApi, postApi} from '../../../../utils/apicalls';
import {API} from '../../../../utils/endpoints';
import {useDispatch, useSelector} from 'react-redux';

const INITIALINPUT = {
  name: '',
  age: '',
  gender: '',
  occupation_name: '',
  occupation: '',
  physicalproblem: '',
  physicalIssue: '',
  otherDisorder: '',
  district: '',
};

const ChildRegistration = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  const ageId = route?.params?.ageId;
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [occupList, setOccupList] = useState([
    {label: t('Yes'), value: 1},
    {label: t('No'), value: 2},
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedPhysical, setSelectedPhysical] = useState();
  const [selectedPhysicalIssue, setSelectedPhysicalIssue] = useState();
  const [physicalList, setPhysicalList] = useState([]);
  const [physicalListHindi, setPhysicalListHindi] = useState([]);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    Keyboard.dismiss();
    const emptyAge = ValueEmpty(inputs?.age?.toString());
    const emptyGender = ValueEmpty(inputs.gender);
    const emptyOcc_name = ValueEmpty(inputs.occupation_name?.toString());
    const validOcc_name = specialCharactorRemove(inputs?.occupation_name, t);
    const emptyPhysicalIssue = ValueEmpty(inputs.physicalIssue?.toString());
    const validAge = validateAge(inputs?.age, t);
    const validName = ValidateName(inputs?.name, t);
    const validOtherDis = ValidateName(inputs?.otherDisorder, t);
    const validDistrict = ValidateName(inputs?.district, t)

    let isValid = true;
    console.log({validAge});

    if (emptyAge) {
      handleError(t('Required'), 'age');
      isValid = false;
    } else if (validAge != 'success') {
      handleError(validAge, 'age');
      isValid = false;
    } else if (inputs?.age > 0 && inputs?.age <= 18) {
      handleError('', 'age');
    } else {
      handleError(t('AGE18'), 'age');
      isValid = false;
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
      if (validDistrict == 'success') {
        handleError('', 'district');
      } else {
        handleError(validDistrict, 'district');
        isValid = false;
      }
    }

    if (selectedPhysicalIssue == 12) {
      if (validOtherDis == 'success') {
        handleError('', 'otherDisorder');
      } else {
        handleError(validOtherDis, 'otherDisorder');
        isValid = false;
      }
      console.log('oyher disorder', inputs?.otherDisorder);
    }

    if (emptyGender) {
      handleError(t('Required'), 'gender');
      isValid = false;
    } else {
      handleError('', 'gender');
    }

    if (!inputs?.occupation) {
      handleError(t('Required'), 'occupation');
      isValid = false;
    } else {
      handleError('', 'occupation');
    }

    if (selectedLanguage == 1) {
      if (emptyOcc_name) {
        handleError(t('Required'), 'occupation_name');
        isValid = false;
      } else {
        if (validOcc_name == 'success') {
          handleError('', 'occupation_name');
        } else {
          handleError(validOcc_name, 'occupation_name');
          isValid = false;
        }
      }
    }

    if (!inputs?.physicalproblem) {
      handleError(t('Required'), 'physicalproblem');
      isValid = false;
    } else {
      handleError('', 'physicalproblem');
    }

    if (selectedPhysical == 1) {
      if (selectedPhysicalIssue == null) {
        handleError(t('Required'), 'physicalIssue');
        isValid = false;
      } else {
        handleError('', 'physicalIssue');
      }
    }

    if (isValid) {
      const disorder = physicalList.find(i => i.value == selectedPhysicalIssue);
      const childDetails = {
        childName: inputs.name,
        childAge: inputs?.age,
        gender: inputs?.gender,
        district: inputs?.district,
        disorder:
          selectedPhysical == 1
            ? inputs?.otherDisorder
              ? null
              : {
                  disorderId: selectedPhysicalIssue,
                  disorderName: disorder?.label,
                }
            : null,
        study: selectedLanguage == 1 ? inputs?.occupation_name : null,
        otherdisorder: inputs?.otherDisorder ? inputs?.otherDisorder : null,
        nostudy: selectedLanguage != 1 ? 'No Study' : null,
      };

      console.log({childDetails});
      navigation.navigate('Questions', {
        ageId: ageId,
        childDetails: childDetails,
      });
    }
  };

  const getOccupation_handle = async () => {
    const url = API.Get_DISORDER;

    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        const tempList = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            label: data[i].disorderName,
            value: data[i].disorderId,
          };
          tempList.push(obj);
        }
        setPhysicalList(tempList);

        const tempListHindi = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            label: data[i].hindiDisorderName,
            value: data[i].disorderId,
          };
          tempListHindi.push(obj);
        }
        setPhysicalListHindi(tempListHindi);

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
    getOccupation_handle();
  }, []);

  return (
    <View style={st.container}>
      <AuthHeader
        title={t('SELF_ASSESS')}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={st.pd20} animation="fadeInRight">
          <Text style={st.tx16}>{t('CHILD_TITLE')}</Text>
          <View>
            <FloatingInput
              label={t('Child Name')}
              onChangeText={text => handleOnchange(text, 'name')}
              onFocus={() => handleError(null, 'name')}
              error={errors?.name}
              value={inputs.name}
              // iconName={images.user}
              inputsty={st.inputsty}
              placeholderTextColor={'#fff'}
            />

            <FloatingInput
              label={t('DIST')}
              onChangeText={text => handleOnchange(text, 'district')}
              onFocus={() => handleError(null, 'district')}
              error={errors?.district}
              value={inputs?.district}
              inputsty={st.inputsty}
            />

            <View style={[st.row, st.justify_S, st.align_C]}>
              <View style={st.wdh90}>
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
              </View>
              <Text style={{fontSize: 24, color: colors.red}}>❋</Text>
            </View>

            <View style={[st.row, st.justify_S, st.align_C]}>
              <View style={st.wdh90}>
                <RadioButton
                  PROP={PROP}
                  initialValue={inputs?.gender}
                  t={t}
                  txtColor={colors.white}
                  onSelect={val => {
                    handleOnchange(val, 'gender');
                    handleError('', 'gender');
                  }}
                />
                {errors?.gender && (
                  <Text style={[st.tx12, {color: 'red'}]}>
                    {errors?.gender}
                  </Text>
                )}
              </View>
              <Text style={{fontSize: 24, color: colors.red}}>❋</Text>
            </View>

            <View style={[st.row, st.justify_S, st.align_C]}>
              <View style={st.wdh90}>
                <Text style={[st.tx14, st.mt_t10]}>{t(`Studying or not`)}</Text>
                <View style={[st.picker_sty, st.mt_v]}>
                  <RNPickerSelect
                    placeholder={{
                      label: t('Select'),
                      value: null,
                    }}
                    style={selectBoxStyle}
                    onValueChange={value => {
                      console.log({value});
                      setSelectedLanguage(value);
                      handleOnchange(value, 'occupation');
                      handleError(null, 'occupation');
                      if (value == null) {
                        setInputs({...inputs, occupation_name: ''});
                      }
                    }}
                    items={occupList}
                    Icon={() => {
                      return (
                        <Icon
                          name="chevron-down"
                          size={20}
                          color={colors.white}
                        />
                      );
                    }}
                    allowFontScaling={false}
                    useNativeAndroidPickerStyle={false}
                  />
                </View>
                {errors?.occupation && (
                  <Text style={[{color: colors.danger, fontSize: 12}]}>
                    {errors.occupation}
                  </Text>
                )}
              </View>
              <Text style={{fontSize: 24, color: colors.red}}>❋</Text>
            </View>
          </View>

          {selectedLanguage == 1 && (
            <View style={[st.row, st.justify_S, st.align_C]}>
              <View style={st.wdh90}>
                <FloatingInput
                  label={t('If yes in which standard')}
                  onChangeText={text => handleOnchange(text, 'occupation_name')}
                  onFocus={() => handleError(null, 'occupation_name')}
                  error={errors?.occupation_name}
                  value={inputs.occupation_name}
                  inputsty={st.inputsty}
                />
              </View>
              <Text style={{fontSize: 24, color: colors.red}}>❋</Text>
            </View>
          )}

          <View style={[st.row, st.justify_S, st.align_C]}>
            <View style={st.wdh90}>
              <Text style={[st.tx14, st.mt_t10]}>{t(`physical problem:`)}</Text>
              <View style={[st.picker_sty, st.mt_v]}>
                <RNPickerSelect
                  placeholder={{
                    label: t('Select'),
                    value: null,
                  }}
                  style={selectBoxStyle}
                  onValueChange={value => {
                    setSelectedPhysical(value);
                    handleOnchange(value, 'physicalproblem');
                    handleError(null, 'physicalproblem');
                    setSelectedPhysicalIssue(null);
                  }}
                  items={occupList}
                  Icon={() => {
                    return (
                      <Icon
                        name="chevron-down"
                        size={20}
                        color={colors.white}
                      />
                    );
                  }}
                  allowFontScaling={false}
                  useNativeAndroidPickerStyle={false}
                />
              </View>
              {errors?.physicalproblem && (
                <Text style={[{color: colors.danger, fontSize: 12}]}>
                  {errors.physicalproblem}
                </Text>
              )}
            </View>
            <Text style={{fontSize: 24, color: colors.red}}>❋</Text>
          </View>

          {selectedPhysical == 1 && (
            <View>
              <Text style={[st.tx14, st.mt_t10]}>{t('SelectPhysical')}</Text>
              <View style={[st.row, st.justify_S, st.align_C]}>
                <View style={st.wdh90}>
                  <View style={[st.picker_sty, st.mt_v]}>
                    <RNPickerSelect
                      placeholder={{
                        label: t('Select'),
                        value: null,
                      }}
                      style={selectBoxStyle}
                      onValueChange={value => {
                        setSelectedPhysicalIssue(value);
                        handleOnchange(value, 'physicalIssue');
                        handleError(null, 'physicalIssue');
                        setInputs({...inputs, otherDisorder: ''});
                      }}
                      items={lang == 'hi' ? physicalListHindi : physicalList}
                      Icon={() => {
                        return (
                          <Icon
                            name="chevron-down"
                            size={20}
                            color={colors.white}
                          />
                        );
                      }}
                      allowFontScaling={false}
                      useNativeAndroidPickerStyle={false}
                    />
                  </View>
                  {errors?.physicalIssue && (
                    <Text style={[{color: colors.danger, fontSize: 12}]}>
                      {errors.physicalIssue}
                    </Text>
                  )}
                </View>
                <Text style={{fontSize: 24, color: colors.red}}>❋</Text>
              </View>
            </View>
          )}

          {selectedPhysicalIssue == 12 && (
            <View style={[st.row, st.justify_S, st.align_C]}>
              <View style={st.wdh90}>
                <FloatingInput
                  label={t('otherDisorder')}
                  onChangeText={text => handleOnchange(text, 'otherDisorder')}
                  onFocus={() => handleError(null, 'otherDisorder')}
                  error={errors?.otherDisorder}
                  value={inputs.otherDisorder}
                  inputsty={st.inputsty}
                />
              </View>
              <Text style={{fontSize: 24, color: colors.red}}>❋</Text>
            </View>
          )}

         <Text style={st.tx14}>{t('mandatory')}</Text>

          <View>
            <Button
              title={t('SUBMIT')}
              backgroundColor={colors.lightBlue}
              color={colors.white}
              onPress={() => {
                validation();
                // navigation.navigate('Questions', {ageId: ageId})
              }}
            />
          </View>
         
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ChildRegistration;

const styles = StyleSheet.create({});

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
    paddingHorizontal: 20, // to ensure the text is never behind the icon
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
    paddingHorizontal: 20, // to ensure the text is never behind the icon
    fontSize: 14,
    fontFamily: family.regular,
  },
};
