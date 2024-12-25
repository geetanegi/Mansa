import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Footer from '../../../components/footer';
import AuthHeader from '../../../components/Auth_Header';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import st from '../../../global/styles';
import Button from '../../../components/button';
import {colors} from '../../../global/theme';

const AskAssessment = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('SELF_ASSESS')}
        onBack={() => {
          navigation.goBack();
        }}
        gotohome={() => navigation.navigate('Main')}
        // auth={true}
      />
      <ScrollView>
        <View style={[st.pd20, st.flex]}>
          <Text style={[st.tx16, st.txAlignC, {color: colors.danger}]}>
            {t('why_assessment')}
          </Text>

          <View style={st.mt_t10}>
            <Text
              style={[
                st.tx14,
                st.txAlignJ,
                {color: colors.black, lineHeight: 25},
              ]}>
              {t('assessment_des')}
            </Text>
          </View>
          <Button
            backgroundColor={colors.blue}
            color={colors.white}
            title={t('Next')}
            onPress={() => navigation.navigate('Self-assessment')}
          />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default AskAssessment;

const styles = StyleSheet.create({});
