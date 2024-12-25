import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  ScrollView,
  Image,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AuthHeader from '../../../components/Auth_Header';
import st from '../../../global/styles';
import Footer from '../../../components/footer';
import {useTranslation, I18n} from 'react-i18next';
import {colors, images} from '../../../global/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import PopUpMessage from '../../../components/popup';
import {useIsFocused} from '@react-navigation/native';
import {API} from '../../../utils/endpoints';
import {getApi, postApi} from '../../../utils/apicalls';
import Loader from '../../../components/loader';
import {
  handleAPIErrorResponse,
  dateFormet,
} from '../../../utils/helperfunctions/validations';
import {useDispatch, useSelector} from 'react-redux';
import DeletePopUp from '../../../components/deletePopUp';
import {useFocusEffect} from '@react-navigation/native';
import {languageConversion} from '../../../utils/helperfunctions/functions';

const QuizScreen = ({route}) => {
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const feelingId = route?.params?.feelingId;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lang, setLang] = useState(i18n.language);
  const [message, setMessage] = useState('');
  const totalQuestions = data?.length;
  const [score, setScore] = useState();
  const [index, setIndex] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [delete_popupMessageVisibility, setDelete_popupMessageVisibility] =
    useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [contact_1, setContact_1] = useState();
  const [contact_2, setContact_2] = useState();

  const profileData = useSelector(state => state.profile?.data);
  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (
        selectedAnswerIndex?.trim() === currentQuestion?.englishAnswer?.trim()
      ) {
      } else {
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  const currentQuestion = data[index];

  const getCountPoint = (id, optIndex) => {
    let templist = [...data];
    let newInd = templist.findIndex(i => i.feelquesid == id);
    const mydata = templist[newInd];
    if (mydata) {
      mydata.checkIndex = optIndex;
      setData(templist);
    }
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
    setIndex(0);
  }, [isFocused]);

  useEffect(() => {
    return setPopupMessageVisibility(false);
  }, []);

  const getQuestions = async () => {
    let url = '';
    url = API.GET_FEEL_QUES + feelingId;
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        var sortArr = data.sort(function (a, b) {
          return a.seq - b.seq;
        });
        setData(sortArr);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const saveScoreHandle = async () => {
    const date = dateFormet();
    const url = `${API.SAVE_SCORE_SUBFEEL}`;
    const params = {
      subfeelingscoreId: null,
      score: score,
      sysid: profileData?.data[0]?.id,
      submitdate: date,
      active: true,
      occid: profileData?.data[0]?.occid,
      subfeelingid: feelingId,
      ageid: 1,
      age: profileData?.data[0]?.age,
      languageID: lang == 'hi' ? 1 : 2,
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
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const scoreDescription = async totalPoint => {
    const url = `${
      API.SCORE_DESC_FEEL
    }/${feelingId}/${totalPoint}/${languageConversion(i18n)}`;
    setMessage('');
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        if (data) {
          setMessage(
            lang == 'hi' ? data[0]?.hindidesciption : data[0]?.description,
          );
          setContact_1(data[0]?.contact1);
          setContact_2(data[0]?.contact2);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const handleBackPress = () => {
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );

      return () => backHandler.remove();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        question_OnBack,
      );
      return () => backHandler.remove();
    }, []),
  );

  useEffect(() => {
    getQuestions();
  }, []);

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
          navigation.navigate('SubfeelSugg', {
            score: score,
            ageId: 1,
            feelingId: feelingId,
          });
          saveScoreHandle();
        }}
        gotoSuggestion={() => {
          setPopupMessageVisibility(false);
        }}
        twoButton={false}
        box={true}
        message={message}
        contact1={lang != 'hi' && contact_1}
        contact2={lang != 'hi' && contact_2}
      />
    );
  };

  const render_text = () => {
    return (
      <View>
        <Text style={[st.question_heading]}>
          {feelingId == 9 && (lang == 'hi' ? female_sex_hindi : female_sex)}
          {feelingId == 17 && (lang == 'hi' ? somatic_des_hindi : somatic_des)}

          {(feelingId == 8 ||
            feelingId == 14 ||
            feelingId == 11 ||
            feelingId == 6 ||
            feelingId == 16 ||
            feelingId == 15 ||
            feelingId == 4 ||
            feelingId == 2) &&
            (lang == 'hi' ? psychosis_des_hindi : male_sex)}
        </Text>

        {(feelingId == 1 || feelingId == 3) && (
          <View>
            {lang == 'hi' ? (
              <Text style={[st.question_heading]}>
                <Text style={[st.txbold, {color: colors.danger}]}>
                  पिछले 2 सप्ताहों,
                </Text>{' '}
                के बारे में सोचते हुए, आपको निम्नलिखित चीज़ें किस हद तक
                समस्यापूर्ण लगीं?
              </Text>
            ) : (
              <Text style={[st.question_heading]}>
                Thinking about the{' '}
                <Text style={[st.txbold, {color: colors.danger}]}>
                  past 2 weeks,
                </Text>{' '}
                to what extent has you found the following things a problem?
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  const show_question_msg = value => {
    return (
      <DeletePopUp
        display={delete_popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          setDelete_popupMessageVisibility(value);
        }}
        onPress_api={() => navigation.goBack()}
        dialogColor={colors.blue}
      />
    );
  };

  const question_OnBack = () => {
    const tempdata = [...data];
    const mydata = tempdata.every(item => item.checkIndex != null);
    if (mydata && score) {
      navigation.goBack();
    } else {
      setTitle(t('Are you sure'));
      setSubtitle(t('qus_sub'));
      setDelete_popupMessageVisibility(true);
    }
  };

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('SELF_ASSESS')}
        onBack={() => question_OnBack()}
        auth={true}
      />
      <ScrollView>
        <View style={st.pd20}>
          <View>
            {index == 0 && render_text()}
            <View style={[st.pd10, st.mt_t10]}>
              <Text style={[st.tx18, {color: colors.danger}]}>
                {index + 1}.{' '}
                {lang == 'hi'
                  ? currentQuestion?.hindiquestion
                  : currentQuestion?.englishquestion}
              </Text>
            </View>

            <View style={[st.row, st.align_C, st.mt_t10]}>
              <View>
                {currentQuestion?.options?.map(
                  (item, i) =>
                    (item?.optionhindi || item?.optionenglish) && (
                      <View style={[st.row, st.align_C]}>
                        <Text
                          style={{
                            borderColor: colors.blue,
                            textAlign: 'center',
                            borderWidth: 1.5,
                            width: 30,
                            height: 30,
                            borderRadius: 20,
                            padding: 3,
                            color: '#000',
                            marginRight: 10,
                          }}>
                          {i + 1}
                        </Text>
                        <Pressable
                          style={styles.ans_box}
                          onPress={() => {
                            setSelectedAnswerIndex(item.optionenglish);
                            getCountPoint(currentQuestion.feelquesid, i);
                          }}>
                          <View style={st.row}>
                            <View style={styles.ans_con}>
                              <Pressable
                                style={styles.radioCircle}
                                onPress={() => {
                                  setSelectedAnswerIndex(item.optionenglish);
                                  getCountPoint(item.feelquesid, i);
                                }}>
                                <View
                                  style={[
                                    styles.selectedRb,
                                    currentQuestion?.checkIndex == i
                                      ? {
                                          backgroundColor: 'green',
                                        }
                                      : null,
                                  ]}
                                />
                              </Pressable>

                              <Text
                                style={[
                                  st.tx16,
                                  st.ml_15,
                                  {color: colors.white},
                                ]}>
                                {lang == 'hi'
                                  ? item.optionhindi
                                  : item.optionenglish}
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      </View>
                    ),
                )}
              </View>
            </View>
          </View>

          <Text
            style={[
              st.tx16,
              st.txAlignR,
              {color: colors.black, marginTop: '5%'},
            ]}>
            {index + 1}/{totalQuestions}
          </Text>

          <View style={[st.row, st.justify_S, {marginTop: '15%'}]}>
            <View>
              {index != 0 && (
                <Pressable
                  style={styles.Nextsty}
                  onPress={() => setIndex(index - 1)}>
                  <Icon name={'chevron-left'} size={30} color={colors.white} />
                </Pressable>
              )}
            </View>

            {currentQuestion?.checkIndex == null ? null : (
              <Pressable
                style={styles.Nextsty}
                onPress={() => {
                  if (index + 1 < data?.length) {
                    setIndex(index + 1);
                  } else {
                    let totalPoint = 0;
                    for (let i = 0; i < data.length; i++) {
                      for (j = 0; j < data[i].options.length; j++) {
                        if (data[i].checkIndex === j) {
                          totalPoint += parseInt(data[i].options[j].points);
                        }
                      }
                    }

                    setScore(totalPoint);
                    setSubtitle(totalPoint);
                    scoreDescription(totalPoint);
                    setTitle(t('TotalScore'));
                    setPopupMessageVisibility(true);
                  }
                }}>
                {index + 1 >= data.length ? (
                  <Text style={[st.tx16, {color: colors.white}]}>
                    {t('Done')}
                  </Text>
                ) : (
                  <Icon name={'chevron-right'} size={30} color={colors.white} />
                )}
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
      {show_alert_msg()}
      {show_question_msg()}
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default QuizScreen;

const psychosis_des_hindi =
  'इन प्रश्नों के द्वारा बतायें कि विगत दो सप्ताहों में आपने निम्न लक्षण किस स्तर तक अनुभव किये हैंं|';

const male_sex =
  'Read the following statements and indicate whether they are appropriate or not for you.';

const female_sex =
  'Thinking about the last month, answer the following questions about your sexual feelings and activity';
const female_sex_hindi =
  'पिछले महीने के बारे में सोचते हुए, अपनी यौन भावनाओं और गतिविधि के बारे में निम्नलिखित प्रश्नों के उत्तर दें';

const somatic_des_hindi =
  'यदि आपने पिछले 02 सप्ताह के दौरान अस्पष्ट से दर्द या कोई बीमारी का अनुभव किया हैं तो आप इन प्रश्नों के द्वारा बतायें कि विगत 07 दिवसों में आपने निम्न लक्षण किस हद तक अनुभव किये हैंं?';
const somatic_des =
  'If you have experienced unexplained pains or illness in the last 02 weeks, the following questions ask  you to describe the extent to which the following symptoms have been a problem over the last 07 day';

const styles = StyleSheet.create({
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 7,
    height: 7,
    borderRadius: 50,
  },
  Nextsty: {
    width: 80,
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ans_box: {
    marginTop: 12,
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 50,
    borderTopLeftRadius: 0,
    backgroundColor: colors.warning,
  },
  ans_con: {
    minWidth: 130,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
