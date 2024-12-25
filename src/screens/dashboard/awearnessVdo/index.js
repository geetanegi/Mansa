import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import st from '../../../global/styles';
import {useTranslation, I18n} from 'react-i18next';
import VideoItem from '../../../components/component-parts/videoItem';
import {colors} from '../../../global/theme';
import EmptyItem from '../../../components/component-parts/emptyItem';
import {getApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import {API} from '../../../utils/endpoints';
import {languageConversion} from '../../../utils/helperfunctions/functions';

const AwarenessVdo = ({navigation}) => {
  const [search, setSearch] = useState('');
  const {t, i18n} = useTranslation();
  const [vdoList, setVdoList] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getVideosList = async () => {
    const url = API.GET_VIDEO + languageConversion(i18n);
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
        var sortArr = data.sort(function (a, b) {
          return a.sequence - b.sequence;
        });
        setVdoList(sortArr);
        setFilteredDataSource(data);
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
    getVideosList();
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = vdoList.filter(function (item) {
        const itemData =
          item.videoName || item.hindivideoName
            ? (item.videoName || item.hindivideoName).toUpperCase()
            : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(vdoList);
      setSearch(text);
    }
  };

  const renderItem_vdo = ({item, index}) => {
    return (
      <VideoItem
        item={item}
        index={index}
        onPress={() => navigation.navigate('ViewVdo', {item: item})}
      />
    );
  };

  const ListEmptyComponent = () => {
    return !isLoading && <EmptyItem />;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getVideosList();
    setRefreshing(false);
  }, []);

  return (
    <View style={st.container}>
      <AuthHeader
        title={t('AWARENESS')}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={st.pd20}>
          <View style={[st.mt_B]}>
            <TextInput
              style={styles.inputs}
              onChangeText={text => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder={t('Search')}
              placeholderTextColor={colors.white}
            />
          </View>
          <FlatList
            data={filteredDataSource}
            renderItem={renderItem_vdo}
            ListEmptyComponent={ListEmptyComponent}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default AwarenessVdo;

const styles = StyleSheet.create({
  inputs: {
    borderRadius: 8,
    height: 50,
    color: colors.white,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
});
