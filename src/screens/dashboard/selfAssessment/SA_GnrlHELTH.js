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
  const {t} = useTranslation();
  const ageId = route?.params?.id;
  const imgurl = route?.params?.imgurl;

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

          <View style={[st.pd20]}>
            <Text
              style={[
                st.tx16,
                st.txAlignJ,
                {color: colors.black, lineHeight: 30},
              ]}>
              {t('GNRL_HTH_Cntn')}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={st.pd20} animation="fadeInRight" delay={1000}>
        <Button
          title={t('Start')}
          backgroundColor={colors.lightBlue}
          color={colors.white}
          onPress={() => navigation.navigate('Questions', {ageId: ageId})}
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
