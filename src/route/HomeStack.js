import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/dashboard/home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notification from '../screens/dashboard/notification';
import SelfProfile from '../screens/dashboard/profile';
import CustomSidebarMenu from './CustomSidebarMenu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import SelfAssessment from '../screens/dashboard/selfAssessment';
import SA_ChildAdult from '../screens/dashboard/selfAssessment/SA_ChildAdult';
import LinearGradient from 'react-native-linear-gradient';
import Main from '../screens/dashboard/home/Main';
import SA_GnrlHELTH from '../screens/dashboard/selfAssessment/SA_GnrlHELTH';
import Questions from '../screens/dashboard/selfAssessment/Questions';
import SA_lowScore from '../screens/dashboard/selfAssessment/SA_lowScore';
import SA_lowScore2 from '../screens/dashboard/selfAssessment/SA_lowScore2';
import SA_GnrlHELTH_adult from '../screens/dashboard/selfAssessment/SA_GnrlHlth_child';
import SA_suggestion from '../screens/dashboard/selfAssessment/SA_suggestion';
import SubfeelSugg from '../screens/dashboard/selfAssessment/SubfeelSugg';
import SuggestVdo from '../screens/dashboard/selfAssessment/SuggestVdo';
import ViewPdf from '../screens/dashboard/selfAssessment/ViewPdf';
import SA_Contact from '../screens/dashboard/selfAssessment/SA_Contact';
import Address from '../screens/dashboard/address';
import TeleManas from '../screens/dashboard/telemanas';
import {colors} from '../global/theme';
import EditProfile from '../screens/dashboard/editProfile';
import Tips from '../screens/dashboard/selfAssessment/Tips';
import AwarenessVdo from '../screens/dashboard/awearnessVdo';
import IEC from '../screens/dashboard/IEC';
import FaQ from '../screens/dashboard/faq';
import Feedback from '../screens/dashboard/feedback';
import MythFact from '../screens/dashboard/mythfact';
import AssistMansa from '../screens/dashboard/home/AssistMansa';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import TypeDesc from '../screens/dashboard/selfAssessment/TypeDesc';
import Subtype from '../screens/dashboard/selfAssessment/Subtype';
import FeelingsQues from '../screens/dashboard/feelingsQues';
import ListMore from '../screens/dashboard/ListMore';
import ChildHighScoreDes from '../screens/dashboard/selfAssessment/ChildHighScoreDes';
import ChildFurtherQues from '../screens/dashboard/selfAssessment/ChildFurtherQues';
import ViewVdo from '../screens/adminpanel/dashboard/video/ViewVdo';
import AskAssessment from '../screens/dashboard/selfAssessment/AskAssessment';
import Privacy from '../screens/dashboard/privacy';
import History from '../screens/dashboard/history';
import ChildFurtherMansa from '../screens/dashboard/selfAssessment/ChildFurtherMansa';
// import MapList from '../screens/dashboard/address/Hospital';
import MankakshTab from '../screens/dashboard/address/MankakshTab';
import ChildRegistration from '../screens/dashboard/selfAssessment/childRegistration';
import ChildHistory from '../screens/dashboard/childHistory';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const tour_data = useSelector(state => state.tour?.data);
  const profileData = useSelector(state => state.profile?.data);

  return (
    <Stack.Navigator>
      {!tour_data && (
        <Stack.Screen
          name="AssistMansa"
          component={AssistMansa}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="Main"
        component={tour_data ? Main : Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MythFact"
        component={MythFact}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SA_ChildAdult"
        component={SA_ChildAdult}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SA_GnrlHELTH"
        component={SA_GnrlHELTH}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SA_GnrlHELTH_adult"
        component={SA_GnrlHELTH_adult}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Questions"
        component={Questions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SA_suggestion"
        component={SA_suggestion}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ChildFurtherMansa"
        component={ChildFurtherMansa}
        options={{headerShown: false}}
      />

      {/*  */}
      <Stack.Screen
        name="SA_lowScore"
        component={SA_lowScore}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tips"
        component={Tips}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="TypeDesc"
        component={TypeDesc}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Subtype"
        component={Subtype}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FeelingsQues"
        component={FeelingsQues}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListMore"
        component={ListMore}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SA_lowScore2"
        component={SA_lowScore2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubfeelSugg"
        component={SubfeelSugg}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuggestVdo"
        component={SuggestVdo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewPdf"
        component={ViewPdf}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MankakshTab"
        component={MankakshTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SA_Contact"
        component={SA_Contact}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Video"
        component={AwarenessVdo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TeleManas"
        component={TeleManas}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Self-assessment"
        component={profileData ? SelfAssessment : SelfProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChildHighScoreDes"
        component={ChildHighScoreDes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChildFurtherQues"
        component={ChildFurtherQues}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewVdo"
        component={ViewVdo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AskAssessment"
        component={AskAssessment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChildRegistration"
        component={ChildRegistration}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const SelfAssessmentStack = () => {
  const profileData = useSelector(state => state.profile?.data);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Self-assessment"
        component={profileData ? SelfAssessment : SelfProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AwarenessVdoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Videos"
        component={AwarenessVdo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewVdo"
        component={ViewVdo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const IECStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IEC-Material"
        component={IEC}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewPdf"
        component={ViewPdf}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const DrawerStack = () => {
  const {t} = useTranslation();
  const profileData = useSelector(state => state.profile?.data);
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
        name="Dashboard"
        options={{
          drawerLabel: t('dashboard'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={['#15145E', '#7776B6']}
              style={styles.circle}>
              <Icon name="view-grid-outline" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={HomeStack}
      />
      <Drawer.Screen
        name="SelfAssessmentStack"
        options={{
          drawerLabel: t('SELF_ASSESS'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={['#15145E', '#7776B6']}
              style={styles.circle}>
              <Icon name="wallet-outline" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={SelfAssessmentStack}
      />
      {profileData && (
        <Drawer.Screen
          name="EditProfile"
          options={{
            drawerLabel: t('EditProfile'),
            headerShown: false,
            drawerIcon: ({color}) => (
              <LinearGradient
                colors={['#15145E', '#7776B6']}
                style={styles.circle}>
                <Icon name="account-outline" size={22} color={'#fff'} />
              </LinearGradient>
            ),
          }}
          component={EditProfile}
        />
      )}
      <Drawer.Screen
        name="Videos"
        options={{
          drawerLabel: t('AWARENESS'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={['#15145E', '#7776B6']}
              style={styles.circle}>
              <Icon name="video-outline" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={AwarenessVdoStack}
      />
      <Drawer.Screen
        name="IEC-Material"
        options={{
          drawerLabel: t('IEC-Material'),
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={['#15145E', '#7776B6']}
              style={styles.circle}>
              <Icon name="newspaper-variant-outline" size={20} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={IECStack}
      />

      {profileData && (
        <Drawer.Screen
          name="History"
          options={{
            drawerLabel: t('Assessment History'),
            headerShown: false,
            drawerIcon: ({color}) => (
              <LinearGradient
                colors={['#15145E', '#7776B6']}
                style={styles.circle}>
                <Icon name="help-circle-outline" size={22} color={'#fff'} />
              </LinearGradient>
            ),
          }}
          component={History}
        />
      )}

      {profileData && (
        <Drawer.Screen
          name="ChildHistory"
          options={{
            drawerLabel: t('ChildHistory'),
            headerShown: false,
            drawerIcon: ({color}) => (
              <LinearGradient
                colors={['#15145E', '#7776B6']}
                style={styles.circle}>
                <Icon name="history" size={22} color={'#fff'} />
              </LinearGradient>
            ),
          }}
          component={ChildHistory}
        />
      )}

      <Drawer.Screen
        name="Feedback"
        options={{
          drawerLabel: t('Feedback'),

          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={['#15145E', '#7776B6']}
              style={styles.circle}>
              <Icon name="thumb-up-outline" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={Feedback}
      />

      <Drawer.Screen
        name="Privacy"
        options={{
          drawerLabel: t('Privacy Policy'),

          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={['#15145E', '#7776B6']}
              style={styles.circle}>
              <Icon name="lock" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={Privacy}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
