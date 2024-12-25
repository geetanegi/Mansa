import {
  Text,
  View,
  Image,
  ScrollView,
  BackHandler,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Header from '../../../components/Header';
import st from '../../../global/styles';
import {colors, images} from '../../../global/theme';
import Footer from '../../../components/footer';
import {useTranslation, I18n} from 'react-i18next';
// import analytics from '@react-native-firebase/analytics';
import LinearGradient from 'react-native-linear-gradient';
import MansaImg from '../../../components/mansa';
import {View as ViewAnimatable} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {setTour} from '../../../redux/reducers/Tour';
import {useDispatch, useSelector} from 'react-redux';
import {
  backAction,
  openDialScreen,
} from '../../../utils/helperfunctions/functions';
import {useFocusEffect} from '@react-navigation/native';
import Button from '../../../components/button';
import DialText from '../../../components/dialPad';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const [isSelfAss, setIsSelfAss] = useState(true);
  const [isVideo, setIsVideo] = useState(true);
  const [isIEC, setIsIEC] = useState(true);
  const [isMankasha, setIsMankasha] = useState(true);
  const [isTeleManas, setIsTeleManas] = useState(true);
  const [isMyth, setIsMyth] = useState(true);
  const [isWhatsNew, setIsWhatsNew] = useState(true);
  const [greet, setGreet] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const render_selfAssessment = () => {
    return (
      <View style={[st.flex]}>
        <ViewAnimatable animation="bounceIn" delay={100}>
          <View style={st.align_C}>
            <View style={{marginTop: '-25%'}}>
              <LinearGradient
                colors={[colors.circle_2, colors.circle_1]}
                style={st.animatedCir_1}>
                <Image source={images.self_assessment} style={st.iconsty} />
                <Text style={[st.tx16, st.txAlignC]}>{t('SELF_ASSESS')}</Text>
              </LinearGradient>
              <View style={st.animatedCir_2Pos}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={st.animatedCir_2}>
                  <View></View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ViewAnimatable>

        <View style={[st.row]}>
          {isSelfAss && (
            <ViewAnimatable animation="bounceIn" delay={1000}>
              <MansaImg />
            </ViewAnimatable>
          )}
          {isSelfAss && (
            <ViewAnimatable
              animation="bounceIn"
              delay={1000}
              // style={st.callout_con}
            >
              <View style={st.mansa_chat}>
                <Text style={[st.tx14, st.txAlignC, {color: colors.blue}]}>
                  {t('self_mscot')}
                </Text>
              </View>
              <View style={st.callout}></View>
            </ViewAnimatable>
          )}
        </View>
      </View>
    );
  };

  const render_video = () => {
    return (
      <View>
        <ViewAnimatable animation="bounceIn" delay={6000}>
          <View style={st.align_C}>
            <View>
              <LinearGradient
                colors={[colors.circle_2, colors.circle_1]}
                style={[st.animatedCir_1, {width: 135, height: 135}]}>
                <Image source={images.video} style={st.iconsty} />
                <Text style={[st.tx16, st.txAlignC]}>{t('AWARENESS')}</Text>
              </LinearGradient>
              <View style={st.animatedCir_2Pos}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={st.animatedCir_2}>
                  <View></View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ViewAnimatable>
      </View>
    );
  };

  const render_IEC = () => {
    return (
      <View>
        <ViewAnimatable animation="bounceIn" delay={14000}>
          <View style={st.align_C}>
            <View>
              <LinearGradient
                colors={[colors.circle_2, colors.circle_1]}
                style={[st.animatedCir_1, {width: 135, height: 135}]}>
                <Image source={images.IEC} style={{width: 77, height: 44}} />
                <Text style={[st.tx16, st.txAlignC]}>{t('IEC-Material')}</Text>
              </LinearGradient>
              <View style={st.animatedCir_2Pos}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={st.animatedCir_2}>
                  <View></View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ViewAnimatable>
      </View>
    );
  };

  const render_Mankasha = () => {
    return (
      <View>
        <ViewAnimatable animation="bounceIn" delay={21000}>
          <View style={st.align_C}>
            <View>
              <LinearGradient
                colors={[colors.circle_2, colors.circle_1]}
                style={[st.animatedCir_1, {width: 135, height: 135}]}>
                <Image source={images.mankasha} style={st.iconsty} />
                <Text style={[st.tx16, st.txAlignC]}>{t('Mankaksha')}</Text>
              </LinearGradient>
              <View style={st.animatedCir_2Pos}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={st.animatedCir_2}>
                  <View></View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ViewAnimatable>
      </View>
    );
  };

  const render_TeleManas = () => {
    return (
      <View>
        <ViewAnimatable animation="bounceIn" delay={28000}>
          <View style={st.align_C}>
            <View>
              <LinearGradient
                colors={[colors.circle_2, colors.circle_1]}
                style={[st.animatedCir_1, {width: 135, height: 135}]}>
                <Image source={images.telemanas} style={st.iconsty} />
                <Text style={[st.tx16, st.txAlignC]}>{t('TELE')}</Text>
              </LinearGradient>
              <View style={st.animatedCir_2Pos}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={st.animatedCir_2}>
                  <View></View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ViewAnimatable>
      </View>
    );
  };

  const render_Myth = () => {
    return (
      <View>
        <ViewAnimatable animation="bounceIn" delay={36000}>
          <View style={st.align_C}>
            <View>
              <LinearGradient
                colors={[colors.circle_2, colors.circle_1]}
                style={[st.animatedCir_1, {width: 135, height: 135}]}>
                <Image source={images.myth} style={st.iconsty} />
                <Text style={[st.tx16, st.txAlignC]}>{t('MythsFacts')}</Text>
              </LinearGradient>
              <View style={st.animatedCir_2Pos}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={st.animatedCir_2}>
                  <View></View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ViewAnimatable>
      </View>
    );
  };

  const render_WhatsNew = () => {
    return (
      <View>
        <ViewAnimatable animation="bounceIn" delay={31000}>
          <View style={st.align_C}>
            <View>
              <LinearGradient
                colors={[colors.circle_2, colors.circle_1]}
                style={[st.animatedCir_1, {width: 135, height: 135}]}>
                <Image source={images.new} style={st.iconsty} />
                <Text style={[st.tx16, st.txAlignC]}>{t('Whatnew')}</Text>
              </LinearGradient>
              <View style={st.animatedCir_2Pos}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={st.animatedCir_2}>
                  <View></View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ViewAnimatable>
      </View>
    );
  };

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsSelfAss(false);
    }, 5000);

    timerRef.current = setTimeout(() => {
      setIsVideo(false);
    }, 12000);

    timerRef.current = setTimeout(() => {
      setIsIEC(false);
    }, 20000);

    timerRef.current = setTimeout(() => {
      setIsMankasha(false);
    }, 27000);

    timerRef.current = setTimeout(() => {
      setIsTeleManas(false);
    }, 35000);

    timerRef.current = setTimeout(() => {
      setIsMyth(false);
      dispatch(setTour(true));
      navigation.navigate('Main');
    }, 42000);

    // timerRef.current = setTimeout(() => {
    //   setIsWhatsNew(false);
    //   dispatch(setTour(true));
    //   navigation.navigate('Main');
    // }, 35000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  

  const getGreetHandle = () => {
    var myDate = new Date();
    var hrs = myDate.getHours();

    var msg;

    if (hrs < 12) msg = t('Good Morning, Guest');
    else if (hrs >= 12 && hrs <= 15) msg = t('Good Afternoon, Guest');
    else if (hrs >= 15 && hrs <= 24) msg = t('Good Evening, Guest');

    setGreet(msg);
  };

  useEffect(() => {
    getGreetHandle()
  }, []);

  const getfirebaseToken = async () => {
    try {
      const fcmtoken = await AsyncStorage.getItem('token');
      return fcmtoken;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={st.flex}>
      <View style={st.flex}>
        <Header navigation={navigation}  getfirebaseToken={() => getfirebaseToken()} getGreetHandle={getGreetHandle} />
        <ScrollView ref={scrollRef}>
          <View
            style={{
              height: 150,
              width: '100%',
              backgroundColor: colors.blue,
              borderBottomLeftRadius: 100,
              borderBottomRightRadius: 100,
              borderBottomStartRadius: 100,
              borderBottomEndRadius: 100,
            }}>
            <Text style={[st.tx20, st.ml_15]}>{greet}</Text>
          </View>

          {render_selfAssessment()}

          <View style={[st.row, st.mh_10]}>
            <View style={st.wdh50}>{render_video()}</View>

            <View style={st.wdh50}>{render_IEC()}</View>
          </View>

          {isVideo && (
            <View style={[st.row]}>
              <ViewAnimatable animation="bounceIn" delay={8000}>
                <MansaImg />
              </ViewAnimatable>

              <ViewAnimatable animation="bounceIn" delay={8000}>
                <View style={st.mansa_chat}>
                  <Text
                    numberOfLines={5}
                    adjustsFontSizeToFit
                    style={[st.tx14, st.txAlignC, {color: colors.blue}]}>
                    {t('vdo_mscot')}
                  </Text>
                </View>
                <View style={st.callout}></View>
              </ViewAnimatable>
            </View>
          )}
          {isIEC && (
            <View style={[st.row]}>
              <ViewAnimatable animation="bounceIn" delay={15000}>
                <MansaImg />
              </ViewAnimatable>

              <ViewAnimatable animation="bounceIn" delay={15000}>
                <View style={st.mansa_chat}>
                  <Text
                    numberOfLines={5}
                    adjustsFontSizeToFit
                    style={[st.tx14, st.txAlignC, {color: colors.blue}]}>
                    {t('IEC_mscot')}
                  </Text>
                </View>
                <View style={st.callout}></View>
              </ViewAnimatable>
            </View>
          )}

          <View style={[st.row, st.mh_10]}>
            <View style={st.wdh50}>{render_Mankasha()}</View>
            <View style={st.wdh50}>{render_TeleManas()}</View>
          </View>
          {isMankasha && (
            <View style={[st.row]}>
              <ViewAnimatable animation="bounceIn" delay={23000}>
                <MansaImg />
              </ViewAnimatable>

              <ViewAnimatable animation="bounceIn" delay={23000}>
                <View style={st.mansa_chat}>
                  <Text
                    numberOfLines={5}
                    adjustsFontSizeToFit
                    style={[st.tx14, st.txAlignC, {color: colors.blue}]}>
                    {t('mnksh_mscot')}
                  </Text>
                </View>
                <View style={st.callout}></View>
              </ViewAnimatable>
            </View>
          )}

          {isTeleManas && (
            <View style={[st.row]}>
              <ViewAnimatable animation="bounceIn" delay={30000}>
                <MansaImg />
              </ViewAnimatable>

              <ViewAnimatable animation="bounceIn" delay={30000}>
                <View style={st.mansa_chat}>
                  <Text
                    numberOfLines={7}
                    adjustsFontSizeToFit
                    style={[st.tx14, st.txAlignC, {color: colors.blue}]}>
                    {t('tele_mscot')}
                  </Text>
                </View>
                <View style={st.callout}></View>
              </ViewAnimatable>
            </View>
          )}
          <View style={[st.align_C, st.mh_10]}>
            <View style={st.wdh50}>{render_Myth()}</View>
            {/* <View style={st.wdh50}>{render_WhatsNew()}</View> */}
          </View>
          {isMyth && (
            <View style={[st.row]}>
              <ViewAnimatable animation="bounceIn" delay={38000}>
                <MansaImg />
              </ViewAnimatable>

              <ViewAnimatable animation="bounceIn" delay={38000}>
                <View style={st.mansa_chat}>
                  <Text
                    numberOfLines={5}
                    adjustsFontSizeToFit
                    style={[st.tx14, st.txAlignC, {color: colors.blue}]}>
                    {t('myth_mscot')}
                  </Text>
                </View>
                <View style={st.callout}></View>
              </ViewAnimatable>
            </View>
          )}

          {/* {isWhatsNew && (
            <View style={[st.row]}>
              <ViewAnimatable animation="bounceIn" delay={33000}>
                <MansaImg />
              </ViewAnimatable>

              <ViewAnimatable animation="bounceIn" delay={33000}>
                <View style={st.mansa_chat}>
                  <Text
                    numberOfLines={5}
                    adjustsFontSizeToFit
                    style={[st.tx14, st.txAlignC, {color: colors.blue}]}>
                    {t('new_mscot')}
                  </Text>
                </View>
                <View style={st.callout}></View>
              </ViewAnimatable>
            </View>
          )} */}

          <View>
            <DialText />
          </View>
        </ScrollView>
      </View>
      <View style={{position: 'absolute', bottom: 80, right: 20}}>
        <Button
          title={t('Skip')}
          backgroundColor={colors.lightBlue}
          color={colors.white}
          onPress={() => {
            dispatch(setTour(true));
          }}
        />
      </View>
      <View>
        <Footer />
      </View>
    </View>
  );
};

export default Home;
