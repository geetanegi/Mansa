import {
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import st from '../../../global/styles';
import {colors, images} from '../../../global/theme';
import {useTranslation, I18n} from 'react-i18next';
import MansaImg from '../../../components/mansa';
import Button from '../../../components/button';
import {API} from '../../../utils/endpoints';
import {getApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import {View} from 'react-native-animatable';
import {languageConversion} from '../../../utils/helperfunctions/functions';
const Tips = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const ageId = route?.params?.ageId;
  const subfeel = route?.params?.subFeel;
  const feelingId = route?.params?.feelingId;
  const assessment = route?.params?.assessment;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [bgimg, setBgimg] = useState();
  const [man_ani, setMan_ani] = useState();
  const [lang, setLang] = useState(i18n.language);

  const getTips = async () => {
    let url = '';
    if (ageId == 10) {
      url = `${API.GET_ALL_CHILD}`;
    } else if (subfeel && ageId == 1) {
      url = `${API.GET_TIPSBYFEEL}${feelingId}/${languageConversion(i18n)}`;
    } else {
      url = `${API.GET_ALLTIPS}${ageId}/${languageConversion(i18n)}`;
    }
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;

        if (ageId != 10) {
          if (!subfeel) {
            var sortArr = data.sort(function (a, b) {
              return a.id - b.id;
            });

            let newdata = sortArr.map((d, n) => ({
              ...d,
              delay: (n *= 4000),
            }));
            const myLen = newdata.length;
            const n = newdata[myLen - 1].delay;
            setMan_ani(n + 4000);
            setData(newdata);
          } else {
            var sortArr = data.tips.sort(function (a, b) {
              return a.id - b.id;
            });
            let newdata = sortArr.map((d, n) => ({
              ...d,
              delay: (n *= 4000),
            }));
            const myLen = newdata.length;
            const n = newdata[myLen - 1].delay;
            setMan_ani(n + 4000);
            setData(newdata);
            setBgimg(data.backgroundimg);
          }
        } else {
          let newdata = data.map((d, n) => ({
            ...d,
            delay: (n *= 4000),
          }));

          newdata.map(i =>
            i.questions.sort(function (a, b) {
              return a.subtipid - b.subtipid;
            }),
          );
          console.log({newdata});
          const myLen = newdata.length;
          const n = newdata[myLen - 1].delay;
          setMan_ani(n + 4000);
          setData(newdata);
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
    getTips();
  }, []);

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('Tips')}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
      />
      {ageId == 10 && !subfeel ? (
        <ScrollView>
          <View style={st.pd20}>
            {data.map((i, n) => {
              return (
                <View style={st.mt_B} animation="fadeInRight" delay={i.delay}>
                  <Text style={[st.tx16, st.txbold, {color: colors.danger}]}>
                    {n + 1}. {lang == 'hi' ? i?.hindichildtip : i?.childtip}.
                  </Text>
                  {i.questions?.map((j, k) => {
                    return (
                      <View style={[st.pd10, {paddingBottom: 0}]} key={k}>
                        <View style={st.row}>
                          <View style={st.wdh10}>
                            <Text style={[st.tx14, {color: colors.black}]}>
                              ⚉
                            </Text>
                          </View>
                          <View style={st.wdh90}>
                            <Text style={[st.tx14, {color: colors.black}]}>
                              {lang != 'hi' ? j.subtips : j.hindisubtips}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
          {man_ani && (
            <View animation="fadeInRight" delay={man_ani} style={[st.row]}>
              <MansaImg />
              <View style={[{bottom: 20, position: 'absolute', right: 50}]}>
                <Button
                  title={t('Next')}
                  backgroundColor={colors.lightBlue}
                  color={colors.white}
                  onPress={() =>
                    navigation.navigate('SA_Contact', {
                      ageId: ageId,
                      assessment: assessment,
                    })
                  }
                />
              </View>
            </View>
          )}
        </ScrollView>
      ) : subfeel ? (
        <ImageBackground
          source={{
            uri: bgimg,
          }}
          // source={images.New1}
          style={st.flex}>
          <ScrollView>
            <View style={[st.pd20]}>
              <View>
                {data?.map((i, n) => {
                  return (
                    <View
                      animation="fadeInRight"
                      delay={i.delay}
                      key={n}
                      style={styles.box_sty}>
                      <View style={st.row}>
                        <View style={st.wdh10}>
                          <Text style={[st.tx16Tip]}>{n + 1}.</Text>
                        </View>
                        <View style={st.wdh90}>
                          <Text style={[st.tx16Tip]}>{i?.desciption}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
            {man_ani && (
              <View animation="fadeInRight" delay={man_ani} style={[st.row]}>
                <MansaImg />
                <View style={[{bottom: 20, position: 'absolute', right: 50}]}>
                  <Button
                    title={t('Next')}
                    backgroundColor={colors.lightBlue}
                    color={colors.white}
                    onPress={() =>
                      navigation.navigate('SA_Contact', {ageId: ageId})
                    }
                  />
                </View>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      ) : (
        <ScrollView>
          <View style={[st.pd20]}>
            <View>
              {data.map((i, n) => {
                return (
                  <View
                    animation="fadeInRight"
                    delay={i.delay}
                    key={n}
                    style={styles.box_sty}>
                    <View style={[st.row]}>
                      <View style={[st.wdh20, st.row, st.align_C]}>
                        {/* <Text style={[st.tx14, {color: colors.black}]}>
                          {n + 1}.{'  '}
                        </Text> */}
                        <Image
                          style={{
                            width: 40,
                            height: 40,
                            resizeMode: 'contain',
                            borderRadius: 50,
                          }}
                          source={{
                            uri: i?.imgurl,
                          }}
                        />
                      </View>
                      <View style={st.wdh80}>
                        <Text style={[st.tx16Tip]}>
                          {lang == 'hi' ? i.hindidesciption : i?.desciption}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          {man_ani && (
            <View animation="fadeInRight" delay={man_ani} style={[st.row]}>
              <MansaImg />
              <View style={[{bottom: 20, position: 'absolute', right: 50}]}>
                <Button
                  title={t('Next')}
                  backgroundColor={colors.lightBlue}
                  color={colors.white}
                  onPress={() =>
                    navigation.navigate('SA_Contact', {
                      ageId: ageId,
                      assessment: assessment,
                    })
                  }
                />
              </View>
            </View>
          )}
        </ScrollView>
      )}

      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default Tips;

const styles = StyleSheet.create({
  box_sty: {
    // borderRadius: 10,
    // backgroundColor: colors.blue,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
