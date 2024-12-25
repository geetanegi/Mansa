import {
  Alert,
  BackHandler,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';

var RNFS = require('react-native-fs');
const android = ReactNativeBlobUtil.android;

import XLSX from 'xlsx';

export const backAction = () => {
  Alert.alert('Hold on!', 'Are you sure you want to exit?', [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    {text: 'YES', onPress: () => BackHandler.exitApp()},
  ]);
  return true;
};

export const getPickerDocResp = res => {
  const respArr = res;
  const imgResp = Array.isArray(respArr) && respArr.length ? respArr[0] : null;

  if (imgResp) {
    return {
      uri: imgResp?.uri,
      name: imgResp?.name,
      type: imgResp?.type,
    };
  }

  return false;
};

export const selectDocument = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });

    return res;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // alert('Canceled from single doc picker');
    } else {
      // alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
};

export const historyDownload = async (title, url, t) => {
  if (Platform.OS === 'ios') {
    const data = downloadHistory(title, url);
    return data;
  } else {
    if (Platform.OS === 'android' && Platform.constants['Release'] >= 13) {
      // alert('No need take to permission For andrid 13');
      const data = downloadHistory(title, url);
      return data;
    } else {
      try {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            ttitle: t('Storage Permission'),
            message: t('Mannhitexternalstorage'),
            buttonNeutral: t('AskLater'),
            buttonNegative: t('Cancel'),
            buttonPositive: t('Yes'),
          },
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            const data = downloadHistory(title, url);
            return data;
          } else {
            Alert.alert(t('Alert'), t('Permissionpermission'), [
              {
                text: t('Cancel'),
                onPress: () => null,
                style: 'cancel',
              },
              {text: t('Yes')},
            ]);
          }
        });
      } catch (err) {
        //To handle permission related issue
      }
    }
  }
};

const downloadHistory = async (title, url) => {
  let date = new Date();
  const {dirs} = ReactNativeBlobUtil.fs;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: title,
      mime: 'application/pdf',
      appendExt: 'pdf',
      description: title,
      path: `${dirs.DownloadDir}/${title}-${Math.floor(
        date.getTime() + date.getSeconds() / 2,
      )}`,
    },
  };

  return ReactNativeBlobUtil.config(options)
    .fetch('GET', url)
    .then(res => {
      // android.actionViewIntent(res.path(), 'application/pdf')
      return res;
    })
    .catch(e => {
      alert('Error');
    });
};

export const reportPermission = async (data, reportName) => {
  if (Platform.OS === 'ios') {
    const res = exportDataToExcel(data, reportName);
    return res;
  } else {
    if (Platform.OS === 'android' && Platform.constants['Release'] >= 13) {
      // alert('No need take to permission For andrid 13');
      const res = exportDataToExcel(data, reportName);
      return res;
    } else {
      try {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'Mannhit needs access to your external storage ' +
              'so you can save your downloaded files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            const res = exportDataToExcel(data, reportName);
            return res;
          } else {
            //If permission denied then show alert 'Storage Permission
            alert('Permission not granted, Please take permission');
          }
        });
      } catch (err) {
        //To handle permission related issue
      }
    }
  }
};

const exportDataToExcel = (data, reportName) => {
  // Created Sample data
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Report');
  const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
  const currentDateTime = new Date().toLocaleString().replace(/[:/\\]/g, '-');
  // Write generated excel to Storage

  let path = null;

  if (Platform.OS == 'android') {
    path =
      RNFS.DownloadDirectoryPath +
      `/${reportName}_${currentDateTime}_Report_from_Mannhit.xlsx`;
  } else {
    path =
      RNFS.DocumentDirectoryPath +
      `/${reportName}_${currentDateTime}_Report_from_Mannhit.xlsx`;
  }
  console.log({path});
  return RNFS.writeFile(path, wbout, 'ascii')
    .then(res => {
      return true;
    })
    .catch(e => {
      console.log('Error', e);
    });
};

export const deleteAlert = (title, subtitle, onPressDelete) => {
  Alert.alert(title, subtitle, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => onPressDelete()},
  ]);
};

export const editAlert = async () =>
  new Promise(resolve => {
    Alert.alert('Are you sure?', 'Do you want to edit?', [
      {
        text: 'Cancel',
        onPress: () => {
          resolve('No');
        },
      },
      {
        text: 'Ok',
        onPress: () => {
          resolve('YES');
        },
      },
    ]);
  });

export const openDialScreen = async phone => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: 'Phone Call Permission',
        message: 'Your app needs permission to make phone calls.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let number = '';
      if (Platform.OS === 'ios') {
        number = `telprompt:${phone}`;
      } else {
        number = `tel:${phone}`;
      }
      Linking.canOpenURL(number)
        .then(supported => {
          if (!supported) {
            console.log({supported});
            Alert.alert('Device may not support opening dialpad');
          } else {
            return Linking.openURL(number);
          }
        })
        .catch(err => console.log(err));
    } else {
      Alert.alert('Phone call permission denied');
    }
  } catch (err) {
    Alert.alert(err);
  }
};

export const languageConversion = i18n => {
  const selectedLanguage = i18n.language;
  if (selectedLanguage == 'hi') {
    return 1;
  } else {
    return 2;
  }
};
