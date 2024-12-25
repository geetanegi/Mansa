import {
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import st from '../../../global/styles';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../global/theme';
import Alert from '../../../components/alert';
import Button from '../../../components/button';
import {API} from '../../../utils/endpoints';
import {getApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import { family } from '../../../global/fonts';
import { View } from 'react-native-animatable';
import { languageConversion } from '../../../utils/helperfunctions/functions';
const MythFact = ({navigation}) => {
  const [question, setQustion] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const {t, i18n} = useTranslation();

  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyth_handle = async () => {
    const url = `${API.GET_MYTH}${languageConversion(i18n)}`;
   
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
          return a.id - b.id;
        });
        setQustion(sortArr);
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
    getMyth_handle();
  }, []);

  const checkMyth_handle = (qusId, ansId) => {
    const tempdata = [...question];
    const qus_object = tempdata.find(obj => obj.id == qusId);
   
    const objIndex = tempdata.findIndex(obj => obj.id == qusId);
    if (qus_object.correctAnswerIndex == ansId) {
      tempdata[objIndex].status = true;
      setShowModal(true);
      setMessage(t('Correct'));
    } else {
      tempdata[objIndex].status = false;
      setShowModal(true);
      setMessage(t('Incorrect'));
    }
    setQustion(tempdata);
  };

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('MythsFacts')}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={st.pd20} animation={'fadeInRight'} delay={500}>
          {question.map((i, n) => {
            return (
              <View
                style={[
                  styles.boxsty,
                  i.status == true
                    ? {
                        backgroundColor: 'green',
                      }
                    : i.status == false
                    ? {
                        backgroundColor: 'red',
                      }
                    : null,
                ]}
                key={n}>
                <View style={[styles.triangleCorner]}/>
                <View style={{position:'absolute',top:2,zIndex:999,left:2 }}>
                <Text style={[st.tx14, st.txAlignC,{color:colors.white }]}>{n + 1}</Text>
               </View>
                <View style={st.pd_H20}>
                  <Text
                    style={[
                      st.tx14,
                      st.txAlignJ,
                      {
                        color:
                          i.status == true || i.status == false
                            ? colors.white
                            : colors.black,
                      },
                    ]}>
                    {i.question}
                  </Text>

                  <View>
                    <View style={[st.row, st.justify_A, st.mt_B]}>
                      {i.options?.map((j, k) => (
                        <View style={[st.row, st.align_C]} key={k}>
                          <Pressable
                            style={[
                              styles.radioCircle,
                              {
                                borderColor:
                                  i.status == true || i.status == false
                                    ? colors.white
                                    : colors.black,
                              },
                            ]}
                            onPress={() => {
                              checkMyth_handle(i.id, j.id);
                              setSubtitle(i.description);
                            }}>
                            <View
                              style={[
                                styles.selectedRb,
                                i.status == true && j.id == i.correctAnswerIndex
                                  ? {
                                      backgroundColor: colors.white,
                                    }
                                  : i.status == false &&
                                    j.id != i.correctAnswerIndex
                                  ? {
                                      backgroundColor: colors.white,
                                    }
                                  : null,
                              ]}></View>
                          </Pressable>
                          <Text  onPress={() => {
                              checkMyth_handle(i.id, j.id);
                              setSubtitle(i.description);
                            }}
                            style={[
                              st.tx14,
                              st.txCap,
                              {
                                color:
                                  i.status == true || i.status == false
                                    ? colors.white
                                    : colors.black,
                                fontFamily: family.semibold
                              },
                            ]}>
                            {j.answer}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Alert showModal={showModal} setShowModal={setShowModal}>
        <View style={[st.align_C]}>
          <Text style={[st.tx18, st.txAlignC, {color: colors.blue}]}>
            {message}
          </Text>
          <Text style={[st.tx14, st.txAlignC, {color: colors.black}]}>
            {subtitle}
          </Text>
          <View style={st.mt_B}>
            <Button
              title={t('Continue')}
              backgroundColor={colors.lightBlue}
              color={colors.white}
              onPress={() => setShowModal(false)}
            />
          </View>
          <View style={st.mt_B}></View>
        </View>
      </Alert>

      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default MythFact;

const styles = StyleSheet.create({
  boxsty: {
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: colors.grey,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0.3},
    shadowRadius: 50,
    elevation: Platform.OS == 'android' ? 1 : 0,
    backgroundColor: colors.white,
    marginBottom: 20,
    // padding: 15,
  },
  leftBox: {
    // backgroundColor: colors.warning,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    minHeight: 80,
  },
  rightbox: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderLeftColor: colors.black,
    borderLeftWidth: 2,
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  selectedRb: {
    width: 8,
    height: 8,
    borderRadius: 50,
    borderColor: colors.black,
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 35,
    borderTopWidth: 35,
    borderRightColor: 'transparent',
    borderTopColor: colors.warning,
    overflow: 'visible',
    zIndex: 999,
  },
});


