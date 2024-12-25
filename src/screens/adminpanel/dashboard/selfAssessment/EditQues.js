import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AdminStackHeader from '../../../../components/adminStackHeader';
import st from '../../../../global/styles';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../../global/theme';
import Button from '../../../../components/button';
import AdminInput from '../../../../components/adminInput';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';
import {API} from '../../../../utils/endpoints';
import {getApi, postApi} from '../../../../utils/apicalls';
import {
  handleAPIErrorResponse,
  ValueEmpty,
} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import Toast from 'react-native-simple-toast';

const INITIALINPUT = {
  question: '',
};

const INITIAL_Options = [
  {optionenglish: '', points: '', optionhindi: ''},
  {optionenglish: '', points: '', optionhindi: ''},
];
const INITIAL_OptionsErr = [
  {option: '', points: '', optionhindi: ''},
  {option: '', points: '', optionhindi: ''},
];

const AllQues = ({navigation, route}) => {
  const {t} = useTranslation();

  const [admin, setAdmin] = useState(1);
  const [feeling, setFeeling] = useState();
  const [feelingErr, setFeelingErr] = useState('');
  const [feelingList, setFeelingList] = useState([]);
  const [score, setScore] = useState('');
  const [scoreErr, setScoreErr] = useState('');
  const [scoreList, setScoreList] = useState('');
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [showQues, setShowQues] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [optionCheck, setOptionCheck] = useState(false);
  const [feelingquesId, setFeelingquesId] = useState('');
  const [heightInput, setHeightInput] = useState();
  const [data, setData] = useState([]);

  const [options, setOptions] = useState(INITIAL_Options);
  const [optionsErr, setOptionsErr] = useState('');

  const EditData = route?.params?.EditData;

  const feelingId = route?.params?.feelingId;
  const MyfeelingId = route?.params?.MyfeelingId;

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const onChangeTextHandle = (text, index, mode) => {
    const data = [...options];
    if (mode == 'optionenglish') {
      data[index].optionenglish = text;
    } else {
      data[index].points = text;
    }
    console.log({onChangeTextHandle: data});
    setOptions(data);

    if (data?.length >= 2) {
      setOptionCheck(true);
    }

    for (let i = 0; i < data.length; i++) {
      if (i == 0 || i == 1) {
        if (data[i].optionenglish && data[i].points) {
          setOptionCheck(true);
        } else {
          setOptionCheck(false);
        }
      } else {
        if (options[i].optionenglish && options[i].points) {
          console.log('fill value on edition');
          setOptionsErr('');
          setOptionCheck(true);
        } else {
          setOptionsErr('Please add options and there point');
        }
      }
    }
  };

  const OptionSetters = {
    addItem: () => {
      setOptions([...options, {optionenglish: ''}]);
      // setOptionsErr([...optionsErr, {value: ''}]);
    },

    removeItem: index => {
      console.log({index});
      let clonedItems = [...options];

      clonedItems.splice(index, 1);

      setOptions(clonedItems);
    },
  };

  const validation = () => {
    const emptyFeel = ValueEmpty(feeling);
    const emptysubFeel = ValueEmpty(score?.toString());

    let isValid = true;

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

    if (isValid) {
      setShowQues(true);
    }
  };

  const question_Validation = () => {
    const emptyQues = ValueEmpty(inputs?.question);
    let isValid = true;

    if (emptyQues) {
      handleError('*Required', 'question');
      isValid = false;
    } else {
      handleError('', 'question');
    }

    for (let i = 0; i < options.length; i++) {
      if (i == 0 || i == 1) {
        if (options[i].optionenglish && options[i].points) {
          setOptionsErr('');
        } else {
          setOptionsErr('Add at least 2 options and their points');
          isValid = false;
        }
      } else {
        if (options[i].optionenglish && options[i].points) {
          console.log('fill value');
          setOptionsErr('');
          isValid = true;
        } else {
          setOptionsErr(
            'Something went wrong, please check options and points',
          );
          isValid = false;
        }
      }
    }

    console.log({options});

    if (isValid) {
      const result = options.every(
        item => item.optionenglish != '' && item.points != '',
      );
      if (result) {
        updateQuestionHandle();
      } else {
        setOptionsErr('Something went wrong, please check options and points');
      }
    }
  };

  const getFeelings_handle = async () => {
    const url = API.GET_FEELINGS + '10';
    // console.log({url});
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
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
    // console.log({url, value});
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
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

  const updateQuestionHandle = async () => {
    const tempOpt = options.map(
      ({optionenglish: option, points: point, ...rest}) => ({
        option,
        point,
        ...rest,
      }),
    );

    const url = API.ADD_QUES;
    const params = {
      subFeelingId: score,
      feelingQuestionDTO: [
        {
          feelquesid: feelingquesId,
          question: inputs?.question,
          hindiquestion: '',
          hindianswer: '',
          answer: '',
          options: tempOpt,
        },
      ],
    };
    console.log({url, params});
    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      console.log({result});
      if (result?.status == 201) {
        const data = result.data;
        console.log({data});
        Toast.show(data.message);
        navigation.goBack();
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log({e});
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getDataById = () => {
    const data = EditData;
    console.log('------------------edit data-------------------');
    console.log({data});
    if (data) {
      setShowQues(true);
      const mytitle = {question: data.englishquestion};
      setInputs(mytitle);
      setOptions(data?.options);
      setFeelingquesId(data?.feelquesid);
      if (data?.options?.length >= 2) {
        setOptionCheck(true);
      }
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
        const data = result.data;
        // console.log({data});
        const tempdata = [];
        for (i = 0; i < data.length; i++) {
          let obj = {
            label: data[i].name,
            value: data[i].ageId,
          };
          tempdata.push(obj);
        }
        const mydata = tempdata.filter(i => i.ageId != 10);
        setData(mydata);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    console.log({});
    getData_handle();
    getFeelings_handle();
    getDataById();
    if (MyfeelingId) {
      setFeeling(MyfeelingId);
    }

    if (feelingId) {
      setScore(feelingId);
    }
  }, []);

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={'Edit Question'}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />
      <ScrollView>
        <View style={st.pd20}>
          <View style={[styles.picker_sty, st.mt_v]}>
            <RNPickerSelect
              placeholder={{
                label: 'Select Age Group',
                value: null,
              }}
              style={selectBoxStyle}
              onValueChange={value => setAdmin(value)}
              items={data}
              Icon={() => {
                return <Icon name="chevron-down" size={20} />;
              }}
              disabled
              value={admin}
              allowFontScaling={false}
            />
          </View>

          <View style={[styles.picker_sty, st.mt_v]}>
            <RNPickerSelect
              placeholder={{
                label: 'Select sub type',
                value: null,
              }}
              style={selectBoxStyle}
              onValueChange={value => {
                setFeeling(value);
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
          <Text style={st.error}>{feelingErr}</Text>

          {feeling && (
            <View>
              <View style={[styles.picker_sty, st.mt_v]}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Select behavior',
                    value: null,
                  }}
                  style={selectBoxStyle}
                  onValueChange={value => {
                    console.log({value});
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

          <Button
            title={'Add Questions'}
            onPress={() => {
              validation();
            }}
            backgroundColor={colors.lightFrozy}
            color={colors.white}
          />

          {showQues && (
            <View>
              <View style={styles.boxsty}>
                <Text
                  style={[
                    st.tx16,
                    st.mt_B,
                    st.txAlignC,
                    {color: colors.black},
                  ]}>
                  Question
                </Text>

                <View style={st.mt_t10}>
                  <AdminInput
                    placeholder={'Enter here'}
                    onChangeText={text => {
                      handleOnchange(text, 'question');
                    }}
                    onContentSizeChange={event =>
                      setHeightInput(event.nativeEvent.contentSize.height)
                    }
                    onFocus={() => handleError(null, 'question')}
                    error={errors?.question}
                    iconName={''}
                    label={'Question'}
                    labelColor={colors.lightText}
                    value={inputs.question}
                    multiline={true}
                    inputsty={{height: heightInput ? heightInput : 48}}
                  />
                </View>
                <View style={st.mt_t10}>
                  {options?.map((i, n) => {
                    return (
                      <View style={st.row}>
                        <View style={[st.wdh60, st.mr_10]}>
                          <AdminInput
                            placeholder={`Enter Option ${n + 1}`}
                            onChangeText={text =>
                              onChangeTextHandle(text, n, 'optionenglish')
                            }
                            // onFocus={() => handleOptionsError(null, n)}
                            // error={optionsErr[n]?.value}
                            iconName={''}
                            label={`Option ${n + 1}`}
                            labelColor={colors.lightText}
                            value={options[n].optionenglish}
                          />
                        </View>
                        <View style={[st.wdh30]}>
                          <AdminInput
                            placeholder={`Points`}
                            labelColor={colors.lightText}
                            onChangeText={text => {
                              onChangeTextHandle(text, n, 'points');
                              if (n == 1) {
                                setOptionsErr(false);
                              }
                            }}
                            // onFocus={() => handleOptionsError(null, n)}
                            maxLength={2}
                            // error={optionsErr[n]?.value}
                            iconName={''}
                            label={`Points`}
                            keyboardType={'numeric'}
                            value={options[n].points}
                          />
                        </View>
                        <View>
                          {options.length > 2 && n > 1 && (
                            <View style={{marginTop: 50}}>
                              <Pressable
                                onPress={() => OptionSetters?.removeItem(n)}>
                                <Icon
                                  name={'trash'}
                                  size={20}
                                  color={colors.danger}
                                />
                              </Pressable>
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  })}
                  {optionsErr != '' && (
                    <Text style={st.error}>{optionsErr}</Text>
                  )}
                  {optionCheck == true && options?.length < 10 && (
                    <View style={st.align_C}>
                      <Button
                        title={'Add more options'}
                        onPress={() => {
                          OptionSetters?.addItem();
                        }}
                        backgroundColor={colors.lightFrozy}
                        color={colors.white}
                      />
                    </View>
                  )}
                </View>
              </View>

              <Button
                title={t('SUBMIT')}
                onPress={() => {
                  question_Validation();
                }}
                backgroundColor={colors.lightFrozy}
                color={colors.white}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {isLoading && <Loader />}
    </View>
  );
};

export default AllQues;

const styles = StyleSheet.create({
  picker_sty: {
    borderWidth: 1.5,
    borderColor: '#D0DBEA',
    borderRadius: 7,
  },
  boxsty: {
    borderWidth: 0.5,
    borderColor: colors.lightText,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 20,
    // elevation: 1,
    padding: 15,
    marginTop: 20,
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
    fontSize: 14,
    paddingHorizontal: 10, // to ensure the text is never behind the icon
  },
};
