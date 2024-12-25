import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {colors, images} from '../global/theme';
import {size} from '../global/fonts';
import styles from '../global/styles';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';
import {environment} from '../utils/constant';

const CustomSidebarMenu = props => {
  const url = environment.netlink_website;
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      {/* <View style={styles.mt_v} />
      <View style={stylesSidebar.profileHeader}>
        <View>
          <Image source={images.guest} style={stylesSidebar.imgsty} />
        </View>
        <View>
          <Text style={[styles.tx16, {color: colors.blue}]}>Welcome User</Text>
          <Text style={[styles.tx12, {color: colors.blue}]}>Aman Panday</Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Notification')}>
          <View
            style={styles.bell_count}>
            <Text style={styles.tx14}>3</Text>
          </View>
          <Icon name={'bell'} size={22} color={colors.blue} />
        </TouchableOpacity>
      </View>
      <View style={stylesSidebar.profileHeaderLine} /> */}

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* <View style={styles.align_C}>
        <TouchableOpacity onPress={() => Linking.openURL(url)}>
          <Image
            source={images.netlink_logo}
            style={stylesSidebar.netlinklogo}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  imgsty: {
    width: 35,
    height: 35,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#ccc',
  },
  netlinklogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'center',
  },
});
