import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import st from '../../../global/styles';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import {colors} from '../../../global/theme';
import {useTranslation, I18n} from 'react-i18next';

const Privacy = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('Privacy Policy')}
        onBack={() => {
          navigation.goBack();
        }}
        gotohome={() => navigation.navigate('Main')}
        // auth={true}
      />
      <ScrollView>
        <View style={st.pd20}>
          {data.map((i, n) => {
            return (
              <View>
                <Text style={[st.tx18, {color: colors.black}]}>
                  {lang == 'hi' ? i?.hindititle : i?.title}
                  {'\n'}
                </Text>
                {(i?.description || i?.hindi_des) && (
                  <Text style={[st.tx14, {color: colors.black}]}>
                    {lang == 'hi' ? i?.hindi_des : i?.description}
                    {'\n'}
                  </Text>
                )}
                {(i?.subtitle1 || i?.hindi_sub1) && (
                  <Text style={[st.tx14, {color: colors.black}]}>
                    {lang == 'hi' ? i?.hindi_sub1 : i?.subtitle1}
                    {'\n'}
                  </Text>
                )}
                {(i?.subtitle2 || i?.hindi_sub2) && (
                  <Text style={[st.tx14, {color: colors.black}]}>
                    {lang == 'hi' ? i?.hindi_sub2 : i.subtitle2}
                    {'\n'}
                  </Text>
                )}
                {(i?.subtitle3 || i?.hindi_sub3) && (
                  <Text style={[st.tx14, {color: colors.black}]}>
                    {lang == 'hi' ? i?.hindi_sub3 : i.subtitle3}
                    {'\n'}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Privacy;

const styles = StyleSheet.create({});

const data = [
  {
    id: 1,
    description:
      'Welcome to Mannhit. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information in connection with our mobile application and related services.',
    title: 'Introduction',
    hindititle: 'प्रस्तावना',
    hindi_des:
      'मनहित में आपका स्वागत हैं। यह गोपनीयता नीति आपको यह समझने में मदद करने के लिए डिज़ाइन की गई हैं कि हम अपने मोबाइल एप्लीकेशन और संबंधित सेवाओं के संबंध में आपकी व्यक्तिगत जानकारी को कैसे एकत्र, उपयोग, खुलासा और सुरक्षित रखते हैंं।',
    subtitle1: '',
    subtitle2: '',
    subtitle3: '',
  },
  {
    id: 2,
    description: '',
    title: 'Information We Collect',
    hindititle: 'हमारे द्वारा एकत्र की जाने वाली जानकारी ',
    subtitle1:
      'Personal Information: We may collect personal information, such as your name, age, phone number, and other information you provide when you sign up for our services or communicate with us',
    hindi_sub1:
      'व्यक्तिगत जानकारी: हम व्यक्तिगत जानकारी एकत्र कर सकते हैंं, जैसे आपका नाम, आयु, फोन नंबर, और अन्य जानकारी जो आप प्रदान करते हैंं जब आप हमारी सेवाओं के लिए साइन अप करते हैंं या हमारे साथ संवाद करते हैंं।',
    subtitle2:
      'Health Information: To provide mental health support, the app may collect and process sensitive health-related information that you choose to share, such as mood tracking, thoughts, and feelings. This information is stored securely and treated with the utmost confidentiality.',
    hindi_sub2:
      'स्वास्थ्य संबंधी जानकारी: मानसिक स्वास्थ्य सहायता प्रदान करने के लिए, ऐप संवेदनशील स्वास्थ्य संबंधी जानकारी एकत्र और संसाधित कर सकता हैं जिसे आप साझा करना चुनते हैंं, जैसे मूड ट्रैकिंग, विचार और भावनाएं। यह जानकारी सुरक्षित रूप से संग्रहीत की जाती हैं और अत्यंत गोपनीयता के साथ व्यवहार की जाती हैं।',
    subtitle3: '',
  },
  {
    id: 3,
    description: '',
    title: 'How We Use Your Information',
    hindititle: 'हम आपकी जानकारी का उपयोग कैसे करते हैंं',
    subtitle1:
      'Provide Services: We use your information to provide and personalize our mental health services, including tracking and analyzing mood patterns.',
    hindi_sub1:
      'सेवाएं  प्रदान करें: हम आपकी जानकारी का उपयोग हमारी मानसिक स्वास्थ्य सेवाओं को प्रदान करने और वैयक्तिकृत करने के लिए करते हैंं, जिसमें मूड पैटर्न पर नज़र रखना और विश्लेषण करना शामिल हैं। ',
    subtitle2:
      'Communications: We may use your phone number to call you back if you have opted our call back services.',
    hindi_sub2:
      'संचार: यदि आपने हमारी कॉल बैक सेवाओं का विकल्प चुना हैं तो हम आपको वापस कॉल करने के लिए आपके फ़ोन नंबर का उपयोग कर सकते हैंं। ',
    hindi_sub3:
      'अनुसंधान और विश्लेषण: हम अपनी सेवाओं को बेहतर बनाने और मानसिक स्वास्थ्य की समझ में योगदान करने के लिए अनुसंधान और विश्लेषण उद्देश्यों के लिए डेटा को अज्ञात और एकत्रित कर सकते हैंं।',
    subtitle3:
      'Research and Analytics: We may anonymize and aggregate data for research and analytics purposes to improve our services and contribute to the understanding of mental health.',
  },
  {
    id: 4,
    description: '',
    title: 'Data Sharing',
    hindititle: 'डेटा शेयरिंग',
    subtitle1:
      'Third-Party Service Providers: We may share your information with third-party service providers who assist us in delivering our services (e.g., hosting, analytics). These providers are bound by confidentiality obligations.',
    hindi_sub1:
      'तृतीय-पक्ष सेवा प्रदाता: हम आपकी जानकारी को तृतीय-पक्ष सेवा प्रदाताओं के साथ साझा कर सकते हैंं जो हमारी सेवाएं प्रदान करने में हमारी सहायता करते हैंं (जैसे, होस्टिंग, एनालिटिक्स)। ये प्रदाता गोपनीयता दायित्वों से बंधे हैंं।',
    subtitle2:
      'Legal Compliance: We may disclose your information to comply with applicable laws, regulations, or legal processes.',
    hindi_sub2:
      'कानूनी अनुपालन: हम लागू कानूनों, विनियमों या कानूनी प्रक्रियाओं का पालन करने के लिए आपकी जानकारी का खुलासा कर सकते हैंं।',
    subtitle3: '',
  },
  {
    id: 5,
    description:
      'We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is 100% secure.',
    title: 'Data Security',
    hindi_des:
      'हम आपकी जानकारी को अनधिकृत पहुंच, प्रकटीकरण, परिवर्तन और विनाश से बचाने के लिए उचित उपाय करते हैंं। हालांकि, इंटरनेट या इलेक्ट्रॉनिक स्टोरेज पर ट्रांसमिशन की कोई भी विधि 100% सुरक्षित नहीं हैं।',
    hindititle: 'डेटा सुरक्षा',
    subtitle1: '',
    subtitle2: '',
    subtitle3: '',
  },
  {
    id: 6,
    description:
      'You can control the information you provide to us and the communications you receive. You may update your preferences.',
    title: 'Your Choices',
    hindi_des:
      'आप हमें प्रदान की जाने वाली जानकारी और आपको प्राप्त होने वाले संचार को नियंत्रित कर सकते हैंं। आप अपनी प्राथमिकताओं को अपडेट कर सकते हैंं।',
    hindititle: 'आपकी पसंद',
    subtitle1: '',
    subtitle2: '',
    subtitle3: '',
  },
  {
    id: 7,
    description:
      'Our services are intended for adults above 18 years and children below 18 years. We will be collecting and using the information for analysis purpose.',
    title: "Children's Privacy",
    hindi_des:
      'हमारी सेवाएं 18 वर्ष से अधिक उम्र के वयस्कों और 18 वर्ष से कम उम्र के बच्चों के लिए हैंं। हम विश्लेषण उद्देश्य के लिए जानकारी एकत्र और उपयोग करेंगे।',
    hindititle: 'बच्चों की गोपनीयता ',
    subtitle1: '',
    subtitle2: '',
    subtitle3: '',
  },
  {
    id: 8,
    description:
      'We may update this Privacy Policy to reflect changes in our practices. We will notify you of any material changes through the app or other means.',
    title: 'Changes to This Privacy Policy',
    hindi_des:
      'हम अपनी प्रथाओं में परिवर्तन को दर्शाने के लिए इस गोपनीयता नीति को अपडेट कर सकते हैंं। हम आपको ऐप या अन्य माध्यमों से किसी भी भौतिक परिवर्तन के बारे में सूचित करेंगे।',
    hindititle: 'इस गोपनीयता नीति में परिवर्तन ',
    subtitle1: '',
    subtitle2: '',
    subtitle3: '',
  },
];
