import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import st from '../../../global/styles';
import Footer from '../../../components/footer';
import AuthHeader from '../../../components/Auth_Header';

const ListMore = ({navigation, route}) => {
  const data =route?.params?.data
  const renderItem = route?.params?.renderItem
  const numColumns = route?.params?.numColumns
  return (
    <View style={st.container}>
      <AuthHeader
        title={''}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{paddingLeft:numColumns?20:0}}
        keyExtractor={(item, i) =>
          item.id ? item.id.toString() : i.toString()
        }
        numColumns={numColumns}
      />
      <Footer />
    </View>
  );
};

export default ListMore;

const styles = StyleSheet.create({});
