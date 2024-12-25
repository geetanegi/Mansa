import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList, Platform
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthHeader from '../../../components/Auth_Header';
import st from '../../../global/styles';
import {useTranslation, I18n} from 'react-i18next';
import Footer from '../../../components/footer';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../global/theme';
import {View as ViewAnimatable} from 'react-native-animatable';
import {API} from '../../../utils/endpoints';
import {getApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import { languageConversion } from '../../../utils/helperfunctions/functions';

const SA_lowScore = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {t, i18n} = useTranslation();

  const score = route?.params?.score

  const getFeelings_handle = async () => {
    const url = `${API.GET_FEELINGS+score}/${languageConversion(i18n)}`;
    try {
      if(Platform.OS == 'android'){
        setIsLoading(true);
        }else{
          setIsLoading(false);
        }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        var sortArr = data.sort(function (a, b) {
          return a.feelingId - b.feelingId;
        });
        setData(sortArr);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getFeelings_handle();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <ViewAnimatable animation="bounceInRight">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TypeDesc', {items: item});
          }}>
          <LinearGradient
            colors={[colors.circle_2, colors.circle_1]}
            style={st.animatedCir_1}>
            <Text style={[st.tx18, st.txAlignC]}>{t(item.feelingType)}</Text>
          </LinearGradient>
          <View style={st.animatedCir_2Pos}>
            <LinearGradient
              colors={[colors.circle_2, colors.circle_1]}
              style={st.animatedCir_2}>
              <View></View>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </ViewAnimatable>
    );
  };

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('SELF_ASSESS')}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
        // auth={true}
      />
      <FlatList
        contentContainerStyle={[st.pd20]}
        columnWrapperStyle={[st.flex, st.justify_A]}
        data={data}
        renderItem={renderItem}
        numColumns={2}
      />
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default SA_lowScore;

const styles = StyleSheet.create({});
