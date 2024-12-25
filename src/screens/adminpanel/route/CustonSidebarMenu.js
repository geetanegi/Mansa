import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {colors, images} from '../../../global/theme';
import styles from '../../../global/styles';


const CustomSidebarMenu = props => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={styles.mt_v} />
      <View style={stylesSidebar.profileHeader}>
        <View>
          <Image source={images.guest} style={stylesSidebar.imgsty} tintColor={colors.lightFrozy} />
        </View>
        <View>
          <Text style={[styles.tx16, {color: colors.blue}]}>Welcome User</Text>
          <Text style={[styles.tx12, {color: colors.blue}]}>Aman Panday</Text>
        </View>
       
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}  />
      </DrawerContentScrollView>
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
    marginRight:15
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    // justifyContent: 'space-between',
  },

  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#ccc',
  },
});
