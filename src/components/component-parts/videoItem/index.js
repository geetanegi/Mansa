import {StyleSheet, Text} from 'react-native';
import React from 'react';
import st from '../../../global/styles';
import {images, colors} from '../../../global/theme';
import {Thumbnail} from 'react-native-thumbnail-video';
import {View} from 'react-native-animatable';
import {useTranslation} from 'react-i18next';

const VideoItem = ({item, index, onPress}) => {
  // console.log({VideoItem:item})
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <View style={st.pd_H20} key={index} animation={'fadeInRight'} delay={500}>
      <View style={[st.row, st.mt_B]}>
        <View style={st.wdh40}>
          <Thumbnail
            url={item?.url}
            imageWidth={100}
            imageHeight={100}
            containerStyle={{
              backgroundColor: '#000',
              width: 100,
              height: 100,
            }}
            iconStyle={{
              width: 20,
              height: 24,
              tintColor: colors.lightFrozy,
            }}
            onError={e => console.log(e)}
            onPress={onPress}
          />
        </View>
        <View style={st.wdh60}>
          <View>
            <Text style={[st.tx14, {textAlign: 'auto'}]}>
              {lang == 'hi' ? item.hindivideoName : item.videoName}
            </Text>
            <Text style={[st.tx12, {opacity: 0.5}]} numberOfLines={3}>
              {lang == 'hi' ? item.hindidescription : item.description}
            </Text>
          </View>
          <View></View>
        </View>
      </View>
    </View>
  );
};

export default VideoItem;

const styles = StyleSheet.create({});
