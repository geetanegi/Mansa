import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { images } from '../../global/theme'
const MansaImg = ({imgsty}) => {
  return (
    <View>
        <Image source={images.mansa} style={[{width:169, height:242}, imgsty]} />
    </View>
  )
}

export default MansaImg

const styles = StyleSheet.create({})