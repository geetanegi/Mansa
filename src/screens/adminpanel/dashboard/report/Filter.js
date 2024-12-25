import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../../../components/button';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../../../global/theme';
import Alert from '../../../../components/alert';
import {reportPermission} from '../../../../utils/helperfunctions/functions';
import RNPickerSelect from 'react-native-picker-select';

const Filter = ({navigation}) => {
  const {t} = useTranslation();
  const [from, setFrom] = useState(new Date());
  const [openFrom, setOpenFrom] = useState(false);
  const [selectedFrom, setSelectFrom] = useState('');
  const [to, setTo] = useState(new Date());
  const [openTo, setOpenTo] = useState(false);
  const [selectedTo, setSelectedTo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [admin, setAdmin] = useState('');
  const [feeling, setFeeling] = useState('');
  const [score, setScore] = useState('');
  const [feelingsData, setFeelingsData] = useState([]);

  const setDateFormet = (date, flag) => {
    const dob = date.toDateString();
    if (flag == '1') {
      setSelectFrom(dob);
    } else {
      setSelectedTo(dob);
    }
  };

  const getExcelFile = async () => {
    const data = sample_data_to_export;
    const result = await reportPermission(data);
    console.log({filterscreendata: result});
    if (result) {
      setShowModal(true);
    }
  };

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={t('Reports')}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />
      <View style={st.pd20}>
        <View style={st.mt_B}>
          <View style={st.row}>
            <View style={st.wdh50}>
              <Text style={[st.tx16, {color: colors.black}]}>From</Text>
              <View style={[st.row, styles.datePicsty]}>
                <Text
                  style={[
                    st.tx14,
                    st.mr_10,
                    st.align_C,
                    {color: colors.black},
                  ]}>
                  {selectedFrom ? selectedFrom : 'Select Date'}
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
                  // console.log({date});
                  setDateFormet(date, '1');
                }}
                onCancel={() => {
                  setOpenFrom(false);
                }}
              />
            </View>
            <View style={st.wdh50}>
              <Text style={[st.tx16, {color: colors.black}]}>To</Text>
              <View style={[st.row, styles.datePicsty]}>
                <Text
                  style={[
                    st.tx14,
                    st.mr_10,
                    st.align_C,
                    {color: colors.black},
                  ]}>
                  {selectedTo ? selectedTo : 'Select Date'}
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
              />
            </View>
          </View>
          <View style={st.align_C}>
            <Button
              title={t('SUBMIT')}
              backgroundColor={colors.lightFrozy}
              color={colors.white}
              onPress={() => alert('search')}
            />
          </View>

          <View style={[st.row, st.justify_S, st.mt_t10]}>
            <View style={st.row}>
              <Text style={[st.tx14, {color: colors.lightFrozy}]}>
                {'All Reports'}
              </Text>
            </View>

            <View style={st.row}>
              <TouchableOpacity
                style={[styles.circle, st.mr_10]}
                onPress={() =>
                  navigation.navigate('ViewExl', {data: sample_data_to_export})
                }>
                <Icon name="eye" size={16} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => getExcelFile()}>
                <Icon name="download" size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.picker_sty, st.mt_v]}>
          <RNPickerSelect
            placeholder={{
              label: 'Select Type',
              value: null,
            }}
            style={selectBoxStyle}
            onValueChange={value => {
              setAdmin(value);
              if (value == 1) {
                setFeelingsData(ageData);
              } else if (value == 2) {
                setFeelingsData(genderData);
              } else if (value == 3) {
                setFeelingsData(occData);
              }
            }}
            items={data}
            Icon={() => {
              return <Icon name="chevron-down" size={20} />;
            }}
            allowFontScaling={false}
          />
        </View>

        {admin && (
          <View style={[styles.picker_sty, st.mt_v]}>
            <RNPickerSelect
              textInputProps={{multiline: true}}
              pickerProps={{numberOfLines: 10}}
              placeholder={{
                label: 'Select Feelings',
                value: null,
              }}
              style={selectBoxStyle}
              onValueChange={value => setFeeling(value)}
              items={feelingsData}
              Icon={() => {
                return <Icon name="chevron-down" size={20} />;
              }}
              allowFontScaling={false}
            />
          </View>
        )}

        <Alert showModal={showModal} setShowModal={setShowModal}>
          <View style={[st.pd20, st.align_C]}>
            <Text style={[st.tx20, st.txAlignC, {color: colors.black}]}>
              Download Successfully
            </Text>
            <Button
              title={'Back'}
              onPress={() => {
                navigation.goBack();
                setShowModal(false);
              }}
              backgroundColor={colors.lightFrozy}
              color={colors.white}
            />
          </View>
        </Alert>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicsty: {
    backgroundColor: '#E6E6E6',
    padding: 5,
    width: 160,
  },
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

const data = [
  {label: 'Age', value: 1},
  {label: 'Gender', value: 2},
  {label: 'Occupation', value: 3},
];



const ageData = [
  {label: 'Age wise report for general questionnaire', value: 1},
  {
    label: 'Age wise report for number of people filled anxiety questionnaire',
    value: 2,
  },
  {
    label:
      'Age wise report for number of people filled depression questionnaire',
    value: 3,
  },
];

const occData = [
  {label: 'Occupation wise report for general questionnaire', value: 1},
  {
    label:
      'Occupation wise report for number of people filled anxiety questionnaire',
    value: 2,
  },
  {
    label:
      'Occupation wise report for number of people filled depression questionnaire',
    value: 3,
  },
];

const genderData = [
  {label: 'Gender wise report for general questionnaire', value: 1},
  {
    label:
      'Gender wise report for number of people filled anxiety questionnaire',
    value: 2,
  },
  {
    label:
      'Gender wise report for number of people filled depression questionnaire',
    value: 3,
  },
];

let sample_data_to_export = [
  {
    scoreRange: '0-5',
    severity: 'Normal',
    numberOfUsers: 18,
  },
  {
    scoreRange: '6-7',
    severity: 'Normal',
    numberOfUsers: 3,
  },
  {
    scoreRange: '8-12',
    severity: 'Normal',
    numberOfUsers: 9,
  },
];
