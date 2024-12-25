import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import st from '../../../global/styles';
import {useTranslation} from 'react-i18next';
import MansaImg from '../../../components/mansa';
import {View as ViewAnimatable} from 'react-native-animatable';
import {colors} from '../../../global/theme';
import {StackActions} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {backAction} from '../../../utils/helperfunctions/functions';

const AssistMansa = ({navigation}) => {
  const {t} = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Main'));
    }, 3000);
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  return (
    <View style={[st.flex]}>
      <AuthHeader
        title={t('')}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => backAction()}
      />
      <ScrollView>
        <View style={[st.pd20]}>
          <View style={[st.row, st.justify_A]}>
            <ViewAnimatable animation="fadeInRight" delay={1200}>
              <View style={[st.mansa_chat]}>
                <Text style={[st.tx16, st.txAlignC, {color: colors.footer_bg}]}>
                  {t('hi')}
                </Text>
                <Text style={[st.tx18, st.txAlignC, {color: colors.danger}]}>
                  {t('Mansa')}
                </Text>
                <Text style={[st.tx14, st.txAlignC, {color: colors.footer_bg}]}>
                  {t('assist')}
                </Text>
              </View>
              <View style={[st.callout]}></View>
            </ViewAnimatable>
          </View>

          <View style={[st.row, st.justify_A]}>
            <ViewAnimatable animation="fadeInRight" delay={1500}>
              <MansaImg imgsty={{width: 222, height: 318}} />
            </ViewAnimatable>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default AssistMansa;

const styles = StyleSheet.create({});
