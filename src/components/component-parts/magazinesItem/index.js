import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../../global/styles';
import {images, colors} from '../../../global/theme';
import Icon from 'react-native-vector-icons/Foundation';
import {historyDownload} from '../../../utils/helperfunctions/functions';
import Loader from '../../loader';
import PopUpMessage from '../../popup';
import {View} from 'react-native-animatable';
import {useTranslation} from 'react-i18next';

const MagazinesItem = ({item, onClickPdf}) => {
  const {t, i18n} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const getpdfFile = async (title, url) => {
    try {
      setIsLoading(true);
      const result = await historyDownload(title, url, t);
      if (result) {
        setIsLoading(false);
        onPopupMessageModalClick(true);
        setTitle(t('Congratulations'));
        setSubtitle(t('Pdfdownloaded'));
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        gotoSuggestion={() => {
          setPopupMessageVisibility(false);
        }}
        twoButton={false}
        box={false}
      />
    );
  };

  return (
    <View style={[st.mt_v, st.pd_H20]} animation={'fadeInRight'} delay={500}>
      <View style={[styles.cardMags]}>
        <View style={[st.row]}>
          <View style={st.wdh30}>
            <Image source={{uri: item.thumbnail}} style={st.thumbnailSty} />
          </View>
          <View style={st.wdh70}>
            <View>
              <Text style={st.tx16} numberOfLines={2}>
                {item.title}
              </Text>
              {/* <Text style={st.tx12} numberOfLines={2} >{item.discription}</Text> */}
            </View>
            <View style={[st.row, st.mt_t10]}>
              <TouchableOpacity
                onPress={() => onClickPdf()}
                style={styles.pdf_read}>
                <Text style={[st.tx12, {color: colors.blue}]}>{t("Read Now")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => getpdfFile(item.title, item.url)}
                style={[styles.pdf_read, st.ml_15]}>
                <Icon name={'download'} size={20} color={colors.footer_bg} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {show_alert_msg()}
      {isLoading && <Loader />}
    </View>
  );
};

export default MagazinesItem;

const styles = StyleSheet.create({
  cardMags: {
    padding: 10,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 15,
  },
  pdf_read: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 50,
    paddingVertical: 3,
  },
});
