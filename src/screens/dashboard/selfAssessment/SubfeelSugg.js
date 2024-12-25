import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import st from '../../../global/styles';
import Footer from '../../../components/footer';
import AuthHeader from '../../../components/Auth_Header';
import {useTranslation, I18n} from 'react-i18next';
import MansaImg from '../../../components/mansa';
import {View as ViewAnimatable} from 'react-native-animatable';
import {colors} from '../../../global/theme';
import Button from '../../../components/button';

const SA_suggestion = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const {t} = useTranslation();
  const score = route?.params?.score;
  const feelingId = route?.params?.feelingId;

  useEffect(() => {
    ScoreBasesMsgs();
  }, []);

  const video_content = t('sub_msg')
  const tips_content = t('msg_2')
  
  const ScoreBasesMsgs = () => {
    if (feelingId == 1 || feelingId == 3) {
      if (score <= 4) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    if (feelingId == 4) {
      if (score <= 5) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    if (feelingId == 2) {
      if (score <= 13) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    if (feelingId == 6) {
      if (score <= 3) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    if (feelingId == 14) {
      if (score <= 2) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    if (feelingId == 8) {
      if (score > 30) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    if (feelingId == 9) {
      if (score > 60) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    if (feelingId == 11) {
      if (score <= 19) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    if (feelingId == 16) {
      if (score <= 24) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    

    if (feelingId == 15) {
      if (score == 0) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    if (feelingId == 16) {
      if (score <= 24) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }

    if (feelingId == 17) {
      if (score <= 4) {
        setMessage(tips_content);
      } else {
        setMessage(video_content);
      }
    }
  };

  const gotoTipsScreen = () => {
    navigation.navigate('Tips', {subFeel: true, ageId: 1, feelingId:feelingId});
  };

  const gotosuggestVdoScreen = () => {
    navigation.navigate('SuggestVdo',{feelingId});
  };

  const gotoScreenScoreBases = () => {
    if (feelingId == 1 || feelingId == 3) {
      if (score <= 4) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 4) {
      if (score <= 5) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 2) {
      if (score <= 13) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 6) {
      if (score <= 3) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 14) {
      if (score <= 2) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 8) {
      if (score > 30) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 9) {
      if (score > 60) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 11) {
      if (score <= 19) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 16) {
      if (score <= 24) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 15) {
      if (score == 0) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 16) {
      if (score <= 24) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }

    if (feelingId == 17) {
      if (score <= 4) {
        gotoTipsScreen();
      } else {
        gotosuggestVdoScreen();
      }
    }
  };

  return (
    <View style={st.flex}>
      <AuthHeader
        title={''}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
        auth={true}
        assessment={true}
        gotoAssessment={() => navigation.navigate('SA_lowScore')}
      />
      <ScrollView>
        <View style={st.pd20}>
          <View style={[st.row, st.justify_A]}>
            <View></View>
            <ViewAnimatable animation="bounceIn" delay={500}>
              <View
                style={[
                  st.mansa_chat,
                  {width: 186, height: 186, borderRadius: 186},
                ]}>
               
                <Text style={[st.tx14, st.txAlignC, {color: colors.danger}]}>
                  {message}
                </Text>
              </View>
              <View
                style={[
                  st.callout,
                  {
                    borderLeftWidth: 70,
                    borderRightWidth: 70,
                    borderBottomWidth: 90,
                    marginLeft: '12%',
                  },
                ]}></View>
            </ViewAnimatable>
          </View>

          <View style={[st.row, st.justify_A]}>
            <ViewAnimatable animation="bounceIn" delay={1000}>
              <MansaImg imgsty={{width: 222, height: 318}} />
            </ViewAnimatable>
            <View style={{marginTop: '40%'}}>
              <Button
                title={t('Continue')}
                backgroundColor={colors.lightBlue}
                color={colors.white}
                onPress={() => {
                  gotoScreenScoreBases();
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default SA_suggestion;

const styles = StyleSheet.create({});
