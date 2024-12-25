import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../global/styles';
import {colors} from '../../global/theme';
import {useTranslation, I18n} from 'react-i18next';
import {openDialScreen} from '../../utils/helperfunctions/functions';

const onModalClick = (value, props) => {
  props.onModalClick(value);
};

const PopUpMessage = props => {
  const {t} = useTranslation();
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={props.display}>
        <View activeOpacity={1} style={st.center}>
          <View style={styles.modalView}>
            <View
              style={[
                st.align_C,
                st.justify_C,
                {
                  backgroundColor: colors.blue,
                  height: 60,
                  width: '100%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]}>
              <Text style={[st.tx18, st.txAlignC]}>{props.titleMsg}</Text>
            </View>
            <View style={st.pd20}>
              {!props?.box ? (
                <Text style={[st.tx16, st.txAlignC, {color: '#000'}]}>
                  {props.subTitle}{' '}
                 
                </Text>
              ) : (
                <View style={[st.mt_t10, st.align_C]}>
                  <View style={styles.scorebox}>
                    <Text style={[st.tx20, st.txAlignC, {color: colors.black}]}>
                      {props.subTitle}
                    </Text>
                  </View>
                </View>
              )}

              <View style={[st.row, st.justify_S]}>
                {props.twoButton == true && (
                  <TouchableOpacity
                    style={[styles.buttonView, {backgroundColor: colors.blue}]}
                    onPress={() => {
                      onModalClick(false, props);
                    }}>
                    <Text style={[st.tx18]}>{t('No')}</Text>
                  </TouchableOpacity>
                )}
                {props.twoButton == true && (
                  <TouchableOpacity
                    style={[styles.buttonView, {backgroundColor: colors.blue}]}
                    onPress={() => {
                      if (props?.onPress_api) {
                        onModalClick(false, props);
                        props?.onPress_api();
                      } else {
                        onModalClick(false, props);
                      }
                    }}>
                    <Text style={[st.tx18, {color: colors.white}]}>
                      {t('Continue')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {props?.message && (
                <Text style={[st.tx14, st.mt_v, {color: '#000'}]}>
                  {props.message} <Text
                    style={st.txDecor}
                    onPress={() => openDialScreen(props?.contact1)}>
                    {/* 1800-891-4416 */}
                    {props?.contact1}
                  </Text>{' '}
                  {props?.contact1&& 'or'}{' '}
                  <Text
                    style={st.txDecor}
                    onPress={() => openDialScreen(props?.contact2)}>
                    {/* 14416. */}
                    {props?.contact2}
                  </Text>
                </Text>
              )}

              {props.twoButton == false && (
                <View>
                  <TouchableOpacity
                    style={[styles.buttonView, {backgroundColor: colors.blue}]}
                    onPress={() => {
                      onModalClick(false, props);
                    }}>
                    <Text style={[st.tx18, {color: colors.white}]}>
                      {t('Continue')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PopUpMessage;

const styles = StyleSheet.create({
  buttonView: {
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // width: '45%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '85%',
  },
  scorebox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.warning,
  },
});
