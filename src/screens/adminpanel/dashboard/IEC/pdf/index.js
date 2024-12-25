import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
  Platform, Image, ScrollView
} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../../../global/styles';
import EmptyItem from '../../../../../components/component-parts/emptyItem';
import {colors} from '../../../../../global/theme';
import IECItem from '../component/IEC_item';
import FloatingButton from '../../../../../components/floatingbtn';
import MyAlert from '../../../../../components/alert';
import Button from '../../../../../components/button';
import AdminInput from '../../../../../components/adminInput';
import {useTranslation} from 'react-i18next';
import {selectDocument} from '../../../../../utils/helperfunctions/functions';
import {getPickerDocResp} from '../../../../../utils/helperfunctions/functions';
import DeletePopUp from '../../../../../components/deletePopUp';
import {editAlert} from '../../../../../utils/helperfunctions/functions';
import {
  getApi,
  deleteApi,
  postApi,
  putApi,
  uploadApi,
} from '../../../../../utils/apicalls';
import {API} from '../../../../../utils/endpoints';
import {handleAPIErrorResponse} from '../../../../../utils/helperfunctions/validations';
import Loader from '../../../../../components/loader';
import Toast from 'react-native-simple-toast';
import {ValueEmpty} from '../../../../../utils/helperfunctions/validations';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import AdminStackHeader from '../../../../../components/adminStackHeader';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';

const INITIALINPUT = {
  title: '',
  desc: '',
};

