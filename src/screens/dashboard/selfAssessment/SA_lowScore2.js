import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
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
  const feelingType = route?.params?.feelingType;
  const feelingId = route?.params?.feelingId;
  const {t, i18n} = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFeelings_handle = async () => {
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
        var sortArr = data.sort(function (a, b) {
          return a.subFeelingId - b.subFeelingId;
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
          onPress={() =>
            navigation.navigate('Subtype', {
              items: item,
              feelingType: feelingType,
            })
          }>
          <LinearGradient
            colors={[colors.circle_2, colors.circle_1]}
            style={st.animatedCir_1}>
            <Text style={[st.tx18, st.txAlignC]}>{item.subFeelType}</Text>
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
        // auth={true}
        onBack={() => navigation.goBack()}
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
