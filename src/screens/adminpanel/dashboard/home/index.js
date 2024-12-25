import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable, BackHandler
} from 'react-native';
import React from 'react';
import AdminHeader from '../../../../components/adminHeader';
import st from '../../../../global/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../../global/theme';
import {useTranslation} from 'react-i18next';
import { backAction } from '../../../../utils/helperfunctions/functions';
import {useFocusEffect} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
const itemWidth = (width - 60) / 2;

const AdminHome = ({navigation}) => {
  const {t} = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        style={styles.box}
        onPress={() => navigation.navigate(item.screenName)}>
        <Icon name={item.icon} size={60} color={colors.black} />
        <Text style={[st.tx16, {color: colors.black}]}>{t(item.title)}</Text>
      </Pressable>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={st.mt_B}>
        <Text style={[st.tx20, {color: colors.black}]}>{t('dashboard')}</Text>
      </View>
    );
  };

  return (
    <View style={[st.flex, {backgroundColor: colors.white}]}>
      <AdminHeader navigation={navigation} />

      <FlatList
        contentContainerStyle={[st.pd20]}
        columnWrapperStyle={[st.row]}
        data={data}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  box: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    borderColor: colors.lightText,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 0.5,
    borderWidth: 0.2,
    width: itemWidth,
    height: itemWidth,
    margin: 5,
    justifyContent: 'center',
  },
});

const data = [
  {
    icon: 'chart-bell-curve',
    id: 1,
    title: 'Reportsandstatistics',
    screenName: 'ReportStack',
  },
  {icon: 'video-outline', id: 2, title: 'AWARENESS', screenName: 'VideoStack'},
  {icon: 'book-open-variant', id: 3, title: 'Awareness Material', screenName: 'IECStack'},
  {
    icon: 'head-question-outline',
    id: 4,
    title: 'Self-asses_Ques',
    screenName: 'SelfAssessmentStack',
  },
  // {
  //   icon: 'briefcase-edit-outline',
  //   id: 5,
  //   title: 'New_Guide',
  //   screenName: 'GuidelineStack',
  // },
  {icon: 'lightbulb-on-outline', id: 6, title: 'Tips', screenName: 'Tips'},
];
