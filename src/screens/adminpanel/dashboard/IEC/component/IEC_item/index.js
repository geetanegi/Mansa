import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import st from '../../../../../../global/styles';
import {images, colors} from '../../../../../../global/theme';
import Icon from 'react-native-vector-icons/Entypo';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {deleteAlert} from '../../../../../../utils/helperfunctions/functions';

const IECItem = ({
  item,
  onEditItem,
  onDeleteItem,
  title,
  subtitle,
  onDeletePress,
  onViewPress
}) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  return (
    <View
      style={{
        padding: 15,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: colors.lightText,
        marginBottom: 15,
      }}>
      <View style={[st.row, st.justify_S]}>
        <View style={st.wdh90}>
          <Text style={[st.tx14,{color:colors.black}]}>{item?.title || item?.desciption}</Text>
        </View>
        <View style={[st.wdh10, st.align_E]}>
          <Menu
            visible={visible}
            anchor={
              <TouchableOpacity onPress={showMenu}>
                <Icon name={'dots-three-vertical'} size={20} />
              </TouchableOpacity>
            }
            onRequestClose={hideMenu}>
            {/* <MenuItem
              onPress={() => {
                hideMenu();
                onViewPress()
              }}
              textStyle={[st.tx14, {color: colors.black}]}>
              View
            </MenuItem> */}
            {/* <MenuDivider color={colors.lightText} /> */}
            <MenuItem
              onPress={() => {
                hideMenu();
                onEditItem();
              }}
              textStyle={[st.tx14, {color: colors.black}]}>
              Edit
            </MenuItem>
            <MenuDivider color={colors.lightText} />
            <MenuItem
              onPress={() => {
                hideMenu();
                if (Platform.OS == 'android') {
                  onDeleteItem();
                } else {
                  deleteAlert(title, subtitle, onDeletePress);
                }
              }}
              textStyle={[st.tx14, {color: colors.black}]}>
              Delete
            </MenuItem>
          </Menu>
        </View>
      </View>
    </View>
  );
};

export default IECItem;

const styles = StyleSheet.create({});
