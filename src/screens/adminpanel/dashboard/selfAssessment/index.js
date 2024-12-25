import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../../global/theme';
import Icon from 'react-native-vector-icons/Entypo';
import Alert from '../../../../components/alert';
import AdminInput from '../../../../components/adminInput';
import Button from '../../../../components/button';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import DeletePopUp from '../../../../components/deletePopUp';
import {
  editAlert,
  deleteAlert,
} from '../../../../utils/helperfunctions/functions';
import {API} from '../../../../utils/endpoints';
import {getApi, postApi, deleteApi} from '../../../../utils/apicalls';
import {
  handleAPIErrorResponse,
  ValueEmpty,
} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';
import Toast from 'react-native-simple-toast';

const INITIALINPUT = {
  title: '',
};

const SelfAssessment = ({navigation}) => {
  const {t} = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [deleteId, setDeletedId] = useState('');
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('Are you sure?');
  const [subtitle, setSubtitle] = useState(
    'Do you really want to delete this item?',
  );
  const [isLoading, setIsLoading] = useState(false);
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
        update_Age();
      } else {
        addAge_handle();
      }
    }
  };

  const getData_handle = async () => {
    const url = API.GET_AGE;
    if (Platform.OS == 'android') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    try {
      const result = await getApi(url);
      // console.log({result});
      if (result?.status == 200) {
        setIsLoading(false);
        const data = result.data.reverse();
        // console.log({data});
        const tempdata = data.filter(i => i.ageId != 10);
        setData(tempdata);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const addAge_handle = async () => {
    const url = API.ADD_AGE;
    const params = {
      ageId: null,
      ageGroup: inputs?.title,
      isActive: true,
    };

    try {
      const result = await postApi(url, params);
      // console.log({result});
      if (result?.status == 201) {
        setIsLoading(false);
        const data = result.data;
        // console.log({data})
        Toast.show(data.message);
        setShowModal(false);
        getData_handle();
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const deleteAge_handle = async id => {
    const url = API.DELETE_Age + id;
    console.log({url});
    try {
      setIsLoading(true);
      const result = await deleteApi(url);
      console.log({result});
      if (result?.status == 200) {
        const data = result.data;
        // console.log({deletePamplate: data});
        getData_handle();
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

  const update_Age = async () => {
    const url = API.ADD_AGE;

    const params = {
      ageId: deleteId,
      ageGroup: inputs?.title,
      isActive: true,
    };
    // console.log({url, params});
    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      // console.log({result:result})
      if (result?.status == 201) {
        const data = result.data;
        setShowModal(false);
        setIsLoading(false);
        setInputs(INITIALINPUT);
        Toast.show(data.message);
        getData_handle();
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getData_handle();
  }, []);

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const showEditPopUp = async id => {
    const editdata = await editAlert();
    if (editdata == 'YES') {
      setShowModal(true);
      setEdit(true);
      var tempdata = data.find(i => i.ageId === id);
      console.log({tempdata});
      const myinput = {title: tempdata.ageGroup};
      setInputs(myinput);
    }
  };

  const onDeletePress = () => {
    deleteAge_handle(deleteId);
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
        onPress_api={() => deleteAge_handle(deleteId)}
      />
    );
  };

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={t('SelfAssessment')}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />
      <View style={st.pd20}>
        <View style={[st.row, st.justify_S]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllQues')}
            style={[st.mt_B, st.row, st.align_C]}>
            <Icon
              name={'circle-with-plus'}
              size={22}
              color={colors.lightFrozy}
            />
            <Text style={[st.tx18, {color: colors.lightFrozy}]}>
              {' All Questionnarie'}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              setShowModal(true);
              setEdit(false);
            }}>
            <Icon
              name={'circle-with-plus'}
              size={25}
              color={colors.lightFrozy}
            />
          </TouchableOpacity> */}
        </View>
        {data.map((i, n) => {
          return (
            <View style={styles.boxsty}>
              <View style={st.wdh80}>
                <Text style={[st.tx16, {color: colors.black}]}>
                  {i.name}
                </Text>
              </View>
              <View style={st.wdh20}>
                <View
                  style={st.align_E}
                  // style={[st.row, st.justify_S]}
                >
                  {/* <PostMenu
                    showEditPopUp={() => {
                      showEditPopUp(i.ageId);
                      setDeletedId(i.ageId);
                    }}
                    onPressDelPopUp={() => {
                      setPopupMessageVisibility(true);
                      setDeletedId(i.ageId);
                    }}
                    onPressDelete={() =>
                      deleteAlert(title, subtitle, deleteAge_handle(i.ageId))
                    }
                  /> */}
                  {i?.ageId != 2 && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Feeling')}>
                      <Icon
                        name={'chevron-thin-right'}
                        size={20}
                        color={colors.black}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <Alert
        showModal={showModal}
        setShowModal={setShowModal}
        onClosePress={() => {
          setInputs(INITIALINPUT);
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
              value={inputs?.title}
            />
          </View>

          <Button
            title={t('SUBMIT')}
            onPress={() => {
              // setShowModal(false);
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

const PostMenu = ({showEditPopUp, onPressDelPopUp, onPressDelete}) => {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  return (
    <Menu
      visible={visible}
      anchor={
        <TouchableOpacity onPress={showMenu}>
          <Icon name={'dots-three-vertical'} size={20} color={colors.black} />
        </TouchableOpacity>
      }
      onRequestClose={hideMenu}>
      <MenuItem
        onPress={() => {
          hideMenu();
          showEditPopUp();
        }}
        textStyle={[st.tx14, {color: colors.black}]}>
        Edit
      </MenuItem>
      <MenuDivider color={colors.lightText} />
      <MenuItem
        onPress={() => {
          hideMenu();
          if (Platform.OS == 'android') {
            // setPopupMessageVisibility(true);
            onPressDelPopUp();
          } else {
            // deleteAlert(title, subtitle, onDeletePress);
            onPressDelete();
          }
        }}
        textStyle={[st.tx14, {color: colors.black}]}>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default SelfAssessment;

const styles = StyleSheet.create({
  boxsty: {
    borderWidth: 0.7,
    borderColor: colors.lightText,
    borderRadius: 7,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
