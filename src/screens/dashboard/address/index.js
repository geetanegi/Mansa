import {Text, ScrollView, Image, Platform, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import st from '../../../global/styles';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import {useSSR, useTranslation} from 'react-i18next';
import {colors, images} from '../../../global/theme';
import {API} from '../../../utils/endpoints';
import {getApi, postApi} from '../../../utils/apicalls';
import Loader from '../../../components/loader';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import {View} from 'react-native-animatable';

const Address = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const lang = i18n.language;

  const getQuestions = async () => {
    const url = API.GET_DISTRICT;

    try {
      if (Platform.OS == 'android') {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
      const result = await getApi(url);
      if (result?.status == 200) {
        const data = result.data;

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

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('Mankaksha')}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={[st.pd20]}>
          <View
            style={[st.align_C, st.mt_B]}
            animation={'fadeInRight'}
            delay={500}>
            <Image
              source={images.address}
              style={[st.mt_B, {width: '100%', height: 200}]}
            />
          </View>

          {data?.map((i, n) => {
            return (
              <Pressable
                style={st.mt_t10}
                onPress={() =>
                  navigation.navigate('MankakshTab', {url: i?.fileName})
                }>
                <Text
                  style={[
                    st.tx14,
                    st.txAlignJ,
                    st.txAlignC,
                    st.mt_B,
                    {
                      color: colors.blue,
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  {t('Contact_btn_title_1')}
                </Text>
              </Pressable>
            );
          })}

          <View animation={'fadeIn'} delay={1000}>
            {lang == 'hi' ? (
              <Text
                style={[
                  st.tx14,
                  // st.txAlignL,
                  {color: colors.black, lineHeight: 30, letterSpacing: 1},
                ]}>
                <Text style={st.txbold}>
                  जिला मानसिक स्वास्थ्य कार्यक्रम (मनकक्ष):
                </Text>{' '}
                मानसिक स्वास्थ्य सेवाओं को विकेंद्रीकृत करने और सामान्य
                स्वास्थ्य देखभाल वितरण प्रणाली के साथ मानसिक स्वास्थ्य को एकीकृत
                करके सामुदायिक स्तर पर मानसिक स्वास्थ्य सेवा प्रदान करने के लिए
                राष्ट्रीय मानसिक स्वास्थ्य कार्यक्रम{' '}
                <Text style={st.txbold}>(एन एम एच पी)</Text> के तहत जिला मानसिक
                स्वास्थ्य कार्यक्रम (डीएमएचपी) शुरू किये गए हैंं । भारत सरकार
                द्वारा एनएमएचपी को वर्ष 1982 में आरम्भ किया गया । भारत इस
                कार्यक्रम को अपनाने वाले पहले विकासशील देशों में से एक था । इस
                कार्यक्रम के मुख्य उद्देश्य इस प्रकार हैंं : {'\n'}
                {'\n'}◙ निकट भविष्य में सभी के लिए, विशेष रूप से आबादी के सबसे
                कमजोर और वंचित वर्गों के लिए न्यूनतम मानसिक स्वास्थ्य देखभाल की
                उपलब्धता और पहुंच सुनिश्चित करना ।{'\n'}
                {'\n'}◙ सामान्य स्वास्थ्य देखभाल और सामाजिक विकास में मानसिक
                स्वास्थ्य ज्ञान के अनुप्रयोग को प्रोत्साहित करना ।{'\n'}
                {'\n'}◙ मानसिक स्वास्थ्य सेवा विकास में सामुदायिक भागीदारी को
                बढ़ावा देना और समुदाय में स्वयं सहायता की दिशा में प्रयासों को
                प्रोत्साहित करना ।{'\n'}
                {'\n'}मध्यप्रदेश राज्य में उक्त कार्यक्रम के उद्देश्य को प्राप्त
                करने के लिए सरकार ने राष्ट्रीय स्वास्थ्य मिशन, म.प्र. के अंतर्गत
                प्रत्येक जिला अस्पताल में मनकक्ष की स्थापना की हैं । वर्तमान में
                ये मनकक्ष निम्नलिखित गतिविधियों के माध्यम से मानसिक स्वास्थ्य
                सेवाएं प्रदान कर रहे हैंं - {'\n'}
                {'\n'}क) प्रत्येक जिले में जिला अस्पतालों के स्तर पर मानसिक
                स्वास्थ्य ओपीडी/आईपीडी संचालित करना ।{'\n'}
                {'\n'}ख) जिला चिकित्सालय स्थित मनकक्ष में और ज़िले की अन्य
                द्वितीयक स्तर की स्वास्थ्य संस्थाओं में गतिविधियों को आयोजित
                करते हुए मानसिक स्वास्थ्य जांच सह उपचार/परामर्श सेवाएं प्रदान
                करना ।{'\n'}
                {'\n'}ग) मानसिक निश्क्त्तताओं को पहचान कर, उनका निर्धारण करना और
                उन्हें प्रमाणित करना ।{'\n'}
                {'\n'}घ) सिविल अस्पतालों, सामुदायिक स्वास्थ्य केन्द्रों और
                आयुष्मान आरोग्य मंदिरों (एचडब्ल्यूसी) में मानसिक स्वास्थ्य
                आधारित आउटरीच और जागरूकता (आईईसी) गतिविधियों का संचालन करना ।
                {'\n'}
                {'\n'}ड) समाज के विभिन्न वर्गों के लिए मानसिक स्वास्थ्य आधारित
                आईईसी (सूचना, शिक्षा, संचार) गतिविधियों का आयोजन करना ।{'\n'}
                {'\n'}च) प्रत्येक वर्ष मानसिक स्वास्थ्य हेतु महत्व के दिवसों
                जैसे विश्व आत्महत्या रोकथाम दिवस (10 सितंबर) और विश्व मानसिक
                स्वास्थ्य दिवस (10 अक्टूबर), इत्यादि पर जन जागरूकता के आयोजन
                करना ।
              </Text>
            ) : (
              <Text
                style={[
                  st.tx14,
                  st.txAlignJ,
                  {color: colors.black, lineHeight: 30, letterSpacing: 1},
                ]}>
                <Text style={st.txbold}>
                  District Mental Health Programme (DMHP)
                </Text>{' '}
                was started under the National Mental Health Programme (NMHP) to
                decentralize mental health services and to provide mental health
                service at the community level by integrating mental health with
                the general healthcare delivery system.{' '}
                <Text style={st.txbold}>NMHP</Text> was adopted in the year
                1982. India was one of the first developing countries to adopt
                this program.{'\n'}
                Main objectives of the program were as follows:
                {'\n'}
                {'\n'}◙ To ensure the availability and accessibility of minimum
                mental healthcare for all in the foreseeable future particularly
                to the most vulnerable and underprivileged sections of the
                population.
                {'\n'}
                {'\n'}◙ Encourage the application of mental health knowledge in
                general healthcare and social development.
                {'\n'}
                {'\n'}◙ Promote community participation in mental health service
                development and to stimulate efforts toward self-help in the
                community.
                {'\n'}
                {'\n'}To achieve the objective of the program in the State the
                Govt. of MP established Mankaksh in every district hospitals
                under National Health Mission, M.P. Mankaksh provides mental
                health services in following manner –{'\n'}
                {'\n'}◙ Running Mental Health OPDs/IPDs at the level of District
                Hospitals in each district.
                {'\n'}
                {'\n'}◙ Providing mental health screening cum
                treatment/counseling services at Mankaksh and during Outreach
                activities.
                {'\n'}
                {'\n'}◙ Estimation of Mental Disabilities and certifying them.
                {'\n'}
                {'\n'}◙ Organizing mental health based IEC activities for the
                different sections of society.
                {'\n'}
                {'\n'}◙ Celebrating World Suicide Prevention Day (10th Sept) &
                World Mental Health Day (10th Oct) each year.
              </Text>
            )}
          </View>
          {data?.map((i, n) => {
            return (
              <Pressable
                style={st.mt_t10}
                onPress={() =>
                  navigation.navigate('MankakshTab', {url: i?.fileName})
                }>
                <Text
                  style={[
                    st.tx14,
                    st.txAlignJ,
                    st.txAlignC,
                    {
                      color: colors.blue,
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  {t('Contact_btn_title_1')}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default Address;
