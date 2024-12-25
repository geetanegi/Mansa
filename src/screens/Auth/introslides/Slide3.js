import {StyleSheet, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import st from '../../../global/styles';
import {colors, images} from '../../../global/theme';
import {StackActions} from '@react-navigation/native';
import Button from '../../../components/button';
import { View } from 'react-native-animatable';

const Slide2 = ({navigation}) => {
  //   useEffect(() => {
  //     setTimeout(() => {
  //       navigation.dispatch(StackActions.replace('Disclamer'));
  //     }, 5000);
  //   }, [navigation]);

  return (
    <View style={st.container}>
      <View style={[st.pd20, st.flex]}>
        <View style={[st.center]} animation={'fadeInRight'} delay={1000}>
          <Image source={images.lotus} style={st.lotus_sty} />
          <View style={[{marginTop: '8%'}]}>
            <Text style={[st.tx20, st.txAlignC]}>
              Happiness is always within us
            </Text>
          </View>
        </View>

        <Button
          title={'Get Started/आरंभ करे'}
          onPress={() => navigation.dispatch(StackActions.replace('SelectLanguage'))}
        />
      </View>
    </View>
  );
};

export default Slide2;

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10,
  },
  bottom_foo: {
    position: 'absolute',
    bottom: 20,
    left: '45%',
    flexDirection: 'row',
  },
});
