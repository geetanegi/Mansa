import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {colors, images} from '../../../global/theme';
import st from '../../../global/styles';
import BottomSheet from 'react-native-simple-bottom-sheet';
import AuthHeader from '../../../components/Auth_Header';
import {getApi} from '../../../utils/apicalls';
import {API} from '../../../utils/endpoints';
import Loader from '../../../components/loader';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native-animatable';

const Medical = ({navigation}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  const panelRef = useRef(null);

  let sliderMaxHeight = Dimensions.get('window').height * 0.8;

  const getQuestions = async () => {
    const url = API.GET_GEOLOCATION + false;

    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;
        // console.log({data})
        setData(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleAddressPress = address => {
    setSelectedAddress(address);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: address.latitude,
        longitude: address.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        locationHindi: address.locationHindi,
        locationName: address.locationName,
        address: address.address,
        addressHindi: address.addressHindi,
      });
    }
  };

  const renderAddressItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleAddressPress(item);
          setShowArrow(false);
          if (bottomSheetVisible) {
            panelRef.current.togglePanel();
          }
        }}
        style={styles.addressItem}>
        <Text style={[st.tx14, {color: colors.black}]}>
          {lang != 'hi' ? item.locationName : item.hindiTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {selectedAddress && (
        <View style={styles.mansaContainer}>
          <View style={st.wdh20}>
            <Image source={images.mansa} style={styles.imgsty} />
          </View>
          <View style={[st.row, st.wdh75]}>
            <View style={st.tringle} />
            <View style={styles.mansaContent}>
              <Text style={[st.tx14, st.txAlignL]}>
                {t('PsychiatricMansa')}
              </Text>
            </View>
          </View>
        </View>
      )}

      {showArrow && (
        <View
          animation="slideInDown"
          easing="ease-out"
          iterationCount="infinite"
          style={{position: 'absolute', right: 20, bottom: 60, zIndex: 999}}>
          <Icon name={'arrow-down'} size={40} color={colors.danger} />
        </View>
      )}

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 23.6345,
          longitude: 80.6608,
          latitudeDelta: 14.5,
          longitudeDelta: 14.5,
        }}>
        {selectedAddress && (
          <Marker
            onPress={() => setShowArrow(!showArrow)}
            coordinate={{
              latitude: selectedAddress.latitude,
              longitude: selectedAddress.longitude,
            }}
            title={
              lang != 'hi'
                ? selectedAddress.locationName
                : selectedAddress.locationHindi
            }
            description={
              lang != 'hi'
                ? selectedAddress.address
                : selectedAddress.addressHindi
            }>
            <View style={styles.circle} />
          </Marker>
        )}

        {data.map((i, n) => {
          return (
            <Marker
              key={n}
              draggable
              coordinate={{
                latitude: i.latitude,
                longitude: i.longitude,
              }}
              onDragEnd={e => console.log(e)}
              onPress={() => {
                handleAddressPress(i);
                setShowArrow(true);
              }}
              title={lang != 'hi' ? i.locationName : i.locationHindi}
              description={lang != 'hi' ? i.address : i.addressHindi}>
              <View style={styles.circle} />
            </Marker>
          );
        })}
      </MapView>

      <BottomSheet
        isOpen={false}
        sliderMinHeight={200}
        wrapperStyle={st.wdh75}
        onOpen={() => setBottomSheetVisible(true)}
        onClose={() => setBottomSheetVisible(false)}
        ref={ref => (panelRef.current = ref)}
        sliderMaxHeight={sliderMaxHeight}>
        {onScrollEndDrag => (
          <ScrollView onScrollEndDrag={onScrollEndDrag}>
            <Text style={[st.tx16, {color: colors.black}, st.mt_B]}>
              {t('Psychiatric Hospital')}
            </Text>
            <FlatList
              data={data}
              renderItem={renderAddressItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
        )}
      </BottomSheet>

      {isLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mansaContent: {
    backgroundColor: colors.black,
    marginTop: 9,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 130,
  },
  mansaContainer: {
    position: 'absolute',
    top: 20,
    zIndex: 999,
    flexDirection: 'row',
  },
  imgsty: {
    width: 100,
    height: 100,
    resizeMode: 'center',
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: '#0398fc',
    borderWidth: 2,
    borderColor: colors.blue,
  },
  addressList: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,

    borderRadius: 10,
    padding: 10,
    // zIndex: 1,
    // maxHeight: 200,
    overflow: 'scroll',
  },
  addressItem: {
    padding: 10,
    backgroundColor: colors.skyblue,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default Medical;
