import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import st from '../../../../global/styles';
import AdminStackHeader from '../../../../components/adminStackHeader';
import YoutubePlayer from 'react-native-youtube-iframe';
import {colors} from '../../../../global/theme';
import AuthHeader from '../../../../components/Auth_Header';
const ViewVdo = ({navigation, route}) => {
  const [playing, setPlaying] = useState(true);
  const [vdoId, setVdoId] = useState();
  const data = route?.params?.item;

  console.log({data});

  const getVideoId = data => {
    const result = data.url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    const videoIdWithParams = result[2];

    if (videoIdWithParams !== undefined) {
      const cleanVideoId = videoIdWithParams.split(/[^0-9a-z_-]/i)[0];
      console.log({cleanVideoId});
      setVdoId(cleanVideoId);
    }

    return null;
  };

  useEffect(() => {
    getVideoId(data);
  }, []);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      // alert('video has finished playing!');
    }
  }, []);
  return (
    <View style={st.flex}>
      <AuthHeader title={''} onBack={() => navigation.goBack()} auth={true} />
      <ScrollView>
        <YoutubePlayer
          height={250}
          play={playing}
          videoId={vdoId}
          onChangeState={onStateChange}
        />
        <View style={st.pd20}>
          <Text style={[st.tx18, st.mt_B, {color: colors.black}]}>
            {data?.videoName}
          </Text>
          <Text style={[st.tx14, st.txAlignJ, {color: colors.black}]}>
            {data?.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewVdo;

const styles = StyleSheet.create({});
