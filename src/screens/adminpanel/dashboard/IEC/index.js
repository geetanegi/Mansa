import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AdminPdf from './pdf';
import Pamplates from './pamplates';
import Brochuer from './brochuer';
import {colors} from '../../../../global/theme';

const AdminIEC = ({navigation}) => {
  const {t} = useTranslation();

  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={st.flex}>
      <AdminStackHeader
        title={t('IEC')}
        goBack={() => navigation.goBack()}
        gotoHome={() => navigation.navigate('AdminHomeStack')}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#F8F8F8',
          tabBarStyle: {
            backgroundColor: colors.frozy,
          },
          tabBarLabelStyle: [
            st.tx14,
            {
              color: colors.black,
              textTransform: 'capitalize',
              letterSpacing: 1,
            },
          ],
          tabBarIndicatorStyle: {
            borderBottomColor: colors.black,
            borderBottomWidth: 2,
          },
        }}>
        <Tab.Screen
          name="AdminPdf"
          component={AdminPdf}
          options={{
            tabBarLabel: 'Pdf',
          }}
        />
        <Tab.Screen
          name="Pamplates"
          component={Pamplates}
          options={{
            tabBarLabel: 'Pamphlet',
          }}
        />

        <Tab.Screen
          name="Brochuer"
          component={Brochuer}
          options={{
            tabBarLabel: 'Brochuer',
          }}
        />

        {/*  */}
      </Tab.Navigator>
    </View>
  );
};

export default AdminIEC;

const styles = StyleSheet.create({});
