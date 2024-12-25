import {StyleSheet, Text, View, ScrollView, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import st from '../../../global/styles';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../../global/theme';
import Accordian from '../../../components/accordion';
import {API} from '../../../utils/endpoints';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import {getApi} from '../../../utils/apicalls';
import Loader from '../../../components/loader';

const FaQ = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {t} = useTranslation();

  const getFAQHandle = async () => {
    const url = API.GET_FAQ;
    try {
      if (Platform.OS == 'android') {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
       
        setData(data);
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
    getFAQHandle();
  }, []);

  const renderAccordians = () => {
    const items = [];
    for (item of data) {
      items.push(<Accordian data={item} />);
    }
    return items;
  };

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t("FAQ's")}
        onBack={() => navigation.navigate('Main')}
        gotohome={() => navigation.navigate('Main')}
      />
      <ScrollView>
        <View style={st.pd20}>{renderAccordians()}</View>
      </ScrollView>
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default FaQ;

const styles = StyleSheet.create({});
