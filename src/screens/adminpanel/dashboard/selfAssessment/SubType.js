import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AdminStackHeader from '../../../../components/adminStackHeader';
import st from '../../../../global/styles';
import AdminInput from '../../../../components/adminInput';
import {colors} from '../../../../global/theme';
import EmptyItem from '../../../../components/component-parts/emptyItem';
import MyItem from './component/MyItem';
import Icon from 'react-native-vector-icons/Entypo';
import Alert from '../../../../components/alert';
import Button from '../../../../components/button';
import {useTranslation} from 'react-i18next';
import DeletePopUp from '../../../../components/deletePopUp';
import {editAlert} from '../../../../utils/helperfunctions/functions';
import {API} from '../../../../utils/endpoints';
import {getApi, postApi} from '../../../../utils/apicalls';
import Loader from '../../../../components/loader';
import {
  handleAPIErrorResponse,
  ValueEmpty,
} from '../../../../utils/helperfunctions/validations';
import Toast from 'react-native-simple-toast';

const INITIALINPUT = {
  title: '',
  describe: '',
};

const SubTypeFeel = ({navigation, route}) => {
  const {t} = useTranslation();
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('Are you sure?');
  const [feelingId, setFeelingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subtitle, setSubtitle] = useState(
    'Do you really want to delete this item?',
  );
  const [edit, setEdit] = useState(false);

  const feelingType = route?.params?.feelingType;
  const MyfeelingId = route?.params?.feelingId

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    Keyboard.dismiss();
    const emptyTitle = ValueEmpty(inputs?.title);
    const emptyDecs = ValueEmpty(inputs?.describe);
    let isValid = true;

    if (emptyTitle) {
      handleError('*Required', 'title');
      isValid = false;
    } else {
      handleError('', 'title');
    }
    if (emptyDecs) {
      handleError('*Required', 'describe');
      isValid = false;
    } else {
      handleError('', 'describe');
    }

    if (isValid) {
      if (edit) {
        update_feeling();
      } else {
        addFeelings();
      }
    }
  };

  const update_feeling = async () => {
    const url = API.ADD_SUBFEELINGS;
    console.log({url});
    const params = {
      subfeeType: inputs?.title,
      isActive: true,
      description: inputs?.describe,
      subFeelingId: feelingId,
    };
    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      console.log({result});
      if (result?.status == 200) {
        const data = result.data;
        setShowModal(false);
        setIsLoading(false);
        setInputs(INITIALINPUT);
        setFeelingId('');
        getFeelings_handle();
        Toast.show(data.message);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const addFeelings = async () => {
    const url = API.ADD_SUBFEELINGS;
    const params = {
      subfeeType: inputs?.title,
      isActive: true,
      description: inputs?.describe,
      subFeelingId: null,
    };
    console.log({url, params});

    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      console.log({result})
      if (result?.status == 201) {
        const data = result.data;
        Toast.show(data.message);
        console.log({data});
        setShowModal(false);
        setIsLoading(false);
        getFeelings_handle();
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e)
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getFeelings_handle = async () => {
    const url = API.GET_SUB_FEEL + MyfeelingId;
    console.log({url});
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

  const deleteFeeling = async id => {
    const url = API.DELETE_FEELING + id;
    console.log({url});
    try {
      setIsLoading(true);
      const result = await deleteApi(url);
      console.log({result});
      if (result?.status == 200) {
        const data = result.data;
        console.log({data});
        setIsLoading(false);
        getFeelings_handle();
        Toast.show(data.message);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getFeelings_handle();
  }, []);

  const ListEmptyComponent = () => {
    return <EmptyItem />;
  };

  const ListHeaderComponent = () => {
    return (
      <View style={[st.mt_B, st.row, st.justify_S]}>
        <Text style={[st.tx18, {color: colors.black}]}>
          {feelingType}
        </Text>
        {/* <TouchableOpacity onPress={() => setShowModal(true)}>
          <Icon name={'circle-with-plus'} size={25} color={colors.lightFrozy} />
        </TouchableOpacity> */}
      </View>
    );
  };

  const showEditPopUp = async (editData) => {
    const data = await editAlert();

    if (data == 'YES') {
      setShowModal(true);
      // getFelingsId(feelingId);
      setEdit(true);
      const tempdata = {
        title: editData?.feelingType,
        describe: editData?.description,
      };

      setInputs(tempdata);
      setFeelingId(editData?.feelingId);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <MyItem
        item={item}
        onEditClick={() => showEditPopUp(item)}
        onDeleteClick={() => {
          setPopupMessageVisibility(true);
          setFeelingId(item.feelingId);
        }}
        gotoQues={() =>
          navigation.navigate('Ques', {
            subFeelType: item.subFeelType,
            feelingType: feelingType,
            feelingId: item.subFeelingId,
            MyfeelingId: MyfeelingId
          })
        }
        title={title}
        subtitle={subtitle}
        onDeletePress={() => deleteFeeling(item.feelingId)}
        enable={false}
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
        onPress_api={() => alert('Successfully deleted')}
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

      <Alert
        showModal={showModal}
        setShowModal={setShowModal}
        onClosePress={() => {
          setInputs(INITIALINPUT);
          setFeelingId('');
        }}>
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
            <AdminInput
              placeholder={'Enter here'}
              onChangeText={text => handleOnchange(text, 'describe')}
              onFocus={() => handleError(null, 'describe')}
              error={errors?.describe}
              iconName={''}
              label={'Description'}
              labelColor={colors.lightText}
              value={inputs?.describe}
            />
          </View>

          <Button
            title={t('SUBMIT')}
            onPress={() => {
              validation();
            }}
            backgroundColor={colors.lightFrozy}
            color={colors.white}
          />
        </View>
      </Alert>

      {show_alert_msg()}
      {isLoading && <Loader />}
    </View>
  );
};

export default SubTypeFeel;

const styles = StyleSheet.create({});
