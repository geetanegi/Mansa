import {Text, View, FlatList, ScrollView, Platform, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles';
import Footer from '../../../components/footer';
import AuthHeader from '../../../components/Auth_Header';
import {useTranslation} from 'react-i18next';
import MagazinesItem from '../../../components/component-parts/magazinesItem';
import PamplateItem from '../../../components/component-parts/pamplateItem';
import {API} from '../../../utils/endpoints';
import {getApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import EmptyItem from '../../../components/component-parts/emptyItem';
import { languageConversion } from '../../../utils/helperfunctions/functions';
const IEC = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [magList, setMagList] = useState([]);
  const [pamList, setPamList] = useState([]);
  const [broucher, setBroucher] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getMagazines_handle = async () => {
    const url = API.GET_MAGAZINES + languageConversion(i18n);

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
          return a.displayOrder - b.displayOrder;
        });
        setMagList(sortArr);
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
    const unsubscribe = navigation.addListener('focus', () => {
      getMagazines_handle();
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem_magazines = ({item, index}) => {
    return (
      <MagazinesItem
        item={item}
        onClickPdf={() => navigation.navigate('ViewPdf', {url: item.url})}
      />
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMagazines_handle();
    setRefreshing(false);
  }, []);

  const ListEmptyComponent = () => {
    return !isLoading && <EmptyItem />;
  };

  return (
    <View style={st.container}>
      <AuthHeader
        title={t('IEC-Material')}
        onBack={() => navigation.navigate('Main')}
        gotohome={() => navigation.navigate('Main')}
      />

      <FlatList
        data={magList}
        renderItem={renderItem_magazines}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={ListEmptyComponent}
      />

      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default IEC;
