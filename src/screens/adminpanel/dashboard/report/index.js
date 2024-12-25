import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../../global/theme';
import EmptyItem from '../../../../components/component-parts/emptyItem';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../../../components/button';
import DatePicker from 'react-native-date-picker';
import Alert from '../../../../components/alert';
import {reportPermission} from '../../../../utils/helperfunctions/functions';
import {API} from '../../../../utils/endpoints';
import {getApi, postApi} from '../../../../utils/apicalls';
import {
  handleAPIErrorResponse,
  reportDateFormet,
} from '../../../../utils/helperfunctions/validations';
import Loader from '../../../../components/loader';

const Report = ({navigation}) => {
  const {t} = useTranslation();
  const [data, setData] = useState(list);
  const [from, setFrom] = useState(new Date());
  const [openFrom, setOpenFrom] = useState(false);
  const [selectedFrom, setSelectFrom] = useState('');
  const [to, setTo] = useState(new Date());
  const [openTo, setOpenTo] = useState(false);
  const [selectedTo, setSelectedTo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [passedData, setPassedData] = useState({});
  const [selectedId, setSelectedId] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [saveSubFeelId, setSaveSubFeelId] = useState();
  const [filterList, setFilterList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allSubfeel, setAllSubfeel] = useState([]);
  const [excel, setExcel] = useState([]);

  const setDateFormet = (date, flag) => {
    let dob = reportDateFormet(date);

    if (flag == '1') {
      setSelectFrom(dob);
    } else {
      setSelectedTo(dob);
    }
  };

  const getExcelFile = async reportName => {
    const data = excel;
    const result = await reportPermission(data, reportName);
    console.log({reportscreendata: result});
    if (result) {
      setShowModal(true);
    }
  };

  const validation = (mode, id, reportName, clearSelectedId) => {
    if (selectedFrom) {
      if (selectedTo) {
        if (id == 1) {
          getAgeReportHandle(mode, reportName, clearSelectedId);
        }
        if (id == 2) {
          getGenderReportHandle(mode, reportName, clearSelectedId);
        }
        if (id == 3) {
          getOccupationReport(mode, reportName, clearSelectedId);
        }
        if (id == 5) {
          getLocationReport(mode, reportName);
        }

        if (id == 6) {
          getFeedbackReport(mode, reportName);
        }
        if (id == 9) {
          getScoreAdultReport(mode, reportName);
        }
        if (id == 10) {
          getLoginReport(mode, reportName);
        }
        if (id == 11) {
          getChildReport(mode, reportName);
        }

        // if (id == 4) {
        //   getAdultGenralReport(mode, reportName);
        // }

        if (id == 8) {
          getChildFurthrReport(mode, reportName);
        }
      } else {
        alert('please select to date');
      }
    } else {
      alert('please select from date');
    }
  };

  const filter_validation = () => {
    if (passedData.id == 1) {
      setShowModalFilter(false);
      getAgeReportHandle();
      setActiveFilter(true);
    }

    if (passedData.id == 2) {
      setShowModalFilter(false);
      getGenderReportHandle();
      setActiveFilter(true);
    }

    if (passedData.id == 3) {
      setShowModalFilter(false);
      getOccupationReport();
      setActiveFilter(true);
    }
  };

  const getAgeReportHandle = async (mode, reportName, clearSelectedId) => {
    const url = `${API.GET_AGE_REPORT}`;
    const params = {
      fromDate: selectedFrom,
      subFeelId: clearSelectedId ? clearSelectedId : selectedId,
      toDate: selectedTo,
    };
    // console.log({url, params});
    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      console.log({result});
      if (result?.status == 200) {
        const data = result?.data;
        console.log({data});

        setExcel(data);
        if (mode) {
          getExcelFile(reportName);
        } else {
          navigation.navigate('ViewExl', {
            data: data,
            report: 'age',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getGenderReportHandle = async (mode, reportName, clearSelectedId) => {
    const url = `${API.GET_Gender_REPORT}`;
    console.log({url});
    const params = {
      fromDate: selectedFrom,
      subFeelId: clearSelectedId ? clearSelectedId : selectedId,
      toDate: selectedTo,
    };
    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      console.log({result});
      if (result?.status == 200) {
        const data = result?.data;
        console.log({data});

        setExcel(data);
        if (mode) {
          getExcelFile(reportName);
        } else {
          navigation.navigate('ViewExl', {
            data: data,
            report: 'gender',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getOccupationReport = async (mode, reportName, clearSelectedId) => {
    const url = `${API.GET_OCCUPATION_REPORT}`;
    console.log({url});
    const params = {
      fromDate: selectedFrom,
      subFeelId: clearSelectedId ? clearSelectedId : selectedId,
      toDate: selectedTo,
    };
    try {
      setIsLoading(true);

      const result = await postApi(url, params);
      console.log({result});
      if (result?.status == 200) {
        const data = result?.data;
        console.log({data});

        setExcel(data);
        if (mode) {
          getExcelFile(reportName);
        } else {
          navigation.navigate('ViewExl', {
            data: data,
            report: 'occupation',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getScoreAdultReport = async (mode, reportName) => {
    const url = `${API.SCORE_ADULT_REPORT}/${selectedFrom}/${selectedTo}`;
    console.log({url});
    try {
      setIsLoading(true);

      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
        console.log({data});

        setExcel(data);
        if (mode) {
          getExcelFile(reportName);
        } else {
          navigation.navigate('ViewExl', {
            data: data,
            report: 'Score Adult',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getLocationReport = async (mode, reportName) => {
    const url = `${API.GEOLOCATION_REPORT}/${selectedFrom}/${selectedTo}`;
    console.log({url});
    try {
      setIsLoading(true);

      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
        console.log({data});

        setExcel(data);
        if (mode) {
          getExcelFile(reportName);
        } else {
          navigation.navigate('ViewExl', {
            data: data,
            report: 'geolocation',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getFeedbackReport = async (mode, reportName) => {
    const url = `${API.FEEDBACK_REPORT}/${selectedFrom}/${selectedTo}`;
    console.log({url});
    try {
      setIsLoading(true);

      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
        console.log({data});

        setExcel(data);
        if (mode) {
          getExcelFile(reportName);
        } else {
          navigation.navigate('ViewExl', {
            data: data,
            report: 'feedback & Suggestion',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getLoginReport = async (mode, reportName) => {
    const url = `${API.LOGIN_REPORT}/${selectedFrom}/${selectedTo}`;
    console.log({url});
    try {
      setIsLoading(true);

      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
        console.log({data});

        setExcel(data);
        if (mode) {
          getExcelFile(reportName);
        } else {
          navigation.navigate('ViewExl', {
            data: data,
            report: 'Login Count',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getChildReport = async (mode, reportName) => {
    const url = `${API.CHILD_REPORT}/${selectedFrom}/${selectedTo}`;
    console.log({url});
    try {
      setIsLoading(true);

      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
        console.log({data});

        setExcel(data);
        if (mode) {
          getExcelFile(reportName);
        } else {
          navigation.navigate('ViewExl', {
            data: data,
            report: 'Child Report',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getAdultGenralReport = async (mode, reportName) => {
    const url = `${API.ADULT_GENE_REPORT}/${selectedFrom}/${selectedTo}`;
    console.log({url});
    try {
      setIsLoading(true);

      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
        console.log({data});

        setExcel(data);
        if (mode) {
          getExcelFile(reportName);
        } else {
          navigation.navigate('ViewExl', {
            data: data,
            report: 'Adult General Question',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getChildFurthrReport = async (mode, reportName) => {
    const url = `${API.CHILD_FURTHR_REPORT}/${selectedFrom}/${selectedTo}`;
    console.log({url});
    try {
      setIsLoading(true);

      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
        console.log({data});

        setExcel(data);
        if (mode) {
          getExcelFile(reportName);
        } else {
          navigation.navigate('ViewExl', {
            data: data,
            report: 'Child Further Question',
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  const getAllSubfeelingHandle = async () => {
    const url = API.ALL_SUBFEEL;
    // console.log({url});
    try {
      setIsLoading(true);

      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
        // console.log({data: data.length});
        setAllSubfeel(data);
        setIsLoading(false);
        const tempfilter = [];
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i].subFeelType, data[i].subFeelingId);
          const obj = {
            label:
              'wise report for number of people filled ' +
              data[i].subFeelType +
              ' questionnaire',
            subFeelingId: data[i].subFeelingId,
            status: false,
            value: i + 1,
          };

          tempfilter.push(obj);
        }

        // console.log({tempfilter});

        setFilterList(tempfilter);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  // Function to handle checkbox toggle
  const toggleCheckbox = id => {
    let updatedItems = [...selectedId];
    if (updatedItems.includes(id)) {
      updatedItems = updatedItems.filter(item => item !== id);
    } else {
      updatedItems.push(id);
    }
    console.log({updatedItems});
    setSelectedId(updatedItems);
  };

  useEffect(() => {
    getAllSubfeelingHandle();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View>
        <View
          style={[
            st.row,
            st.pd_H20,
            {
              backgroundColor: index % 2 == 0 ? null : colors.frozy,
              paddingVertical: 10,
            },
          ]}>
          <View style={st.wdh70}>
            <Text style={[st.tx14, st.txCap, {color: colors.black}]}>
              {item.name}
            </Text>
          </View>
          <View style={st.wdh30}>
            <View style={st.row}>
              {item.id < 4 ? (
                <TouchableOpacity
                  style={[styles.circle, st.mr_10]}
                  onPress={() => {
                    if (selectedFrom) {
                      if (selectedTo) {
                        setShowModalFilter(true);
                        if (passedData?.id != item?.id) {
                          setPassedData(item);
                          setSelectedId([]);
                        }
                      } else {
                        alert('please select to date');
                      }
                    } else {
                      alert('please select from date');
                    }
                  }}>
                  <Icon name="filter" size={16} color={colors.white} />
                </TouchableOpacity>
              ) : (
                <View style={[styles.circlewhite, st.mr_10]} />
              )}
              <TouchableOpacity
                style={[styles.circle, st.mr_10]}
                onPress={() => {
                  console.log({passedData: passedData.id, id: item.id});
                  if (passedData?.id != item?.id) {
                    setSelectedId([]);
                    setPassedData(item);
                    console.log('clear selected data', selectedId);
                    validation(false, item.id, item.name, []);
                  } else {
                    validation(false, item.id, item.name);
                  }
                }}>
                <Icon name="eye" size={16} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => {
                  if (passedData?.id != item?.id) {
                    setSelectedId([]);
                  }
                  validation(true, item.id, item.name);
                }}>
                <Icon name="download" size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return <EmptyItem />;
  };

  const ListHeaderComponent = () => {
    return (
      <View style={st.mt_B}>
        <View style={st.row}>
          <View style={st.wdh50}>
            <Text style={[st.tx16, {color: colors.black}]}>From</Text>
            <View style={[st.row, styles.datePicsty]}>
              <Text
                style={[st.tx14, st.mr_10, st.align_C, {color: colors.black}]}>
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
                console.log({date});
                setDateFormet(date, '1');
              }}
              onCancel={() => {
                setOpenFrom(false);
              }}
              maximumDate={new Date()}
            />
          </View>
          <View style={st.wdh50}>
            <Text style={[st.tx16, {color: colors.black}]}>To</Text>
            <View style={[st.row, styles.datePicsty]}>
              <Text
                style={[st.tx14, st.mr_10, st.align_C, {color: colors.black}]}>
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
              maximumDate={new Date()}
            />
          </View>
        </View>
        <View style={st.align_C}></View>

        <View style={[st.row, st.justify_S, st.mt_t10]}>
          <View style={st.row}>
            <Text style={[st.tx14, {color: colors.lightFrozy}]}>
              {'All Reports'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const checkedStatus = (n, status) => {
    const data = [...filterList];
    data[n].status = !status;
    setFilterList(data);
  };

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={t('Reports')}
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

      <Alert
        height={'80%'}
        showModal={showModalFilter}
        setShowModal={setShowModalFilter}
        onClosePress={() => {
          const arr = filterList.map(obj => {
            return {...obj, status: false};
          });
          setFilterList(arr);
        }}>
        <ScrollView>
          <View style={[st.pd20]}>
            {filterList?.map((i, n) => {
              return (
                <View style={[st.mt_B, st.row, st.justify_C]}>
                  <View style={st.wdh10}>
                    <Icon
                      name={
                        selectedId?.includes(i.subFeelingId)
                          ? 'check-square'
                          : 'square'
                      }
                      size={24}
                      color={
                        selectedId?.includes(i.subFeelingId)
                          ? colors.lightFrozy
                          : colors.black
                      }
                      onPress={() => toggleCheckbox(i.subFeelingId)}
                    />
                  </View>
                  <View style={st.wdh90}>
                    <Text
                      style={[
                        st.tx14,
                        {
                          color:
                            selectedId === n ? colors.lightFrozy : colors.black,
                        },
                      ]}>
                      {passedData.name} {i.label}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={[st.justify_S, st.row, st.mt_B, st.mh_10]}>
          <Button
            title={'Save'}
            backgroundColor={colors.lightFrozy}
            color={colors.white}
            onPress={() => {
              filter_validation();
            }}
          />
          <Button
            title={'clear'}
            backgroundColor={colors.lightFrozy}
            color={colors.white}
            onPress={() => {
              setSelectedId([]);
            }}
          />
        </View>
      </Alert>

      {isLoading && <Loader />}
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlewhite: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicsty: {
    backgroundColor: '#E6E6E6',
    padding: 5,
    width: 160,
  },
});

const list = [
  {name: 'age', id: 1},
  {name: 'gender', id: 2},
  {name: 'occupation', id: 3},

  {name: 'geolocation', id: 5},
  {name: 'feedback & Suggestion', id: 6},

  {name: 'Score Adult', id: 9},
  {name: 'Login Count', id: 10},
  {name: 'Child', id: 11},
  // {name: 'Adult General Question', id: 4},
  {name: 'Child Further Question', id: 8},
];
