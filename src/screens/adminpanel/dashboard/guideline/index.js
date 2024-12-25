import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import {useTranslation} from 'react-i18next';
import Alert from '../../../../components/alert';
import AdminInput from '../../../../components/adminInput';
import Button from '../../../../components/button';
import FloatingButton from '../../../../components/floatingbtn';
import EmptyItem from '../../../../components/component-parts/emptyItem';
import {getPickerDocResp} from '../../../../utils/helperfunctions/functions';
import GuidelineItem from '../IEC/component/IEC_item';
import {colors} from '../../../../global/theme';
import {selectDocument} from '../../../../utils/helperfunctions/functions';
import DeletePopUp from '../../../../components/deletePopUp';
import {editAlert} from '../../../../utils/helperfunctions/functions';
import {getApi, postApi, deleteApi, putApi} from '../../../../utils/apicalls';
import {API} from '../../../../utils/endpoints';
import Toast from 'react-native-simple-toast';
import Loader from '../../../../components/loader';
import {
  handleAPIErrorResponse,
  ValueEmpty,
} from '../../../../utils/helperfunctions/validations';

const INITIALINPUT = {
  title: '',
  desc: '',
};

const Guideline = ({navigation}) => {
  const {t} = useTranslation();
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('Are you sure?');
  const [subtitle, setSubtitle] = useState(
    'Do you really want to delete this item?',
  );
  const [pamplateId, setPamplateId] = useState('');
  const [edit, setEdit] = useState(false);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    Keyboard.dismiss();
    const emptyTitle = ValueEmpty(inputs?.title);
    // const emptyDecs = ValueEmpty(inputs?.desc);
    let isValid = true;

    if (emptyTitle) {
      handleError('*Required', 'title');
      isValid = false;
    } else {
      handleError('', 'title');
    }

    if (isValid) {
      if (edit) {
        update_Guideline();
      } else {
        addGuideline();
      }
    }
  };

  const getGuideline_handle = async () => {
    const url = API.GET_Guideline;
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
        // console.log({GET_Guideline: data});
        setData(data.reverse());
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getGuidelineId = async id => {
    const url = API.GET_GUIDELINE_BYID + id;
    console.log({url});
    try {
      setIsLoading(true);
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({title: data.title, desc: data.discription});
        const setData = {
          title: data?.desciption,
        };
        setInputs(setData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const deleteGuideline = async id => {
    const url = API.DELETE_GUIDELINE + id;
    console.log({url});
    try {
      setIsLoading(true);
      const result = await deleteApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({deletePamplate: data});
        getGuideline_handle();
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

  const addGuideline = async () => {
    const url = API.ADD_GUIDELINE;
    console.log({url});
    const params = {
      desciption: inputs?.title,
      status: true,
    };
    console.log({params, url});
    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({addPamplate: data});
        setShowModal(false);
        setIsLoading(false);
        setInputs(INITIALINPUT);
        getGuideline_handle();
        Toast.show(data);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const update_Guideline = async () => {
    const url = API.UPDATE_GUIDELINE + pamplateId;
    console.log({url});
    const params = {
      desciption: inputs?.title,
      status: true,
    };
    try {
      setIsLoading(true);
      const result = await putApi(url, params);
      if (result?.status == 200) {
        const data = result.data;
        setShowModal(false);
        setIsLoading(false);
        setInputs(INITIALINPUT);
        Toast.show(data.message);
        getGuideline_handle();
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getGuideline_handle();
  }, []);

  const showEditPopUp = async id => {
    const data = await editAlert();
    if (data == 'YES') {
      getGuidelineId(id);
      setEdit(true);
      setShowModal(true);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <GuidelineItem
        item={item}
        onEditItem={() => {
          showEditPopUp(item?.id);
          setPamplateId(item?.id);
        }}
        onDeleteItem={() => {
          setPopupMessageVisibility(true);
          setPamplateId(item?.id);
        }}
        title={title}
        subtitle={subtitle}
        onDeletePress={() => deleteGuideline(item?.id)}
      />
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={st.mt_B}>
        <Text style={[st.tx16, {color: colors.black}]}>{'List'}</Text>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return <EmptyItem />;
  };

  const onSelectDocHandle = async () => {
    const mydoc = await selectDocument();
    const docRes = getPickerDocResp(mydoc);
    console.log({docRes});
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
        onPress_api={() => deleteGuideline(pamplateId)}
      />
    );
  };

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={t('Guideline')}
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
      <FloatingButton
        onPress={() => {
          setShowModal(true);
          setEdit(false);
          setInputs(INITIALINPUT);
        }}
      />

      {show_alert_msg()}

      <Alert showModal={showModal} setShowModal={setShowModal}>
        <View style={st.pd20}>
          <View>
            <AdminInput
              placeholder={'Enter Guideline'}
              onChangeText={text => handleOnchange(text, 'title')}
              onFocus={() => handleError(null, 'title')}
              error={errors?.title}
              label={'Guideline'}
              labelColor={colors.lightText}
              multiline
              value={inputs?.title}
            />
          </View>


          <View style={st.mt_B}>
            <Button
              title={t('SUBMIT')}
              backgroundColor={colors.lightFrozy}
              color={colors.white}
              onPress={() => validation()}
            />
          </View>
          <View style={st.mt_B}></View>
        </View>
      </Alert>

      {isLoading && <Loader />}
    </View>
  );
};

export default Guideline;

const styles = StyleSheet.create({});
