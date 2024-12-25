import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles';
import Footer from '../../../components/footer';
import AuthHeader from '../../../components/Auth_Header';
import DatePicker from 'react-native-date-picker';
import EmptyItem from '../../../components/component-parts/emptyItem';
import {colors} from '../../../global/theme';
import Icon from 'react-native-vector-icons/Feather';
import {reportDateFormet} from '../../../utils/helperfunctions/validations';
import {Table, Row, Rows} from 'react-native-table-component';
import {getApi} from '../../../utils/apicalls';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import {API} from '../../../utils/endpoints';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../components/button';
import {useTranslation, I18n} from 'react-i18next';
import {languageConversion} from '../../../utils/helperfunctions/functions';

const ChildHistory = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const [fileData, setFileData] = useState();
  const [tableHead, setTableHead] = useState([
    t('Category'),
    t('Score'),
    t('Date'),
  ]);
  const [from, setFrom] = useState(new Date());
  const [openFrom, setOpenFrom] = useState(false);
  const [selectedFrom, setSelectFrom] = useState('');
  const [to, setTo] = useState(new Date());
  const [openTo, setOpenTo] = useState(false);
  const [selectedTo, setSelectedTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const profileData = useSelector(state => state.profile?.data);

  const setDateFormet = (date, flag) => {
    let dob = reportDateFormet(date);

    if (flag == '1') {
      setSelectFrom(dob);
    } else {
      setSelectedTo(dob);
    }
  };

  const validation = () => {
    if (selectedFrom) {
      if (selectedTo) {
        const fromDateObj = new Date(selectedFrom);
        const toDateObj = new Date(selectedTo);
        if (fromDateObj.getTime() > toDateObj.getTime()) {
          Alert.alert(
            'Error',
            'From date should be less than or equal to to date',
          );
        } else {
          console.log('Dates are valid');
          getDataHandle();
        }
      } else {
        // Alert.alert(t('Please select `To Date`'));
        Alert.alert('', t('Please select `To Date`'), [
          {text: t('Yes'), onPress: () => console.log('close')},
        ]);
      }
    } else {
      Alert.alert('', t('Please select `From Date`'), [
        {text: t('Yes'), onPress: () => console.log('close')},
      ]);
    }
  };

  const getDataHandle = async () => {
    const url = `${API.GET_CHILD_HISTORY}/${
      profileData?.data[0]?.id
    }/${selectedFrom}/${selectedTo}/${languageConversion(i18n)}`;
    try {
      setIsLoading(true);
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data?.reverse();
        // console.log({childHistory: data});
        setFileData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const ListHeaderComponent = () => {
    return (
      <View>
        <View style={st.row}>
          <View style={st.wdh50}>
            <Text style={[st.tx16, {color: colors.black}]}>{t('From')}</Text>
            <View style={[st.row, styles.datePicsty]}>
              <Text
                style={[st.tx14, st.mr_10, st.align_C, {color: colors.black}]}>
                {selectedFrom ? selectedFrom : t('Select Date')}
              </Text>
              <TouchableOpacity onPress={() => setOpenFrom(true)}>
                <Icon name={'calendar'} size={15} color={colors.black} />
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              open={openFrom}
              mode={'date'}
              date={from}
              onConfirm={date => {
                setOpenFrom(false);
                setFrom(date);
                setDateFormet(date, '1');
              }}
              onCancel={() => {
                setOpenFrom(false);
              }}
              maximumDate={new Date()}
            />
          </View>
          <View style={st.wdh50}>
            <Text style={[st.tx16, {color: colors.black}]}>{t('To')}</Text>
            <View style={[st.row, styles.datePicsty]}>
              <Text
                style={[st.tx14, st.mr_10, st.align_C, {color: colors.black}]}>
                {selectedTo ? selectedTo : t('Select Date')}
              </Text>
              <TouchableOpacity onPress={() => setOpenTo(true)}>
                <Icon name={'calendar'} size={15} color={colors.black} />
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              mode={'date'}
              open={openTo}
              date={to}
              onConfirm={date => {
                setOpenTo(false);
                setTo(date);
                setDateFormet(date, '2');
              }}
              onCancel={() => {
                setOpenTo(false);
              }}
              maximumDate={new Date()}
            />
          </View>
        </View>

        <View style={st.align_C}>
          <Button
            title={t('SUBMIT')}
            onPress={() => validation()}
            backgroundColor={colors.blue}
            color={colors.white}
          />
        </View>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return <EmptyItem txColor={colors.black} />;
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={[st.notifiCard, st.mt_t10]} key={index}>
        {item.childName && (
          <View style={st.row}>
            <View style={st.wdh50}>
              <Text style={[st.tx14, {color: colors.black}]}>
                {t(`Child Name`)}:
              </Text>
            </View>
            <View style={st.wdh50}>
              <Text style={[st.tx14, {color: colors.black}]}>
                {item.childName}
              </Text>
            </View>
          </View>
        )}
        {item.district && (
          <View style={st.row}>
            <View style={st.wdh50}>
              <Text style={[st.tx14, {color: colors.black}]}>{t(`DIST`)}:</Text>
            </View>
            <View style={st.wdh50}>
              <Text style={[st.tx14, {color: colors.black}]}>
                {item.district}
              </Text>
            </View>
          </View>
        )}

        <View style={st.row}>
          <View style={st.wdh50}>
            <Text style={[st.tx14, {color: colors.black}]}>{t(`Age`)}:</Text>
          </View>
          <View style={st.wdh50}>
            <Text style={[st.tx14, {color: colors.black}]}>{item.age}</Text>
          </View>
        </View>

        <View style={st.row}>
          <View style={st.wdh50}>
            <Text style={[st.tx14, {color: colors.black}]}>{t(`Gender`)}:</Text>
          </View>
          <View style={st.wdh50}>
            <Text style={[st.tx14, {color: colors.black}]}>{item.gender}</Text>
          </View>
        </View>

        {item.disorderName && (
          <View style={st.row}>
            <View style={st.wdh50}>
              <Text style={[st.tx14, {color: colors.black}]}>
                {t(`Disorder Name`)}:
              </Text>
            </View>
            <View style={st.wdh50}>
              <Text style={[st.tx14, {color: colors.black}]}>
                {item.disorderName}
              </Text>
            </View>
          </View>
        )}

        <View style={st.row}>
          <View style={st.wdh50}>
            <Text style={[st.tx14, {color: colors.black}]}>{t(`Score`)}:</Text>
          </View>
          <View style={st.wdh50}>
            <Text style={[st.tx14, {color: colors.black}]}>{item.score}</Text>
          </View>
        </View>

        <View style={st.row}>
          <View style={st.wdh50}>
            <Text style={[st.tx14, {color: colors.black}]}>{t(`Date`)}:</Text>
          </View>
          <View style={st.wdh50}>
            <Text style={[st.tx14, {color: colors.black}]}>
              {item.submittedDate}
            </Text>
          </View>
        </View>

        <View style={st.row}>
          <View style={st.wdh50}>
            <Text style={[st.tx14, {color: colors.black}]}>{t(`Study`)}:</Text>
          </View>
          <View style={st.wdh50}>
            <Text style={[st.tx14, {color: colors.black}]}>
              {item.isStudy ? item.isStudy : item.noStudy ? 'Not Studying' : ''}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('ChildHistory')}
        onBack={() => navigation.navigate('Main')}
        gotohome={() => navigation.navigate('Main')}
      />

      <FlatList
        contentContainerStyle={[st.pd20]}
        data={fileData}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
      />

      <Footer />
      {isLoading && <Loader />}
    </View>
  );
};

export default ChildHistory;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  datePicsty: {
    backgroundColor: '#E6E6E6',
    padding: 5,
    width: 160,
  },
});
