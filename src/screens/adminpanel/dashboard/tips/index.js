import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../../global/theme';
import Button from '../../../../components/button';
import AdminInput from '../../../../components/adminInput';
import {API} from '../../../../utils/endpoints';
import {postApi, getApi} from '../../../../utils/apicalls';
import {
  handleAPIErrorResponse,
  ValueEmpty,
} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import Toast from 'react-native-simple-toast';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';

const INITIALINPUT = {
  title: '',
};

const Tips = ({navigation}) => {
  const {t} = useTranslation();
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ageId, setAgeId] = useState();
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

  const validation = () => {
    Keyboard.dismiss();
    const emptyTitle = ValueEmpty(inputs?.title);
    let isValid = true;

    if (emptyTitle) {
      handleError('*Required', 'title');
      isValid = false;
    } else {
      handleError('', 'title');
    }

    if (isValid) {
      addTipHandle();
    }
  };

  const addTipHandle = async () => {
    const url = API.SAVE_TIP;
    const params = {
      // tipid: null,
      desciption: inputs.title,
      status: true,
      ageId: ageId,
      subfeelId: score,
    };
    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      if (result?.status == 201) {
        const data = result.data;
        // console.log({data});
        Toast.show(data.message);
        setIsLoading(false);
        setInputs(INITIALINPUT);
        setAgeId();
        setShow(false);
        setScore();
        setFeeling();
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

  const getData_handle = async () => {
    const url = API.GET_AGE;
    if (Platform.OS == 'android') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    try {
      const result = await getApi(url);
      // console.log({result});
      if (result?.status == 200) {
        setIsLoading(false);
        const data = result.data.reverse();
        const tempdata = data.filter(i => i.ageId != 10);
        // console.log({data});
        setData(tempdata);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getTipsByIdHandle = async id => {
    setInputs(INITIALINPUT);
    const url = API.GET_TIPS_BY_ID + id;
    setIsLoading(true);
    console.log({url});
    try {
      const result = await getApi(url);
      // console.log({result});
      if (result?.status == 200) {
        setIsLoading(false);
        const data = result.data;
        console.log({data});
        const mytitle = {
          title: data?.desciption,
        };
        setInputs(mytitle);
        // setData(data);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      setInputs(INITIALINPUT);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getData_handle();
    getFeelings_handle();
  }, []);

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={t('Tips')}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHome')}
      />
      <ScrollView>
        <View style={st.pd20}>
          {data?.map((i, n) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setShow(true);
                  setAgeId(i.ageId);
                  if(i.ageId == 2){
                    setScore();
                    setFeeling();
                  }
                  // getTipsByIdHandle(i.ageId);
                }}
                style={[styles.picker_sty, {padding: 10}]}>
                <Text
                  style={[
                    st.tx16,
                    {
                      color:
                        ageId == i.ageId ? colors.lightFrozy : colors.lightText,
                    },
                  ]}>
                  {i.name}
                </Text>
              </TouchableOpacity>
            );
          })}

          {ageId == 1 && (
            <View>
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
                <Text style={[st.error, {marginLeft: 0}]}>{feelingErr}</Text>
              </View>

              <View>
                {feeling && (
                  <View>
                    <Text style={[st.tx16, {color: colors.black}]}>
                      Behavior
                    </Text>
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
            </View>
          )}

          {show && (
            <View>
              <AdminInput
                placeholder={'Enter Description'}
                onChangeText={text => handleOnchange(text, 'title')}
                onFocus={() => handleError(null, 'title')}
                error={errors?.title}
                label={'Description'}
                labelColor={colors.lightText}
                multiline
                value={inputs?.title}
                inputsty={{height: 100, alignItems: 'flex-start'}}
              />
            </View>
          )}

          <Button
            title={'Add'}
            onPress={() => {
              // navigation.goBack();
              validation();
            }}
            backgroundColor={colors.lightFrozy}
            color={colors.white}
          />
        </View>
      </ScrollView>
      {isLoading && <Loader />}
    </View>
  );
};

export default Tips;

const styles = StyleSheet.create({
  picker_sty: {
    borderWidth: 1.5,
    borderColor: '#D0DBEA',
    borderRadius: 7,
    // padding: 10,
    marginBottom: 15,
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
