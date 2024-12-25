import {StyleSheet, Text, ScrollView, ImageBackground, Image} from 'react-native';
import React from 'react';
import AuthHeader from '../../../components/Auth_Header';
import st from '../../../global/styles';
import {useTranslation, I18n} from 'react-i18next';
import {colors} from '../../../global/theme';
import Button from '../../../components/button';
import {View} from 'react-native-animatable';

const Subtype = ({navigation, route}) => {
  const {t} = useTranslation();
  const items = route?.params?.items;

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('SELF_ASSESS')}
        onBack={() => navigation.goBack()}
        gotohome={() => navigation.navigate('Main')}
        // auth={true}
      />
      {/* <ImageBackground style={st.flex}
        source={{
          uri: items?.imgurl,
        }}> */}
        <ScrollView>
          <View style={st.pd20} animation="fadeInRight">
            <Text
              style={[st.tx14, st.mt_B, st.txAlignJ, {color: colors.black}]}>
              {items?.description}
            </Text>

            <View style={st.align_C}>
              <Image
              style={st.dis_img}
              source={{
                uri: items?.imgurl,
              }}
            />
            </View>
          </View>
          <View style={st.align_C} animation="fadeInRight" delay={1000}>
            <Button
              title={t('Next')}
              onPress={() =>
                navigation.navigate('FeelingsQues', {
                  feelingId: items.subFeelingId,
                })
              }
              backgroundColor={colors.blue}
              color={colors.white}
            />
          </View>
        </ScrollView>
      {/* </ImageBackground> */}
    </View>
  );
};

export default Subtype;

const styles = StyleSheet.create({});
