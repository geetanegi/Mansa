import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Hospital from './Hospital';
import Medical from './Medical';
import {colors} from '../../../global/theme';
import st from '../../../global/styles';
import AuthHeader from '../../../components/Auth_Header';
import {family} from '../../../global/fonts';
import {useTranslation} from 'react-i18next';

const MankakshTab = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();
  const {t, i18n} = useTranslation();
  return (
    <View style={st.flex}>
      <AuthHeader
        title={''}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#F8F8F8',
          tabBarStyle: {
            backgroundColor: colors.blue,
            height: 60,
          },

          tabBarItemStyle: {
            backgroundColor: colors.skyblue,
            height: 48,
            borderRadius: 5,
            marginHorizontal: '2%',
          },
          tabBarLabelStyle: [
            st.tx16,
            {
              color: colors.black,
              textTransform: 'capitalize',
              fontFamily: family.semibold,
            },
          ],
          tabBarIndicatorStyle: {
            borderBottomColor: colors.white,
            borderBottomWidth: 5,
            borderRadius: 30,
          },
        }}>
        <Tab.Screen
          name="Hospital"
          component={Hospital}
          options={{
            tabBarLabel: t('Mankaksha'),
          }}
        />
        <Tab.Screen
          name="Medical"
          component={Medical}
          options={{
            tabBarLabel: t('Medical College'),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MankakshTab;

const styles = StyleSheet.create({});
