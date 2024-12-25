import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AdminStackHeader from '../../../../components/adminStackHeader';
import st from '../../../../global/styles';
import Alert from '../../../../components/alert';
import DeletePopUp from '../../../../components/deletePopUp';
import Button from '../../../../components/button';
import MyItem from './component/MyItem';
import {useTranslation} from 'react-i18next';
import AdminInput from '../../../../components/adminInput';
import {colors} from '../../../../global/theme';
import Icon from 'react-native-vector-icons/Entypo';
import {API} from '../../../../utils/endpoints';
import {getApi, postApi, deleteApi} from '../../../../utils/apicalls';
import {
  handleAPIErrorResponse,
  ValueEmpty,
} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import Toast from 'react-native-simple-toast';
import EmptyItem from '../../../../components/component-parts/emptyItem';

const INITIALINPUT = {
  title: '',
};

const Ques = ({navigation, route}) => {
  const {t} = useTranslation();
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('Are you sure?');
  const [subtitle, setSubtitle] = useState(
    'Do you really want to delete this item?',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [deletedId, setDeletedId] = useState('');

  const subFeelType = route?.params?.subFeelType;
  const feelingType = route?.params?.feelingType;
  const feelingId = route?.params?.feelingId;
  const MyfeelingId = route?.params?.MyfeelingId;

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const getQuestions = async () => {
    let url = '';

    url = API.GET_FEEL_QUES + feelingId;

    console.log({url, subFeelType});
    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({data});
        let newArr = data.map(v => ({...v, checkIndex: null}));
        // console.log({newArr});
        var sortArr = newArr.sort(function (a, b) {
          return a.seq - b.seq;
        });
        setData(sortArr);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const deleteQuestion = async id => {
    const url = API.DELETE_FEELQUES + id;
    console.log({url});
    try {
      setIsLoading(true);
      const result = await deleteApi(url);
      console.log({result});
      if (result?.status == 200) {
        const data = result.data;
        // console.log({deletePamplate: data});
        getQuestions();
        Toast.show(data.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log({e});
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getQuestions();
    });

    return unsubscribe;
  }, [navigation]);

  const ListEmptyComponent = () => {
    return <EmptyItem />;
  };

  const ListHeaderComponent = ({}) => {
    return (
      <View style={[st.mt_B, st.row, st.justify_S]}>
        <Text style={[st.tx18, {color: colors.black}]}>{subFeelType}</Text>
        <TouchableOpacity
          onPress={() => {
            // setShowModal(true);
            navigation.navigate('AllQues', {
              feelingId: feelingId,
              MyfeelingId: MyfeelingId,
            });
          }}>
          <Icon name={'circle-with-plus'} size={25} color={colors.lightFrozy} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <MyItem
        item={item}
        onEditClick={() =>
          navigation.navigate('EditQues', {
            EditData: item,
            feelingId: feelingId,
            MyfeelingId: MyfeelingId,
          })
        }
        onDeleteClick={() => {
          setPopupMessageVisibility(true);
          setDeletedId(item.feelquesid);
        }}
        gotoQues={() => navigation.navigate('Ques')}
        hideArrow={true}
        title={title}
        subtitle={subtitle}
        onDeletePress={() => deleteQuestion(item.feelquesid)}
        enable={true}
      />
    );
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const show_alert_msg = value => {
    return (
      <DeletePopUp
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        onPress_api={() => deleteQuestion(deletedId)}
      />
    );
  };

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={''}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />

      <FlatList
        contentContainerStyle={st.pd20}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
      />

      {/* <Alert showModal={showModal} setShowModal={setShowModal}>
        <View style={[st.pd20]}>
          <View style={st.mt_t10}>
            <AdminInput
              placeholder={'Enter here'}
              onChangeText={text => handleOnchange(text, 'title')}
              onFocus={() => handleError(null, 'title')}
              error={errors?.title}
              iconName={''}
              label={'Title'}
              labelColor={colors.lightText}
            />
          </View>

          <Button
            title={t('SUBMIT')}
            onPress={() => {
              setShowModal(false);
            }}
            backgroundColor={colors.lightFrozy}
            color={colors.white}
          />
        </View>
      </Alert> */}

      {show_alert_msg()}
    </View>
  );
};

export default Ques;

const styles = StyleSheet.create({});
