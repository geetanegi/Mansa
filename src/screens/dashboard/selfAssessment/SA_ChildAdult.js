import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Footer from '../../../components/footer';
import st from '../../../global/styles';
import {View} from 'react-native-animatable';
import AuthHeader from '../../../components/Auth_Header';
import {useTranslation, I18n} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import MansaImg from '../../../components/mansa';
import {getApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import {API} from '../../../utils/endpoints';
import {colors, images} from '../../../global/theme';
import { languageConversion } from '../../../utils/helperfunctions/functions';

const SA_ChildAdult = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData_handle = async () => {
    const url = API.GET_AGE + languageConversion(i18n);
    if (Platform.OS == 'android') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    try {
      const result = await getApi(url);
      if (result?.status == 200) {
        setIsLoading(false);
        const data = result.data;
        const tempdata = data.filter(i => i.ageId != 10);
        setData(tempdata);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getData_handle();
  }, []);

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('SELF_ASSESS')}
        onBack={() => navigation.goBack()}
        gotohome={() => navigation.navigate('Main')}
        // auth={true}
      />
      <ScrollView>
        <View style={[st.pd20, st.flex]} animation={'fadeInRight'} delay={500}>
          <View>
            {data?.map((i, n) => {
              const isEnd = n === data?.length - 1;
              return (
                <View
                  style={[
                    st.row,
                    {marginLeft: n % 2 != 0 && !isEnd ? '40%' : 0},
                  ]}
                  key={n}>
                  {isEnd ? (
                    <MansaImg imgsty={{width: 130, height: 242}} />
                  ) : null}
                  <View key={n}>
                    <TouchableOpacity
                      onPress={() => {
                        if (i.ageId == 1) {
                          navigation.navigate('SA_GnrlHELTH', {
                            id: i.ageId,
                            imgurl: i.discriptionimgurl,
                          });
                        } else {
                          navigation.navigate('SA_GnrlHELTH_adult', {
                            id: i.ageId,
                            imgurl: i.discriptionimgurl,
                          });
                        }
                      }}>
                      <LinearGradient
                        colors={
                          i.ageId == 1
                            ? ['#C63A32', '#C63A32']
                            : ['#E88431', '#E88431']
                        }
                        style={[
                          st.animatedCir_1,
                          {width: 203, height: 203, borderRadius: 102},
                        ]}>
                        <View style={st.pd20}>
                          <Text style={[st.tx16, {textAlign: 'center'}]}>
                            {i.ageGroup}
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    <View style={[st.animatedCir_2Pos, {left: 130, top: -45}]}>
                      <LinearGradient
                        // colors={
                        //   i.ageId == 1
                        //     ? ['#C63A32', '#C63A32']
                        //     : ['#E88431', '#E88431']
                        // }
                        colors={['#fff', '#fff']}
                        style={[
                          st.animatedCir_2,
                          {
                            width: 70,
                            height: 70,
                            borderRadius: 31,
                            borderColor:
                              i.ageId == 1 ? colors.danger : colors.warning,
                            elevation: 1,
                            shadowColor: colors.black,
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            shadowOffset: {width: 0, height: 1},
                          },
                        ]}>
                        <Image
                          source={{uri: i?.imgurl}}
                          // source={images.New1}
                          style={styles.imgsty}
                        />
                        <View></View>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default SA_ChildAdult;

const styles = StyleSheet.create({
  imgsty: {
    width: 55,
    height: 55,
    // borderRadius: 50,
    // position: 'absolute',
    // top: 4,
    // left: 7,
    resizeMode: 'contain',
    // opacity: 0.6,
  },
});
