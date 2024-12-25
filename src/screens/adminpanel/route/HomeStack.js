import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AdminHome from '../dashboard/home';
import {colors} from '../../../global/theme';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomSidebarMenu from './CustonSidebarMenu';
import {View} from 'react-native';
import Report from '../dashboard/report';
import {useTranslation} from 'react-i18next';
import Video from '../dashboard/video';
import IEC from '../dashboard/IEC';
import SelfAssessment from '../dashboard/selfAssessment';
import Guideline from '../dashboard/guideline';
import Addhost from '../dashboard/cohost';
import EditProfile from '../dashboard/editProfile';
import ChangePassword from '../dashboard/changePassword';
import Tips from '../dashboard/tips';
import AddVdo from '../dashboard/video/AddVdo';
import ViewVdo from '../dashboard/video/ViewVdo';
import Filter from '../dashboard/report/Filter';
import AllQues from '../dashboard/selfAssessment/AllQues';
import Feeling from '../dashboard/selfAssessment/Feeling';
import Ques from '../dashboard/selfAssessment/Ques';
import ViewExl from '../dashboard/report/ViewExl';
import SubTypeFeeling from '../dashboard/selfAssessment/SubType';
import ViewPdf from '../../dashboard/selfAssessment/ViewPdf';
import EditQues from '../dashboard/selfAssessment/EditQues';
import AdminPdf from '../dashboard/IEC/pdf';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AdminHomeStack = ({}) => {
  return (
    <Stack.Navigator initialRouteName="AdminHome">
      <Stack.Screen
        name="AdminHome"
        component={AdminHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tips"
        component={Tips}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ReportStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Report"
        component={Report}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewExl"
        component={ViewExl}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const VideoStack = ({}) => {
  return (
    <Stack.Navigator initialRouteName={'Video'}>
      <Stack.Screen
        name="Video"
        component={Video}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddVdo"
        component={AddVdo}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ViewVdo"
        component={ViewVdo}
        options={{headerShown: false}}
      />
      {/* ViewVdo */}
    </Stack.Navigator>
  );
};

const IECStack = ({}) => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="IEC" component={IEC} options={{headerShown: false}} /> */}
      <Stack.Screen
        name="IEC"
        component={AdminPdf}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewPdf"
        component={ViewPdf}
        options={{headerShown: false}}
      />
      {/* AdminPdf */}
    </Stack.Navigator>
  );
};

const SelfAssessmentStack = ({}) => {
  return (
    <Stack.Navigator initialRouteName="SelfAssessment">
      <Stack.Screen
        name="SelfAssessment"
        component={SelfAssessment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllQues"
        component={AllQues}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Feeling"
        component={Feeling}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Ques"
        component={Ques}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubTypeFeeling"
        component={SubTypeFeeling}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditQues"
        component={EditQues}
        options={{headerShown: false}}
      />
      {/* EdiQues */}
    </Stack.Navigator>
  );
};

const GuidelineStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Guideline"
        component={Guideline}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AddhostStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Addhost"
        component={Addhost}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const EditProfileStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ChangePasswordStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const DrawerStack = ({}) => {
  const {t} = useTranslation();
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.blue,
        drawerInactiveTintColor: '#333',
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="AdminHomeStack"
        options={{
          drawerLabel: t('dashboard'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <View style={styles.circle}>
              <Icon name="play" size={12} color={'#fff'} />
            </View>
          ),
        }}
        component={AdminHomeStack}
      />

      <Drawer.Screen
        name="ReportStack"
        options={{
          drawerLabel: t('Reportsandstatistics'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <View style={styles.circle}>
              <Icon name="play" size={12} color={'#fff'} />
            </View>
          ),
        }}
        component={ReportStack}
      />

      <Drawer.Screen
        name="VideoStack"
        options={{
          drawerLabel: t('AWARENESS'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <View style={styles.circle}>
              <Icon name="play" size={12} color={'#fff'} />
            </View>
          ),
        }}
        component={VideoStack}
      />

      <Drawer.Screen
        name="IECStack"
        options={{
          drawerLabel: t('IEC-Material'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <View style={styles.circle}>
              <Icon name="play" size={12} color={'#fff'} />
            </View>
          ),
        }}
        component={IECStack}
      />

      <Drawer.Screen
        name="SelfAssessmentStack"
        options={{
          drawerLabel: t('Self-asses_Ques_dra'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <View style={styles.circle}>
              <Icon name="play" size={12} color={'#fff'} />
            </View>
          ),
        }}
        component={SelfAssessmentStack}
      />

      {/* <Drawer.Screen
        name="GuidelineStack"
        options={{
          drawerLabel: t('New_Guide'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <View style={styles.circle}>
              <Icon name="play" size={12} color={'#fff'} />
            </View>
          ),
        }}
        component={GuidelineStack}
      /> */}

      <Drawer.Screen
        name="AddhostStack"
        options={{
          drawerLabel: t('Addhost'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <View style={styles.circle}>
              <Icon name="play" size={12} color={'#fff'} />
            </View>
          ),
        }}
        component={AddhostStack}
      />

      <Drawer.Screen
        name="EditProfileStack"
        options={{
          drawerLabel: t('EditProfile'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <View style={styles.circle}>
              <Icon name="play" size={12} color={'#fff'} />
            </View>
          ),
        }}
        component={EditProfileStack}
      />

      <Drawer.Screen
        name="ChangePasswordStack"
        options={{
          drawerLabel: t('ChangePassword'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <View style={styles.circle}>
              <Icon name="play" size={12} color={'#fff'} />
            </View>
          ),
        }}
        component={ChangePasswordStack}
      />
    </Drawer.Navigator>
  );
};
export default DrawerStack;

const styles = StyleSheet.create({
  circle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: colors.lightFrozy,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
