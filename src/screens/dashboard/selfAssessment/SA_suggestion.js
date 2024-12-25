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
  const ageId = route?.params?.ageId;
  const childDetails = route?.params?.childDetails

  const getData = () => {
    if (ageId == 1) {
      if (score < 8) {
        setMessage(t('msg_2'));
      } else {
        setMessage(t('msg_1'));
      }
    } else if (ageId == 2) {
      if (score == 0) {
        setMessage(t('msg_2'));
      } else {
        setMessage(t('msg_3'));
      }
    } else {
      setMessage(t('msg_2'));
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, [navigation, ageId]);

  return (
    <View style={st.flex}>
      <AuthHeader
        title={''}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
        // auth={true}
      />
      <ScrollView>
        <View style={st.pd20}>
          <View style={[st.row, st.justify_A]}>
            <ViewAnimatable animation="bounceIn" delay={500}>
              <View
                style={[
                  st.mansa_chat,
                  {width: 186, height: 186, borderRadius: 186},
                ]}>
                <Text style={[st.tx18, st.txAlignC, {color: colors.danger}]}>
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
                title={ageId == 2 && score > 0 ? t('Start') : t('Continue')}
                backgroundColor={colors.lightBlue}
                color={colors.white}
                onPress={() => {
                  if (ageId == 1) {
                    if (score < 8) {
                      navigation.navigate('Tips', {score: score, ageId: ageId, assessment:false});
                    } else {
                      navigation.navigate('SA_lowScore', {score: score});
                    }
                  } else if (ageId == 2) {
                    if (score == 0) {
                      navigation.navigate('Tips', {score: score, ageId: ageId});
                    } else {
                      navigation.navigate('ChildHighScoreDes', {
                        score: score,
                        ageId: ageId,
                        childDetails:childDetails
                      });
                      // console.log('suggestion', childDetails)
                    }
                  } else if (ageId == 10) {
                    navigation.navigate('Tips', {score: score, ageId: ageId});
                  }
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
