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
import st from '../../../global/styles';
import {useTranslation, I18n} from 'react-i18next';
import Footer from '../../../components/footer';
import {colors} from '../../../global/theme';
import Button from '../../../components/button';
import {API} from '../../../utils/endpoints';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import {getApi} from '../../../utils/apicalls';
import Loader from '../../../components/loader';
import {View} from 'react-native-animatable';
import { languageConversion } from '../../../utils/helperfunctions/functions';

const TypeDesc = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const items = route?.params?.items;
  const [isLoading, setIsLoading] = useState(false);

  console.log({items});

  const getFeelings_handle = async feelingId => {
    const url = `${API.GET_SUB_FEEL}${feelingId}/${languageConversion(i18n)}` ;
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        if (data) {
          setIsLoading(false);
          navigation.navigate('FeelingsQues', {
            feelingId: data[0].subFeelingId,
          });
        }
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('SELF_ASSESS')}
        onBack={() => navigation.goBack()}
        gotohome={() => navigation.navigate('Main')}
      />
      {/* <ImageBackground style={st.flex}
        source={{
          uri: items?.imgurl,
        }}> */}
      <ScrollView>
        <View style={st.pd20} animation="fadeInRight">
          <Text style={[st.tx14, st.mt_B, st.txAlignJ, {color: colors.black}]}>
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

          {items.status && (
            <Text style={[st.tx14, st.txAlignC, {color: colors.lightText}]}>
              If yes, then please click on next.
            </Text>
          )}
        </View>
        <View style={st.align_C} animation="fadeInRight" delay={1000}>
          <Button
            title={t('Next')}
            onPress={() => {
              if (items?.feelingId == 5 || items?.feelingId == 4) {
                getFeelings_handle(items?.feelingId);
              } else {
                navigation.navigate('SA_lowScore2', {
                  feelingType: items?.feelingType,
                  feelingId: items?.feelingId,
                });
              }
            }}
            backgroundColor={colors.blue}
            color={colors.white}
          />
        </View>
      </ScrollView>
      {/* </ImageBackground> */}
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default TypeDesc;

const styles = StyleSheet.create({});
