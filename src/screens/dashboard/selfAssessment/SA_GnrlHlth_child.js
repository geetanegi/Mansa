import {StyleSheet, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import st from '../../../global/styles';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import {useTranslation, I18n} from 'react-i18next';
import {colors} from '../../../global/theme';
import Button from '../../../components/button';
import {View} from 'react-native-animatable';

const SA_GnrlHELTH = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const ageId = route?.params?.id;
  const imgurl = route?.params?.imgurl;
  const lang = i18n.language;

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('SELF_ASSESS')}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
        // auth={true}
      />
      <ScrollView>
        <View style={st.pd20} animation="fadeInRight">
          <Image source={{uri: imgurl}} style={styles.imgsty} />
          <View style={st.pd20}>
            {lang == 'hi' ? (
              <Text
                style={[
                  st.tx16,
                  st.txAlignJ,
                  {color: colors.black, lineHeight: 30},
                ]}>
                यहां बच्चे के व्यवहार और भावना के संबंध में कुछ प्रश्न दिए गए
                हैंं। कृपया{' '}
                <Text style={[st.txbold, {color: colors.danger}]}>
                  पिछले कुछ महीनों या हफ्तों
                </Text>{' '}
                में बच्चे के व्यवहार के बारे में सोचें और दिए गए सभी प्रश्नों के
                उत्तर 'हां' या 'नहीं' में दें। याद रखें इससे बच्चे में संभावित
                भावनात्मक और व्यवहार संबंधी समस्याओं का पता लगाने में मदद
                मिलेगी। आपके सहयोग के लिए धन्यवाद। {' '}
              </Text>
            ) : (
              <Text
                style={[
                  st.tx16,
                  st.txAlignJ,
                  {color: colors.black, lineHeight: 30},
                ]}>
                Here some questions are given regarding the behaviour and
                feeling of the child. kindly think of the child’s behaviour in{' '}
                <Text style={[st.txbold, {color: colors.danger}]}>
                  last few months or weeks
                </Text>{' '}
                and provide answer either in ‘Yes’ or in ‘No’ to all the
                questions. Remember this will help in the detection of possible
                emotional and behavioural problems in the child. Thanks for your
                co-operation.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={st.pd20} animation="fadeInRight" delay={1000}>
        <Button
          title={t('Start')}
          backgroundColor={colors.lightBlue}
          color={colors.white}
          onPress={() => navigation.navigate('ChildRegistration', {ageId: ageId})}
        />
      </View>
      <Footer />
    </View>
  );
};

export default SA_GnrlHELTH;

const styles = StyleSheet.create({
  imgsty: {
    // ...st.justify_C,
    opacity: 0.5,
    width: '100%',
    height: 150,
    alignItems: 'center',
    resizeMode: 'contain',
  },
});
