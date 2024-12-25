import {StyleSheet, Text, View, FlatList, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import {useTranslation} from 'react-i18next';
import EmptyItem from '../../../../components/component-parts/emptyItem';
import {colors} from '../../../../global/theme';
import AdminVideoItem from '../../../../components/component-parts/adminVideoItem';
import FloatingButton from '../../../../components/floatingbtn';
import DeletePopUp from '../../../../components/deletePopUp';
import {API} from '../../../../utils/endpoints';
import {postApi, getApi, deleteApi} from '../../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import Toast from 'react-native-simple-toast';
import RNPickerSelect from 'react-native-picker-select';

const Video = ({navigation}) => {
  const {t} = useTranslation();

  const [data, setData] = useState([]);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('Are you sure?');
  const [subtitle, setSubtitle] = useState(
    'Do you really want to delete this item?',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const getVideosList = async () => {
    const url = API.GET_VIDEO;
    try {
      if (Platform.OS == 'android') {
        // setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data?.reverse();
        // console.log({data});
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
    const unsubscribe = navigation.addListener('focus', () => {
      getVideosList();
    });

    return unsubscribe;
  }, [navigation]);

  const deleteVideohandle = async (id) => {
    const url = API.DELETE_VDO + id;
    console.log({url})
    try {
      setIsLoading(true);
      const result = await deleteApi(url);
      if (result?.status == 200) {
        const data = result.data;
        console.log('deleted video => ', data);
        getVideosList()
        Toast.show(data.message);
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

  const renderItem_vdo = ({item, index}) => {
    return (
      <AdminVideoItem
        item={item}
        gotoedit={() => navigation.navigate('AddVdo', {edit: true, id: item.videoId})}
        openDeletePopup={() => {
          setPopupMessageVisibility(true);
          setDeleteId(item.videoId);
        }}
        // gotoView={() => navigation.navigate('ViewVdo')}
        title={title}
        subtitle={subtitle}
        onPressDelete={() => deleteVideohandle(deleteId)}
        onPress={() => navigation.navigate('ViewVdo', {item: item})}
      />
    );
  };

  const ListEmptyComponent = () => {
    return !isLoading && <EmptyItem txColor={colors.black} />;
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const show_alert_msg = () => {
    return (
      <DeletePopUp
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        onPress_api={() => deleteVideohandle(deleteId)}
      />
    );
  };

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={t('AWARENESS')}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />

      <FlatList
        contentContainerStyle={[st.pd20]}
        data={data}
        renderItem={renderItem_vdo}
        ListEmptyComponent={ListEmptyComponent}
      />

      {show_alert_msg()}

      <FloatingButton
        onPress={() => {
          navigation.navigate('AddVdo');
        }}
      />
      {isLoading && <Loader />}
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({});

const vdoData = [
  {
    title: 'Prepare for your first skateboard jump',
    name: 'Jordan Wise',
    ago: '•  2 days ago',
    views: '125,908 views',
    img: '',
  },
  {
    title: 'Basic how to ride your skateboard comfortly',
    name: 'Jordan Wise',
    ago: '•  2 days ago',
    views: '125,908 views',
    img: '',
  },
  {
    title: 'Basic how to ride your skateboard comfortly',
    name: 'Jordan Wise',
    ago: '•  2 days ago',
    views: '125,908 views',
    img: '',
  },
];
