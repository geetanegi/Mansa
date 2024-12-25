import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images, colors} from '../../global/theme';
import Icon from 'react-native-vector-icons/Octicons';
import st from '../../global/styles';
import {useDispatch, useSelector} from 'react-redux';
import {clearLogin} from '../../redux/reducers/Login';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getApi} from '../../utils/apicalls';
import {API} from '../../utils/endpoints';
import {handleAPIErrorResponse} from '../../utils/helperfunctions/validations';

const Header = ({navigation, getGreetHandle, getfirebaseToken}) => {
  const [lang, setLang] = useState('');
  const dispatch = useDispatch();
  const {i18n, t} = useTranslation();
  const [data, setData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const updateLangInStorage = async lang => {
    i18n
      ?.changeLanguage(lang)
      .then(() => {
        getLang(lang);
      })
      .catch(e => {});
  };

  const getLang = async lang => {
    try {
      await AsyncStorage.setItem('Mansa-selectedLang', lang);
    } catch (e) {
      console.log('Error in saving language preference - ', e);
    }
  };

  useEffect(() => {
    const syncAppLang = async () => {
      let lang = await AsyncStorage.getItem('Mansa-selectedLang');

      i18n.changeLanguage(lang).then(() => {
        setLang(lang);
      });
    };

    syncAppLang();
  }, []);

  const getNotification_handle = async () => {
    const firebaseToken = await getfirebaseToken();
    const url = `${API.GET_NOTIF_COUNT}${firebaseToken}`; ///${languageConversion(i18n)}`;
    try {
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({getNotification_handle: data});
        setData(data);
      }
    } catch (e) {
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getNotification_handle();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotification_handle();
    });

    return unsubscribe;
  }, [navigation]);

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const formattedCount =
    data?.count > 999 ? `${(data?.count / 1000).toFixed(1)}K` : data?.count;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingHorizontal: 15,
        paddingBottom: 15,
        backgroundColor: colors.blue,
      }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={images.menu}
          style={{width: 20, height: 20, tintColor: '#fff'}}
        />
      </TouchableOpacity>
      <View style={[st.row, st.align_C]}>
        <TouchableOpacity
          style={[st.row, {marginRight: 20}]}
          onPress={() => {
            // getGreetHandle();
            if (lang == 'hi') {
              updateLangInStorage('en');
              setLang('en');
              getGreetHandle();
            }
            if (lang == 'en') {
              updateLangInStorage('hi');
              setLang('hi');
              getGreetHandle();
            }
          }}>
          <Icon name={'globe'} size={18} color={colors.white}></Icon>
          <Text style={[st.tx14]}>{lang == 'hi' ? ' English' : ' हिंदी'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={() => navigation.navigate('Notification')}>
          <View style={{position: 'absolute', top: -10, maxWidth: 30}}>
            <View style={[st.bell_count, data?.count > 0 && st.badgeVisible]}>
              <Text style={st.tx12}>{formattedCount}</Text>
            </View>
          </View>
          <Icon name={'bell'} size={20} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dispatch(clearLogin());
            // dispatch(clearProfile())
          }}>
          <Icon name={'sign-out'} size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
