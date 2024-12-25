import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import st from '../../../../../global/styles';
import Icon from 'react-native-vector-icons/Entypo';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {colors} from '../../../../../global/theme';
import {deleteAlert} from '../../../../../utils/helperfunctions/functions';
const MyItem = ({
  item,
  onEditClick,
  onDeleteClick,
  gotoQues,
  hideArrow,
  title,
  subtitle,
  onDeletePress,
  enable
}) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = index => setVisible(false);

  const showMenu = index => setVisible(true);

  return (
    <View style={st.mt_B}>
      <View style={st.row}>
        <View style={st.wdh80}>
          <Text style={[st.tx16, {color: colors.lightText}]}>{item.feelingType || item.subFeelType || item.englishquestion }</Text>
        </View>
        <View style={[st.wdh20, st.align_E]}>
          <View style={[st.row]}>
            {enable&&
            <Menu
              visible={visible}
              anchor={
                <TouchableOpacity onPress={() => showMenu()}>
                  <Icon name={'dots-three-vertical'} size={20} />
                </TouchableOpacity>
              }
              onRequestClose={() => hideMenu()}>
              <MenuItem
                onPress={() => {
                  hideMenu();
                  onEditClick();
                }}
                textStyle={[st.tx14, {color: colors.black}]}>
                Edit
              </MenuItem>
              <MenuDivider color={colors.lightText} />
              <MenuItem
                onPress={() => {
                  hideMenu();
                  if (Platform.OS == 'android') {
                    onDeleteClick();
                  } else {
                    deleteAlert(title, subtitle, onDeletePress);
                  }
                }}
                textStyle={[st.tx14, {color: colors.black}]}>
                Delete
              </MenuItem>
            </Menu>}

            {!hideArrow && (
              <TouchableOpacity onPress={() => gotoQues()} style={st.ml_15}>
                <Icon name={'chevron-thin-right'} size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyItem;

const styles = StyleSheet.create({});
