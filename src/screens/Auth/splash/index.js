import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React, {useEffect} from 'react';
import {StackActions} from '@react-navigation/native';
import st from '../../../global/styles';
import {images} from '../../../global/theme';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation, route}) => {
  const login_data = useSelector(state => state.login?.data);
  const {i18n} = useTranslation();

  useEffect(() => {
    const syncAppLang = async () => {
      let lang = await AsyncStorage.getItem('Mansa-selectedLang');

      i18n.changeLanguage(lang).then(() => {
      });
    };

    syncAppLang();
  }, []);

  return (
    <View style={[st.flex, {backgroundColor: '#151246'}]}>
      <View style={[st.center]}>
        <Image style={st.lotus_sty} source={images.lotus_gif} />
      </View>
    </View>
  );
};

export default Splash;