const AdminPdf = ({navigation}) => {
  const {t} = useTranslation();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [singleFile, setSingleFile] = useState([]);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('Are you sure?');
  const [subtitle, setSubtitle] = useState(
    'Do you really want to delete this item?',
  );
  const [pamplateId, setPamplateId] = useState('');
  const [edit, setEdit] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [attachmentErr, setAttachmentErr] = useState('');
  const [thumbnail, setThumbnail] = useState();

  const [admin, setAdmin] = useState(1);
  const [data_age, setData_age] = useState([]);
  const [feeling, setFeeling] = useState('');
  const [feelingErr, setFeelingErr] = useState('');
  const [feelingList, setFeelingList] = useState([]);
  const [score, setScore] = useState('');
  const [scoreErr, setScoreErr] = useState('');
  const [scoreList, setScoreList] = useState('');

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validation = () => {
    Keyboard.dismiss();
    const emptyTitle = ValueEmpty(inputs?.title);
    const emptyDecs = ValueEmpty(inputs?.desc);
    const emptyFeel = ValueEmpty(feeling?.toString());
    const emptysubFeel = ValueEmpty(score?.toString());

    let isValid = true;

    if (emptyTitle) {
      handleError('*Required', 'title');
      isValid = false;
    } else {
      handleError('', 'title');
    }

    if (emptyFeel) {
      setFeelingErr('*Required');
      isValid = false;
    } else {
      setFeelingErr('');
    }

    if (emptysubFeel) {
      setScoreErr('*Required');
      isValid = false;
    } else {
      setScoreErr('');
    }

    if (emptyDecs) {
      handleError('*Required', 'desc');
      isValid = false;
    } else {
      handleError('', 'desc');
    }

    if (!attachment) {
      setAttachmentErr('*Required');
      isValid = false;
    } else {
      setAttachmentErr('');
    }

    if (isValid) {
      if (edit) {
        update_pamplate();
      } else {
        addPamplate();
      }
    }
  };

  const getPamplate_handle = async () => {
    const url = API.GET_MAGAZINES;
    console.log({url});
    try {
      if (Platform.OS == 'android') {
        // setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({getPamplate_handle: data});
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

  const getPamplateId = async id => {
    const url = API.GET_BROUCHER_BYID + id;
    console.log({url});
    try {
      setIsLoading(true);
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({title: data.title, desc: data.discription});
        const setData = {
          title: data?.title,
          desc: data?.discription,
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

  const deletePamplate = async id => {
    const url = API.DELETE_BROUCHER + id;
    console.log({url});
    try {
      setIsLoading(true);
      const result = await deleteApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({deletePamplate: data});
        getPamplate_handle();
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

  const addPamplate = async () => {
    const url = API.ADD_MAGAZINES;
    console.log({url});
    const formData = new FormData();
    formData.append('file', attachment);
    formData.append('description', inputs?.desc);
    formData.append('isActive', true);
    formData.append('thumbnail', '');
    formData.append('title', inputs?.title);
    formData.append('ageId', admin);
    formData.append('subfeelId', score);
   
    try {
      setIsLoading(true);
      const result = await uploadApi(url, formData);
      // console.log({result})
      if (result?.status == 200) {
        const data = result.data;
        console.log({addPamplate: data});
        setShowModal(false);
        setIsLoading(false);
        setInputs(INITIALINPUT);
        setAttachment(null)
        setThumbnail()
        // getPamplate_handle();
        Toast.show(data.message);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const update_pamplate = async () => {
    const url = API.UPDATE_BROUCHER + pamplateId;
    console.log({url});
    const params = {
      discription: inputs?.desc,
      url: 'https://example.com/sample-pamplet.pdf',
      isActive: true,
      thumbnail:
        'https://cdn.pixabay.com/photo/2021/08/21/12/41/fear-6562668_640.png',
      title: inputs?.title,
    };
    try {
      setIsLoading(true);
      const result = await putApi(url, params);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({addPamplate: data});
        setShowModal(false);
        setIsLoading(false);
        setInputs(INITIALINPUT);
        Toast.show(data.message);
        getPamplate_handle();
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getFeelings_handle = async () => {
    const url = API.GET_FEELINGS + '10';
    // console.log({url});
    try {
      if (Platform.OS == 'android') {
        // setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({data});
        let tempdata = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            label: data[i].feelingType,
            value: data[i].feelingId,
          };
          tempdata.push(obj);
        }
        console.log({tempdata});
        setFeelingList(tempdata);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getSubFeelings_handle = async value => {
    const url = API.GET_SUB_FEEL + value;
    console.log({url, value});
    try {
      if (Platform.OS == 'android') {
        // setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log('subfeelings data', data);
        let tempdata = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            label: data[i].subFeelType,
            value: data[i].subFeelingId,
          };
          tempdata.push(obj);
        }
        console.log({subfeeldata: tempdata});

        setScoreList(tempdata);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getRole_handle = async () => {
    const url = API.GET_AGE;
    console.log({url});
    try {
      if (Platform.OS == 'android') {
        // setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      console.log({GET_Role: result.data});

      if (result?.status == 200) {
        const data = result.data;
        const tempdata = [];
        for (let i = 0; data.length > i; i++) {
          let obj = {
            label: data[i].name,
            value: data[i].ageId,
          };
          tempdata.push(obj);
        }
        console.log({tempdata});
        setData(tempdata);
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
    getPamplate_handle();
    getRole_handle();
    getSubFeelings_handle();
    getFeelings_handle();
  }, []);

  const showEditPopUp = async id => {
    const data = await editAlert();
    if (data == 'YES') {
      getPamplateId(id);
      setEdit(true);
      setShowModal(true);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <IECItem
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
        onDeletePress={() => deletePamplate(item?.id)}
        onViewPress={() => {
          navigation.navigate('ViewPdf', {url: item.url});
        }}
      />
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={st.mt_B}>
        <Text style={[st.tx16, {color: colors.black}]}>{'Pdf'}</Text>
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
    setAttachment(docRes);
    setAttachmentErr('');
    const filePath = docRes.uri;
    const page = 0;

    const {uri, width, height} = await PdfThumbnail.generate(filePath, page);

    // console.log({uri, width, height});
    setThumbnail(uri);
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
        onPress_api={() => deletePamplate(pamplateId)}
      />
    );
  };

  return (
    <View style={st.flex}>
       <AdminStackHeader
        title={t('IEC-Material')}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />
      <FlatList
        contentContainerStyle={st.pd20}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        // ListHeaderComponent={ListHeaderComponent}
      />

      <MyAlert showModal={showModal} setShowModal={setShowModal}>
        <ScrollView>
        <View style={st.pd20}>
          <View>
            <AdminInput
              placeholder={'Enter Title'}
              onChangeText={text => handleOnchange(text, 'title')}
              onFocus={() => handleError(null, 'title')}
              error={errors?.title}
              label={'Title'}
              labelColor={colors.lightText}
              value={inputs?.title}
            />
          </View>

          <View>
            <AdminInput
              placeholder={'Enter Description'}
              onChangeText={text => handleOnchange(text, 'desc')}
              onFocus={() => handleError(null, 'desc')}
              error={errors?.desc}
              label={'Description'}
              labelColor={colors.lightText}
              value={inputs?.desc}
            />
          </View>

          <View style={st.mt_v}>
            <Text style={[st.tx16, {color: colors.black}]}>Age Group</Text>
            <View style={[styles.picker_sty, st.mt_t10]}>
              <RNPickerSelect
                placeholder={{
                  label: 'Select',
                  value: null,
                }}
                style={selectBoxStyle}
                onValueChange={value => setAdmin(value)}
                items={data_age}
                Icon={() => {
                  return <Icon name="chevron-down" size={20} />;
                }}
                value={admin}
                disabled
                allowFontScaling={false}
              />
            </View>
          </View>

          <View style={st.mt_t10}>
            <Text style={[st.tx16, {color: colors.black}]}>Sub Type</Text>
            <View style={[styles.picker_sty, st.mt_t10]}>
              <RNPickerSelect
                placeholder={{
                  label: 'Select sub type',
                  value: null,
                }}
                style={selectBoxStyle}
                onValueChange={value => {
                  setFeeling(value);
                  console.log({feeling});
                  setFeelingErr('');
                  if (value) getSubFeelings_handle(value);
                }}
                items={feelingList}
                Icon={() => {
                  return <Icon name="chevron-down" size={20} />;
                }}
                value={feeling}
                allowFontScaling={false}
              />
            </View>
            <Text style={[st.error,{marginLeft:0}]}>{feelingErr}</Text>
          </View>

          <View >
            {feeling && (
              <View>
                <Text style={[st.tx16, {color: colors.black}]}>Behavior</Text>
                <View style={[styles.picker_sty, st.mt_v]}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Select behavior',
                      value: null,
                    }}
                    style={selectBoxStyle}
                    onValueChange={value => {
                      console.log({score});
                      setScore(value);
                      setScoreErr();
                    }}
                    items={scoreList}
                    Icon={() => {
                      return <Icon name="chevron-down" size={20} />;
                    }}
                    value={score}
                    allowFontScaling={false}
                  />
                </View>
                <Text style={st.error}>{scoreErr}</Text>
              </View>
            )}
          </View>

          <View>
            <Text style={[st.tx16, {color: colors.lightText}]}>{'Upload'}</Text>
            <TouchableOpacity
              onPress={() => {
                onSelectDocHandle();
              }}
              style={{
                padding: 15,
                borderRadius: 7,
                borderWidth: 0.4,
                borderColor: colors.lightText,
                marginTop:10
              }}>
              <Text style={[st.tx14, {color: colors.lightText}]}>
              {thumbnail ? 'Change pdf' : 'Pick pdf'}
              </Text>
            </TouchableOpacity>
            <Text style={st.error}>{attachmentErr}</Text>
          </View>

          {thumbnail && (
            <Image source={{uri: thumbnail}} style={st.thumbnailSty} />
          )}

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
        </ScrollView>
      </MyAlert>

      {show_alert_msg()}
      <FloatingButton
        onPress={() => {
          setShowModal(true);
          setEdit(false);
          setPamplateId('');
        }}
      />
      {isLoading && <Loader />}
    </View>
  );
};

export default AdminPdf;

const styles = StyleSheet.create({
  picker_sty: {
    borderWidth: 1.5,
    borderColor: '#D0DBEA',
    borderRadius: 7,
  },
});

const selectBoxStyle = {
  inputIOS: {
    height: 45,
    paddingHorizontal: 10, // to ensure the text is never behind the icon
    fontSize: 14,
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
  placeholder: {
    color: 'lightgray',
    fontSize: 14,
  },
  inputAndroid: {
    height: 45,
    paddingHorizontal: 10, // to ensure the text is never behind the icon
    fontSize: 14,
  },
};
