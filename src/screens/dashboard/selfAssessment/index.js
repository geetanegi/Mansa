import {StyleSheet, Text} from 'react-native';
import React from 'react';
import st from '../../../global/styles';
import MansaImg from '../../../components/mansa';
import {colors} from '../../../global/theme';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../../components/button';
import Footer from '../../../components/footer';
import AuthHeader from '../../../components/Auth_Header';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import { View } from 'react-native-animatable';

const SelfAssessment = ({navigation, route}) => {
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
      <View style={[st.pd20, st.flex]} animation={'fadeInRight'} delay={500}>
        <View style={[st.center]}>
          <View style={st.row}>
            <MansaImg />

            <View style={st.tringle} />
            <View style={st.black_box}>
              <View style={[st.row, st.mt_B]}>
                <View style={st.wdh15}>
                  <Icon name="arrow-right" size={15} color={colors.white} />
                </View>
                <View style={st.wdh80}>
                  <Text style={[st.tx14, {color: colors.white}]}>
                    {t('FEEL')}
                  </Text>
                </View>
              </View>

              <View style={[st.row, st.mt_B]}>
                <View style={st.wdh15}>
                  <Icon name="arrow-right" size={15} color={colors.white} />
                </View>
                <View style={st.wdh80}>
                  <Text style={[st.tx14, {color: colors.white}]}>
                    {t('SA_MSCT_1')}
                  </Text>
                </View>
              </View>

              <View style={[st.row, st.mt_B]}>
                <View style={st.wdh15}>
                  <Icon name="arrow-right" size={15} color={colors.white} />
                </View>
                <View style={st.wdh80}>
                  <Text style={[st.tx14, {color: colors.white}]}>
                    {t('SA_MSCT_3')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{marginTop: '10%'}}  animation={'fadeInRight'} delay={1000}>
          <Button
            title={t('Start')}
            backgroundColor={colors.lightBlue}
            color={colors.white}
            onPress={() => navigation.navigate('SA_ChildAdult')}
          />
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default SelfAssessment;

const styles = StyleSheet.create({});
