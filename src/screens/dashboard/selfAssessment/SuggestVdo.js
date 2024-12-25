import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles';
import Footer from '../../../components/footer';
import AuthHeader from '../../../components/Auth_Header';
import {useTranslation} from 'react-i18next';
import {colors, images} from '../../../global/theme';
import Icon from 'react-native-vector-icons/Foundation';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Button from '../../../components/button';
import VideoItem from '../../../components/component-parts/videoItem';
import MagazinesItem from '../../../components/component-parts/magazinesItem';
import {API} from '../../../utils/endpoints';
import {getApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import EmptyItem from '../../../components/component-parts/emptyItem';
import {languageConversion} from '../../../utils/helperfunctions/functions';
const SuggestVdo = ({navigation, route}) => {
  const [vdoList, setVdoList] = useState([]);
  const [magList, setMagList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {t, i18n} = useTranslation();
  const subfeelId = route?.params?.feelingId;

  const getVideo_handle = async () => {
    const url = `${API.GET_VIDEO_BYFEEL}${subfeelId}`;
    // const url = API.GET_VIDEO;
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
          return a.sequence - b.sequence;
        });
        setVdoList(sortArr);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getMagazines_handle = async () => {
    // const url = API.GET_MAGAZINES_BYFEEL + subfeelId;
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
    getVideo_handle();
    getMagazines_handle();
  }, []);

  const ListHeaderComponent_vdo = () => {
    return (
      <View style={st.pd_H20}>
        {!isLoading && <Text style={[st.tx18, st.mt_B]}>{t('AWARENESS')}</Text>}
      </View>
    );
  };

  const ListHeaderComponent_magazines = () => {
    return (
      <View style={st.pd_H20}>
        {!isLoading && (
          <Text style={[st.tx18, st.mt_B]}>{t('IEC-Material')}</Text>
        )}
      </View>
    );
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
    if (!isLoading) return <EmptyItem />;
  };

  const renderItem_magazines = ({item, index}) => {
    return (
      <MagazinesItem
        item={item}
        onClickPdf={() => navigation.navigate('ViewPdf', {url: item.url})}
      />
    );
  };

  return (
    <View style={st.container}>
      <AuthHeader
        title={t('')}
        onBack={() => navigation.goBack()}
        auth={true}
        assessment={true}
        gotoAssessment={() => navigation.navigate('SA_lowScore')}
      />
      <ScrollView>
        <View>
          <FlatList
            data={vdoList}
            renderItem={(item, index) => {
              if (item?.index <= 1) {
                return renderItem_vdo(item, index);
              }
            }}
            ListHeaderComponent={ListHeaderComponent_vdo}
            ListEmptyComponent={ListEmptyComponent}
          />
          {vdoList?.length > 0 && (
            <Pressable
              onPress={() => {
                navigation.navigate('ListMore', {
                  data: vdoList,
                  renderItem: renderItem_vdo,
                });
              }}>
              <Text style={[st.tx16, st.ml_15, st.mt_B]}>{t('See_all_vdo')}</Text>
            </Pressable>
          )}

          <FlatList
            data={magList}
            renderItem={(item, index) => {
              if (item?.index <= 1) {
                return renderItem_magazines(item, index);
              }
            }}
            // contentContainerStyle={[st.pd20, {paddingTop: 0}]}
            ListHeaderComponent={ListHeaderComponent_magazines}
            ListEmptyComponent={ListEmptyComponent}
          />

          {magList?.length > 0 && (
            <Pressable
              onPress={() => {
                navigation.navigate('ListMore', {
                  data: magList,
                  renderItem: renderItem_magazines,
                });
              }}>
              <Text style={[st.tx16, st.ml_15, st.mt_B]}>{t('See all')}</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
      <View style={st.mh_10}>
        <View style={st.mh_10}>
          <Button
            title={t('Next')}
            onPress={() => navigation.navigate('SA_Contact')}
          />
        </View>
      </View>
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default SuggestVdo;
