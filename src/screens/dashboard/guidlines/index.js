import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import st from '../../../global/styles';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import Button from '../../../components/button';
import {useTranslation, I18n} from 'react-i18next';
import {colors} from '../../../global/theme';
import {API} from '../../../utils/endpoints';
import {getApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';

const Guildlines = ({navigation}) => {
  const {t} = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getGuidelines = async () => {
    const url = API.GET_Guideline;

    try {
      setIsLoading(true);
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
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
    getGuidelines();
  }, []);

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('Guideline')}
        onBack={() => navigation.navigate('Main')}
        gotohome={() => navigation.navigate('Main')}
      />
      <ScrollView>
        <View style={st.pd20}>
          {data.map((i, n) => {
            return (
              <Text style={[st.tx14, st.txCap, st.txAlignJ, {color: colors.lightBlue}]}>
                {n+1}. {i.desciption}
              </Text>
            );
          })}
        </View>
      </ScrollView>
      <View style={st.pd20}>
        <Button
          title={t('thanks')}
          backgroundColor={colors.lightBlue}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default Guildlines;

const styles = StyleSheet.create({});
