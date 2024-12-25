import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../global/theme';
import Back from '../back';
import st from '../../global/styles';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTranslation, I18n} from 'react-i18next';

const AuthHeader = ({title, onBack, auth, gotohome, user, gotoAdmin, assessment, gotoAssessment}) => {
  const {t, i18n} = useTranslation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingHorizontal: 15,
        paddingBottom: 10,
        backgroundColor: colors.blue,
      }}>
      <View>
        <Back onPress={onBack} />
      </View>
      <View>
        <Text style={st.tx20}>{title}</Text>
      </View>
      <View>
        {!auth && (
          <TouchableOpacity onPress={gotohome}>
            <Icon name={'home'} size={25} color={colors.white} />
          </TouchableOpacity>
        )}

        {user && (
          <TouchableOpacity onPress={gotoAdmin}>
            <FontAwesome name={'user-md'} size={25} color={colors.white} />
          </TouchableOpacity>
        )}

        {assessment&&(
          <TouchableOpacity onPress={gotoAssessment}>
           <Text style={st.tx14}>{t('Take another assessment')}</Text>
        </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({});
