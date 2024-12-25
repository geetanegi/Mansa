import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
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
  const navigation = useNavigation();
  const ageId = route?.params?.ageId;
  const childDetails = route?.params?.childDetails;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [lang, setLang] = useState(i18n.language);
  const totalQuestions = data?.length;
  const [score, setScore] = useState();
  const [index, setIndex] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const profileData = useSelector(state => state.profile?.data);

  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [message, setMessage] = useState('');
  const [contact_1, setContact_1] = useState();
  const [contact_2, setContact_2] = useState();

  const [delete_popupMessageVisibility, setDelete_popupMessageVisibility] =
    useState(false);

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (
        selectedAnswerIndex?.trim() === currentQuestion?.englishAnswer?.trim()
      ) {
      }
    }
  }, [selectedAnswerIndex]);

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
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  const currentQuestion = data[index];

  const fetch_Points = (id, optIndex) => {
    let templist = [...data];
    let newInd = templist.findIndex(i => i.quesId == id);
    const mydata = templist[newInd];
    if (mydata) {
      mydata.checkIndex = optIndex;
      setData(templist);
    }
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const getQuestions = async () => {
    if (ageId) {
      const url = `${API.GET_QuestionById}/${ageId}/${languageConversion(
        i18n,
      )}`;
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
    }
  };
  // console.log('further ques', childDetails)
  const saveScoreHandle = async ageId => {
    const date = dateFormet();
    const url = `${API.SAVE_SCORE_GQ}`;
    const params = {
      agescoreId: null,
      ageid: ageId,
      score: score,
      submitdate: date,
      active: true,
      age: profileData?.data[0]?.age,
      sysid: profileData?.data[0]?.id,
      languageID: lang == 'hi' ? 1 : 2,
      childDetails: childDetails,
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
        console.log({data})
        setIsLoading(false);
        // navigation.navigate('SA_suggestion', {score: score, ageId: ageId});
        navigation.navigate('ChildFurtherMansa', {
          score: score,
          ageId: ageId,
        });
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const scoreDescription = async totalPoint => {
    const url = `${API.SCORE_DESC_AGE}/${ageId}/${totalPoint}`;
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
          saveScoreHandle(ageId);
          // navigation.navigate('SA_suggestion', {score: score, ageId: ageId});
          navigation.navigate('ChildFurtherMansa', {
            score: score,
            ageId: ageId,
          });
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
            {index == 0 && ageId == 1 && (
              <Text style={[st.question_heading]}>
                The following questions are related to certain pains and
                problems, that may have bothered you in the{' '}
                <Text style={[st.txbold, {color: colors.danger}]}>
                  last 30 days.
                </Text>
                . If you think the question applies to you and you had to
                describe the problem in the{' '}
                <Text style={[st.txbold, {color: colors.danger}]}>
                  last 30 days,
                </Text>{' '}
                answer YES. On the other hand, if the question does not apply to
                you and you did not have the problem in the{' '}
                <Text style={[st.txbold, {color: colors.danger}]}>
                  last 30 days,
                </Text>{' '}
                answer NO.
              </Text>
            )}

            <View style={[st.pd10, st.mt_t10]}>
              <Text style={[st.tx18, {color: colors.danger}]}>
                {index + 1}. {currentQuestion?.englishquestion}
              </Text>
            </View>

            <View style={[st.row, st.align_C, st.mt_t10]}>
              <View>
                {currentQuestion?.options?.map(
                  (item, n) =>
                    item.optionenglish && (
                      <View style={[st.row, st.align_C]} key={n}>
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
                          {n + 1}
                        </Text>
                        <Pressable
                          style={styles.ans_box}
                          onPress={() => {
                            setSelectedAnswerIndex(item.optionenglish);
                            fetch_Points(currentQuestion.quesId, n);
                          }}>
                          <View style={st.row}>
                            <View style={styles.ans_con}>
                              <Pressable
                                style={styles.radioCircle}
                                onPress={() => {
                                  setSelectedAnswerIndex(item.optionenglish);
                                  fetch_Points(currentQuestion.quesId, n);
                                }}>
                                <View
                                  style={[
                                    styles.selectedRb,
                                    currentQuestion?.checkIndex == n
                                      ? {
                                          backgroundColor: 'green',
                                        }
                                      : selectedAnswerIndex ===
                                          item.optionenglish &&
                                        item.optionenglish ===
                                          currentQuestion.englishAnswer
                                      ? {
                                          backgroundColor: 'green',
                                        }
                                      : selectedAnswerIndex != null &&
                                        selectedAnswerIndex ===
                                          item.optionenglish
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
                                {item.optionenglish}
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
                  if (index + 1 < data.length) {
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

                    scoreDescription(totalPoint);
                    setScore(totalPoint);
                    setSubtitle(totalPoint);
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
