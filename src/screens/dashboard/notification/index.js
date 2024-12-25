import {StyleSheet, Text, View, FlatList, Platform, Image, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import st from '../../../global/styles';
import {useTranslation} from 'react-i18next';
import {colors, images} from '../../../global/theme';
import {API} from '../../../utils/endpoints';
import {getApi} from '../../../utils/apicalls';
import Loader from '../../../components/loader';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import EmptyItem from '../../../components/component-parts/emptyItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = ({navigation, route}) => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getfirebaseToken = async () => {
    try {
      const fcmtoken = await AsyncStorage.getItem('token');
      return fcmtoken;
    } catch (e) {
      console.log(e);
    }
  };

  const getNotification_handle = async () => {
    const url = `${API.GET_NOTIFICATION}${await getfirebaseToken()}`; ///${languageConversion(i18n)}`;
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({Notificationscreen:data});
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
    getNotification_handle();
  }, []);

  const formatDate = date => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          st.notifiCard,
          st.shadowProp,
          {backgroundColor: !item.isSeen ? '#dfe7f5' : '#fff'},
        ]}
        key={index}>
        <View>
          <Text style={[st.tx14, {color: colors.black}]}>{item.title}</Text>
          <Text style={[st.tx12, {color: colors.lightText}]}>
            {item.content}
          </Text>
          {/* <Text style={[st.tx10, {color: colors.lightText}]}>
            {formatDate(new Date(item.createdDate))}
          </Text> */}
        </View>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    if (!isLoading) return <EmptyItem txColor={colors.black} />;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNotification_handle();
    setRefreshing(false);
  }, []);

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('Notifications')}
        onBack={() => navigation.goBack()}
        gotohome={() => navigation.navigate('Main')}
      />
      <FlatList
        data={data}
        contentContainerStyle={st.pd20}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default Notification;
