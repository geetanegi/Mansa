import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import st from '../../global/styles';
import {colors} from '../../global/theme';
export default class RadioButton extends Component {
  state = {
    value: '',
  };
  render() {
    const {PROP, onSelect, t, initialValue, txtColor} = this.props;
    const {value} = this.state;
    return (
      <View
        style={[
          st.row,
          st.justify_S,
          styles.inputsty,
          {padding: 10, marginTop: 15, marginBottom: 10},
        ]}>
        {PROP.map(res => {
          return (
            <View key={res.key} style={styles.container}>
              <TouchableOpacity
                style={[styles.radioCircle,{borderColor:txtColor}]}
                onPress={() => {
                  this.setState({
                    value: res.key,
                  });
                  onSelect(res.key);
                }}>
                {initialValue
                  ? initialValue === res.key && (
                      <View style={[styles.selectedRb,{backgroundColor:txtColor}]} />
                    )
                  : value === res.key && <View style={[styles.selectedRb,{backgroundColor:txtColor}]} />}
              </TouchableOpacity>
              <Text style={[st.tx14, st.txCap, {marginLeft: 5, color:txtColor}]}>
                {t(res.text)}
              </Text>
            </View>
          );
        })}
        {/* <Text> Selected: {this.state.value} </Text> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
  },
  radioText: {
    marginRight: 35,
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
  inputsty: {
    borderWidth: 1.5,
    borderColor: colors.white,
    borderRadius: 7,
  },
});
