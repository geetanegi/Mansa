import {StyleSheet, Text, View, ScrollView, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import {useTranslation} from 'react-i18next';
import Button from '../../../../components/button';
import AdminInput from '../../../../components/adminInput';
import {colors} from '../../../../global/theme';
import {API} from '../../../../utils/endpoints';
import {getApi, postApi, putApi} from '../../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import {ValueEmpty} from '../../../../utils/helperfunctions/validations';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';

const INITIALINPUT = {
  title: '',
  desc: '',
  link: '',
};

const AddVdo = ({navigation, route}) => {
  const {t} = useTranslation();
  const edit = route?.params?.edit;
  const id = route?.params?.id;

  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [admin, setAdmin] = useState(1);
  const [data, setData] = useState([]);
  const [feeling, setFeeling] = useState('');
  const [feelingErr, setFeelingErr] = useState('');
  const [feelingList, setFeelingList] = useState([]);
  const [score, setScore] = useState('');
  const [scoreErr, setScoreErr] = useState('');
  const [scoreList, setScoreList] = useState('');

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const youtubeValidations = url => {
    var p =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var validURL = url?.match(p);
    if (validURL) {
      return false;
    }
    return true;
  };

  const validation = () => {
    Keyboard.dismiss();
    const emptyTitle = ValueEmpty(inputs?.title);
    const emptyDesc = ValueEmpty(inputs?.desc);
    const emptyLink = ValueEmpty(inputs?.link);
    const validLink = youtubeValidations(inputs?.link);
    const emptyFeel = ValueEmpty(feeling?.toString());
    const emptysubFeel = ValueEmpty(score?.toString());

    let isValid = true;

    if (emptyTitle) {
      handleError('*Required', 'title');
      isValid = false;
    } else {
      handleError('', 'title');
    }

    if (emptyDesc) {
      handleError('*Required', 'desc');
      isValid = false;
    } else {
      handleError('', 'desc');
    }

    if (emptyFeel) {
      setFeelingErr('*Required');
      isValid = false;
    } else {
      setFeelingErr('');
    }

    if (emptysubFeel) {
      setScoreErr('*Required');
      isValid = false;
    } else {
      setScoreErr('');
    }

    if (emptyLink) {
      handleError('*Required', 'link');
      isValid = false;
    } else if (validLink) {
      handleError('*Invalid url', 'link');
      isValid = false;
    } else {
      handleError('', 'link');
    }

    if (isValid) {
      if (edit) {
        updateVideoHandle(id);
      } else {
        addVideos();
      }
    }
  };

  const getRole_handle = async () => {
    const url = API.GET_AGE;
    console.log({url});
    try {
      if (Platform.OS == 'android') {
        // setIsLoading(true);
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
            label: data[i].name,
            value: data[i].ageId,
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

  const addVideos = async () => {
    const url = API.ADD_VDO;
    const params = {
      description: inputs?.desc,
      videoType: inputs?.title,
      url: inputs?.link,
      ageId: admin,
      subfeelId: score,
    };
    // console.log({url, params});

    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      if (result?.status == 200) {
        const data = result.data;
        setIsLoading(false);
        setInputs(INITIALINPUT);
        navigation.goBack();
        Toast.show(data.message);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const updateVideoHandle = async id => {
    const url = API.UPDATE_VDO + id;
    const params = {
      description: inputs?.desc,
      videoType: inputs?.title,
      url: inputs?.link,
    };

    console.log({url, params});

    try {
      setIsLoading(true);
      const result = await putApi(url, params);
      if (result?.status == 200) {
        const data = result.data;
        setIsLoading(false);
        setInputs(INITIALINPUT);
        navigation.goBack();
        Toast.show(data.message);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getVideoByIdHandle = async () => {
    const url = API.GET_VDOBYID + id;
    console.log({url});
    try {
      setIsLoading(true);
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log('getVideoById', data);
        const myData = {
          title: data.videoType,
          desc: data.description,
          link: data.url,
        };
        setIsLoading(false);
        setInputs(myData);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getFeelings_handle = async () => {
    const url = API.GET_FEELINGS + '10';
    // console.log({url});
    try {
      if (Platform.OS == 'android') {
        // setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({data});
        let tempdata = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            label: data[i].feelingType,
            value: data[i].feelingId,
          };
          tempdata.push(obj);
        }
        console.log({tempdata});
        setFeelingList(tempdata);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getSubFeelings_handle = async value => {
    const url = API.GET_SUB_FEEL + value;
    console.log({url, value});
    try {
      if (Platform.OS == 'android') {
        // setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log('subfeelings data', data);
        let tempdata = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            label: data[i].subFeelType,
            value: data[i].subFeelingId,
          };
          tempdata.push(obj);
        }
        console.log({subfeeldata: tempdata});

        setScoreList(tempdata);
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
    if (edit) {
      getVideoByIdHandle();
    }
    getRole_handle();
    getSubFeelings_handle();
    getFeelings_handle();
  }, []);

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={edit ? t('EditVdo') : t('AddVideo')}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />
      <ScrollView>
        <View style={st.pd20}>
          <View style={st.mt_t10}>
            <AdminInput
              placeholder={'Title'}
              onChangeText={text => handleOnchange(text, 'title')}
              onFocus={() => handleError(null, 'title')}
              error={errors?.title}
              iconName={''}
              label={'Title'}
              labelColor={colors.black}
              value={inputs.title}
            />
          </View>
          <View style={st.mt_v}>
            <Text style={[st.tx16, {color: colors.black}]}>Age Group</Text>
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
          </View>

          <View style={st.mt_t10}>
            <Text style={[st.tx16, {color: colors.black}]}>Sub Type</Text>
            <View style={[styles.picker_sty, st.mt_t10]}>
              <RNPickerSelect
                placeholder={{
                  label: 'Select sub type',
                  value: null,
                }}
                style={selectBoxStyle}
                onValueChange={value => {
                  setFeeling(value);
                  console.log({feeling});
                  setFeelingErr('');
                  if (value) getSubFeelings_handle(value);
                }}
                items={feelingList}
                Icon={() => {
                  return <Icon name="chevron-down" size={20} />;
                }}
                value={feeling}
                allowFontScaling={false}
              />
            </View>
            <Text style={[st.error,{marginLeft:0}]}>{feelingErr}</Text>
          </View>

          <View >
            {feeling && (
              <View>
                <Text style={[st.tx16, {color: colors.black}]}>Behavior</Text>
                <View style={[styles.picker_sty, st.mt_v]}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Select behavior',
                      value: null,
                    }}
                    style={selectBoxStyle}
                    onValueChange={value => {
                      console.log({score});
                      setScore(value);
                      setScoreErr();
                    }}
                    items={scoreList}
                    Icon={() => {
                      return <Icon name="chevron-down" size={20} />;
                    }}
                    value={score}
                    allowFontScaling={false}
                  />
                </View>
                <Text style={st.error}>{scoreErr}</Text>
              </View>
            )}
          </View>

          <View style={st.mt_t10}>
            <AdminInput
              placeholder={'Description'}
              onChangeText={text => handleOnchange(text, 'desc')}
              onFocus={() => handleError(null, 'desc')}
              error={errors?.desc}
              iconName={''}
              label={'Description'}
              labelColor={colors.black}
              multiline
              value={inputs?.desc}
            />
          </View>

          <View style={st.mt_t10}>
            <AdminInput
              placeholder={'Link'}
              onChangeText={text => handleOnchange(text, 'link')}
              onFocus={() => handleError(null, 'link')}
              error={errors?.link}
              iconName={''}
              label={'Link'}
              labelColor={colors.black}
              value={inputs?.link}
            />
          </View>

          <Button
            title={t('SUBMIT')}
            backgroundColor={colors.lightFrozy}
            color={colors.white}
            onPress={() => validation()}
          />
        </View>
      </ScrollView>
      {isLoading && <Loader />}
    </View>
  );
};

export default AddVdo;

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
