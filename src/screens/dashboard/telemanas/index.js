import {StyleSheet, Text, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import st from '../../../global/styles';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import {useTranslation} from 'react-i18next';
import {colors, images} from '../../../global/theme';
import DialText from '../../../components/dialPad';
import * as Animatable from 'react-native-animatable';
import Accordian from '../../../components/accordion';
import {API} from '../../../utils/endpoints';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import {getApi} from '../../../utils/apicalls';
import {View} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../components/button';
import LinearGradient from 'react-native-linear-gradient';

const TeleManas = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const lang = i18n.language;

  const getFAQHandle = async () => {
    const url = API.GET_FAQ;
    try {
      if (Platform.OS == 'android') {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result?.data;
        var sortArr = data.sort(function (a, b) {
          return a.sequence - b.sequence;
        });
        setData(sortArr);
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
    getFAQHandle();
  }, []);

  const renderAccordians = () => {
    const items = [];
    for (item of data) {
      items.push(<Accordian data={item} lang={lang} />);
    }
    return items;
  };

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('TELE')}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={st.pd20} animation={'fadeInRight'} delay={500}>
          <DialText />

          <View>
            <Image
              source={images.tele_top}
              style={{
                width: 200,
                height: 100,
                alignSelf: 'center',
                resizeMode: 'center',
              }}
            />
          </View>

          {lang == 'hi' ? (
            <Text
              style={[
                st.tx14,
                st.txAlignJ,
                {color: colors.black, lineHeight: 30, letterSpacing: 1},
              ]}>
              भारत सरकार ने अपने केंद्रीय बजट 2022 में, राष्ट्रीय टेली मानसिक
              स्वास्थ्य कार्यक्रम, (टेली मानस) की घोषणा करते हुए इसके निर्देशन
              और समग्र क्रियान्वयन का ज़िम्मा स्वास्थ्य एवं परिवार कल्याण
              मंत्रालय को सौंपा । नतीजतन, स्वास्थ्य मंत्रालय ने टेली मानस के
              विशिष्ट लक्ष्यों और उद्देश्यों को प्राप्त करने के लिए एक राष्ट्रीय
              तकनीकी सलाहकार समूह (NTAG) और तीन तकनीकी सलाहकार उप-समितियों
              (मानसिक स्वास्थ्य सेवा वितरण, सूचना प्रौद्योगिकी वास्तुकला और
              स्वास्थ्य प्रणाली) का गठन किया । टेली मानस को दो स्तरीय प्रणाली के
              रूप में आयोजित किया जा रहा हैं । टियर 1 में राज्य टेली मानस
              इकाईयां शामिल हैंं, जिसमें प्रशिक्षित परामर्शदाता और मानसिक
              स्वास्थ्य विशेषज्ञ शामिल किये गए हैंं ।
              <Text style={st.txbold}> मध्य प्रदेश में ,</Text> दो टेली मानस सेल
              क्रमशः मानसिक चिकित्सालय, इंदौर और मानसिक आरोग्यशाला, ग्वालियर में
              स्थापित हैंं एवं एम्स, भोपाल को मेंटरिंग संस्थान के रूप में नामित
              किया गया हैं। टियर 2 में स्वयं उपस्थित हो कर परामर्श प्राप्त करने
              के लिए जिला मानसिक स्वास्थ्य कार्यक्रम (डीएमएचपी-मनकक्ष)/मेडिकल
              कॉलेज संसाधनों का उपयोग होगा और/या ऑडियो विजुअल परामर्श के लिए
              ई-संजीवनी के माध्यम से इस प्रक्रिया में विशेषज्ञ शामिल होंगे ।
              {'\n'}
              {'\n'}
              टेलीमानस का उद्देश्य राष्ट्रीय मानसिक स्वास्थ्य कार्यक्रम के
              डिजिटल घटक के रूप में 24X7 टेली-मानसिक स्वास्थ्य हेल्पलाइन सेवाओं
              (नंबर 14416 और 1800-89-14416) के माध्यम से न्यायसंगत, सुलभ,
              किफायती और गुणवत्तापूर्ण मानसिक स्वास्थ्य देखभाल तक सभी राज्यों और
              केंद्रशासित प्रदेशों के नागरिकों की सार्वभौमिक पहुंच को सुनिश्चित
              लिंकेज के साथ संभव करना हैं । इस कार्यक्रम के उद्देश्यों में शामिल
              हैंं -{'\n'}
              {'\n'}• देश के प्रत्येक राज्य और केन्द्र शासित प्रदेशों में 24x7
              टेली-मानसिक स्वास्थ्य सुविधा स्थापित करके, पूरे भारत में किसी भी
              समय, किसी भी व्यक्ति तक मानसिक स्वास्थ्य सेवाओं की पहुंच को तेजी
              से बढ़ाना ।{'\n'}
              {'\n'}• एक पूर्ण मानसिक स्वास्थ्य-सेवा नेटवर्क को लागू करना, जो
              परामर्श के अलावा, मानसिक स्वास्थ्य विशेषज्ञों के साथ वीडियो
              परामर्श, ई-नुस्खे, फॉलो-अप सेवाओं और व्यक्तिगत परामर्श सेवाओं से
              जुड़ाव सहित एकीकृत चिकित्सा और मनोसामाजिक हस्तक्षेप प्रदान करता
              हैं।
              {'\n'}
              {'\n'}• आबादी के कमजोर समूहों और पहुंच में मुश्किल आबादी तक मानसिक
              स्वास्थ्य सेवाओं का विस्तार करना।{'\n'}
            </Text>
          ) : (
            <Text
              style={[
                st.tx14,
                st.txAlignJ,
                {color: colors.black, lineHeight: 30, letterSpacing: 1},
              ]}>
              The Government of India (GoI) in its Union Budget 2022, announced
              the National Tele Mental Health Programme of India, Tele Mental
              Health Assistance and Networking Across States (Tele MANAS) and
              entrusted the Ministry of Health and Family Welfare (MoHFW) to
              guide its overall implementation. Consequently, the MoHFW formed a
              National Technical Advisory Group (NTAG) and three technical
              advisory sub-committees (Mental Health Service Delivery,
              Information Technology Architecture and Health Systems) to achieve
              specific goals and objectives of Tele MANAS. Tele MANAS is
              organized as a two-tier system. Tier 1 comprise the State Tele
              MANAS cells, which includes trained counsellors and mental health
              specialists.
              <Text style={st.txbold}> In Madhya Pradesh (M.P.),</Text> two Tele
              MANAS cells have been established (In Gwalior and Indore) and
              AIIMS, Bhopal has been designated as mentoring institute. Tier 2
              comprise specialists at District Mental Health Programme
              (DMHP)/Medical College resources for physical consultation and/or
              eSanjeevani for audio visual consultation.{'\n'}
              {'\n'}
              The aim of Tele MANAS is to provide equitable, accessible,
              affordable and quality mental healthcare through 24X7 tele-mental
              health helpline services (No. 14416 & 1800-89-14416) as a digital
              component of the National Mental Health Programme (NMHP).{'\n'}
              {'\n'}
              With this initiative, services are extended to populations that
              are hard to reach and vulnerable.
            </Text>
          )}
        </View>

        <View style={[st.pd20, {marginTop: -30}]}>
          <Text style={[st.tx16Tip, st.txAlignC]}>
            {lang == 'hi'
              ? 'टेली मानस,\nमध्यप्रदेश में संपर्क कैसे करें -'
              : 'How to initiate call to Tele MANAS,\n Madhya Pradesh'}
          </Text>

          <View style={[st.pd20]}>
            <View style={st.row}>
              <View style={st.wdh20}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={[st.animatedCir_2, st.justify_C, st.align_C]}>
                  <View>
                    <Icon name={'phone'} size={30} color={colors.white} />
                  </View>
                </LinearGradient>
                <View style={{marginLeft: '25%'}}>
                  <Text style={{width: 10}}>⬤⬤⬤</Text>
                </View>
              </View>
              <View style={st.wdh80}>
                <Text style={[st.tx14, st.txAlignC, {color: colors.black}]}>
                  {lang == 'hi'
                    ? '24x7 टोलफ्री नंबर 14416 या 1800-891-4416 डायल करें'
                    : '24x7 Dial toll free no 14416 or 18008914416'}
                  {'\n'}
                </Text>
              </View>
            </View>

            <View style={[st.row, {marginTop: 5}]}>
              <View style={st.wdh20}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={[st.animatedCir_2, st.justify_C, st.align_C]}>
                  <View>
                    <Icon name={'language'} size={30} color={colors.white} />
                  </View>
                </LinearGradient>
                <View style={{marginLeft: '25%'}}>
                  <Text style={{width: 10}}>⬤⬤⬤⬤⬤</Text>
                </View>
              </View>
              <View style={st.wdh80}>
                <Text style={[st.tx14, st.txAlignC, {color: colors.black}]}>
                  {lang == 'hi'
                    ? 'इसके बाद \n भाषा का विकल्प चुनें'
                    : 'After that select option for \n language'}
                </Text>
                <View style={[st.row, st.justify_A]}>
                  <View>
                    <Button
                      title={lang == 'hi' ? 'हिंदी' : 'Hindi'}
                      backgroundColor={'#4797B3'}
                      color={colors.white}
                      disabled={true}
                    />
                  </View>
                  <View>
                    <Button
                      title={lang == 'hi' ? 'अंग्रेज़ी' : 'English'}
                      backgroundColor={'#4797B3'}
                      color={colors.white}
                      disabled={true}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={[st.row, {marginTop: 5}]}>
              <View style={st.wdh20}>
                <LinearGradient
                  colors={[colors.circle_2, colors.circle_1]}
                  style={[st.animatedCir_2, st.justify_C, st.align_C]}>
                  <View>
                    <Icon
                      name={'user-circle-o'}
                      size={30}
                      color={colors.white}
                    />
                  </View>
                </LinearGradient>
              </View>
              <View style={st.wdh80}>
                <Text style={[st.tx14, st.txAlignC, {color: colors.black}]}>
                  {lang == 'hi'
                    ? 'इसके बाद प्रशिक्षित परामर्शदाता\nसे बात करने के लिए\nमध्य प्रदेश राज्य चुने'
                    : 'After that select\nMadhya Pradesh state to talk\nwith trained counsellor.'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[st.mt_B]} animation={'fadeInRight'} delay={1000}>
          <Text style={[st.tx18, st.txAlignC, {color: colors.black}]}>
            {t("FAQ's")}
          </Text>
        </View>

        <View style={st.pd_H20} animation={'fadeInRight'} delay={1200}>
          {renderAccordians()}
        </View>

        <View>
          <Image
            source={images.tele_bottom}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              resizeMode: 'center',
            }}
          />
        </View>

        <View>
          <DialText />
          <Animatable.Text
            style={[st.tx16, st.txAlignC, st.txbold, {color: colors.danger}]}
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite">
            {lang == 'hi'
              ? 'कॉल करने वाले व्यक्ति की समस्त जानकारी\n गोपनीय रखी जाती हैं।'
              : 'The caller`s contact information\n will be kept private.'}
          </Animatable.Text>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default TeleManas;

const styles = StyleSheet.create({
  imgsty: {width: 25, height: 25, marginBottom: 10},
});
