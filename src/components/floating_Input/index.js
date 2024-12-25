import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Animated,
  Pressable,
  Image,
} from 'react-native';
import st from '../../global/styles';
import {colors} from '../../global/theme';

const TestScreen = ({
  label,
  iconName,
  error,
  inputsty,
  password,
  onFocus = () => {},
  onBlur = () => {},
  value,
  ...props
}) => {
  const moveText = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (value !== '') {
      moveTextTop();
    } else if (value === '') {
      moveTextBottom();
    }
  }, [value]);

  // const onChangeText = text => {
  //   setValue(text);
  // };

  const onFocusHandler = () => {
    if (value !== '') {
      moveTextTop();
    }
  };

  const onBlurHandler = () => {
    if (value === '') {
      moveTextBottom();
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          {borderColor: colors.white, borderWidth: 1.5},
        ]}>
        <Animated.View style={[styles.animatedStyle, animStyle]}>
          <Text
            style={[
              st.tx14,
              {
                color: colors.white,
                backgroundColor: value ? colors.blue : null,
                paddingHorizontal: 10,
              },
            ]}>
            {label}
          </Text>
        </Animated.View>

        <TextInput
          autoCapitalize={'none'}
          style={styles.input}
          onFocus={onFocus}
          onBlur={onBlur}
          blurOnSubmit
          selectionColor={'#fff'}
          value={value}
          placeholderTextColor={'#fff'}
          {...props}
        />

        {iconName && (
          <Image
            source={iconName}
            style={{position: 'absolute', top: 10, right: 15}}
          />
        )}
      </View>
      {error && (
        <Text style={[{color: colors.danger, fontSize: 12}]}>{error}</Text>
      )}
    </View>
  );
};
export default TestScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 20,
    // backgroundColor: '#fff',
    // paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    height: 50,
    alignSelf: 'center',
  },
  icon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    ...st.tx14,
    height: 50,
  },
  label: {
    color: 'grey',
    fontSize: 10,
  },
  animatedStyle: {
    top: 9,
    left: 15,
    position: 'absolute',
    borderRadius: 90,
    zIndex: 10000,
  },
});
