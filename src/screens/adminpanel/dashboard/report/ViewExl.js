import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import {Table, Row, Rows} from 'react-native-table-component';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../../global/theme';
import EmptyItem from '../../../../components/component-parts/emptyItem';

const ViewExl = ({navigation, route}) => {
  const {t} = useTranslation();
  const [fileData, setFileData] = React.useState();
  const [tableHead, setTableHead] = React.useState();

  const data = route?.params?.data;
  const reportLabel = route?.params?.report;

  React.useEffect(() => {
    const report = data;
    let tempdata = [];

    for (let i = 0; i < report.length; i++) {
      const keys = Object.keys(report[i]);
      const values = Object.values(report[i]);
      // setTableHead(keys);
      tempdata.push(values);
    }
    setFileData(tempdata);
    //----------------------------
    if (reportLabel == 'age') {
      setTableHead(['Age Range', 'Number Of Users']);
    }
    if (reportLabel == 'occupation') {
      setTableHead(['Occupation', 'Number Of Users']);
    }
    if (reportLabel == 'gender') {
      setTableHead(['Gender', 'Number Of Users']);
    }
    if (reportLabel == 'Score Adult') {
      setTableHead(['Severeity', 'Score', 'Number Of Users']);
    }
    if (reportLabel == 'feedback & Suggestion') {
      setTableHead(['Name', 'Email', 'Suggestion', 'Rating']);
    }
    if (reportLabel == 'geolocation') {
      setTableHead(['City', 'Locality', 'SubAdmin Area', 'UserId']);
    }
    if (reportLabel == 'Login Count') {
      setTableHead(['Date', 'Count']);
    }

    if (reportLabel == 'Child Report') {
      setTableHead(['Severity', 'Score', 'Count']);
    }

    if (reportLabel == 'Adult General Question') {
      setTableHead(['UserId', 'Count', 'Date']);
    }

    if (reportLabel == 'Child Further Question') {
      setTableHead(['Severity', 'Score', 'Count']);
    }
  }, []);

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={t(`${reportLabel} Reports`)}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />
      <ScrollView>
        <View style={st.pd20}>
          {fileData?.length > 0 ? (
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={[st.tx14, st.txAlignC, {color: colors.black}]}
              />

              <Rows
                data={fileData}
                textStyle={[st.tx14, st.txAlignC, {color: colors.lightText}]}
              />
            </Table>
          ) : (
            <EmptyItem txColor={'#000'} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewExl;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
