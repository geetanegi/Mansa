import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import st from '../../../global/styles';
import {useTranslation, I18n} from 'react-i18next';
import { colors } from '../../../global/theme';

const EmptyItem = ({txColor}) => {
  const {t} = useTranslation();
  return (
    <View
      style={[
        st.center,
        {marginTop: '40%'}
      ]}>
      <Text style={[st.tx16,{color:txColor ? txColor : colors.white}]}>{t('NotFound')}</Text>
    </View>
  );
};

export default EmptyItem;

const styles = StyleSheet.create({});
