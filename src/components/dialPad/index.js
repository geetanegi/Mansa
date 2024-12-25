import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {openDialScreen} from '../../utils/helperfunctions/functions';
import st from '../../global/styles';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../global/theme';
import {getApi} from '../../utils/apicalls';
import {API} from '../../utils/endpoints';
import {handleAPIErrorResponse} from '../../utils/helperfunctions/validations';
import {useTranslation, I18n} from 'react-i18next';

const DialText = ({gradient}) => {
  const [data, setData] = useState();
  const {t, i18n} = useTranslation();
  const lang = i18n.language;

  const getData = async () => {
    const url = `${API.TELEMANAS}`;
    try {
      const result = await getApi(url);
      if (result?.status == 200) {
        setData(result.data);
      }
    } catch (e) {
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      {gradient != false ? (
        <View>
          {data && (
            <LinearGradient
              style={st.contact_footer}
              colors={[colors.circle_2, colors.circle_1]}>
              <View style={[st.row, st.align_C]}>
                <Icon
                  name={'phone'}
                  size={23}
                  color={colors.white}
                  style={st.mh_10}
                />
                <Text style={[st.tx14, st.txAlignL, st.mr_10]}>
                  {lang == 'hi' ? data?.hindiMessage1 : data?.message1}{' '}
                  <Text
                    style={[st.txDecor, {color: colors.frozy}]}
                    onPress={() => openDialScreen(data?.number1)}>
                    {data?.number1}
                  </Text>{' '}
                  {t('OR')}{' '}
                  <Text
                    style={[st.txDecor, {color: colors.frozy}]}
                    onPress={() => openDialScreen(data?.number2)}>
                    {data?.number2}
                  </Text>{' '}
                  {lang == 'hi' ? data?.hindiMessage2 : data?.message2}
                </Text>
              </View>
            </LinearGradient>
          )}
        </View>
      ) : (
        <View
          style={[
            {
              backgroundColor: colors.blue,
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: colors.white,
              borderRadius: 10,
              alignItems: 'center',
            },
          ]}>
            {data && (
          <View>
            {/* <Text style={[st.btntxt, st.txAlignJ, {color: '#fff'}]}>
              In case you are facing mental & emotional problems, please call{' '}
              <Text
                style={st.txDecor}
                onPress={() => openDialScreen(18008914416)}>
                1800-891-4416
              </Text>{' '}
              OR{' '}
              <Text style={st.txDecor} onPress={() => openDialScreen(14416)}>
                14416
              </Text>{' '}
              to get 24x7 free counseling services
            </Text> */}

            <Text style={[st.tx14, st.txAlignJ, st.mr_10]}>
              {lang == 'hi' ? data?.hindiMessage1 : data?.message1}{' '}
              <Text
                style={[st.txDecor, {color: colors.frozy}]}
                onPress={() => openDialScreen(data?.number1)}>
                {data?.number1}
              </Text>{' '}
              {t('OR')}{' '}
              <Text
                style={[st.txDecor, {color: colors.frozy}]}
                onPress={() => openDialScreen(data?.number2)}>
                {data?.number2}
              </Text>{' '}
              {lang == 'hi' ? data?.hindiMessage2 : data?.message2}
            </Text>
          </View>
            )}
        </View>
      )}
    </View>
  );
};

export default DialText;

const styles = StyleSheet.create({});
