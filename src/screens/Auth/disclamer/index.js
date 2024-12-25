import {Text, ScrollView} from 'react-native';
import React from 'react';
import st from '../../../global/styles';
import Button from '../../../components/button';
import Footer from '../../../components/footer';
import {View} from 'react-native-animatable';
import {useTranslation} from 'react-i18next';

const Disclamer = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <View style={st.container}>
      <View style={{marginTop: 40}}>
        <View animation={'fadeInRight'} delay={500} style={[st.align_C]}>
          <Text style={[st.tx20, st.txAlignC]}>{t('Disclaimer')}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={st.pd20}>
          <View animation={'fadeInRight'} delay={1000}>
            <Text style={[st.tx16, st.txAlignJ]}>
              {lang == 'hi' ? content_hindi : content}
            </Text>
          </View>
          <View animation={'fadeInRight'} delay={1200}>
            <Button
              title={t('I Accept')}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Disclamer;

let content =
  'This app is designed by National Health Mission (NHM) and Department of Health and Family Welfare, Government of Madhya Pradesh.\n\nThe content of this app is made for creating awareness about mental health problems.\n\nThe questions asked in this app will help in assessment of your mental health, it should not be used as a substitution for diagnostic/treatment/advise from a Mental Health expert.\n\nThe content of this app and NHM (Department of Health and family welfare, Government of Madhya Pradesh) in any event, is not liable for any loss or damage caused to any individual or property.\n\nThe personal information and results of screening tools will be kept confidential.\n\nThis app is not for any commercial purposes. The questionnaires presented in this app collected from open public domain and also reflect the views of editorial team based on the public health issues. Publication does not constitute endorsement by the app. Neither the app name nor its publisher nor anyone else involved in creating, producing or delivering the app name or the material contained therein, assumes any liability or responsibility for the accuracy, completeness, or usefulness of any information provided in the app, nor shall they be liable for any direct, indirect, incidental, special consequences or punitive damage arising out of the material contained in the app.';
let content_hindi =
  'यह ऐप राष्ट्रीय स्वास्थ्य मिशन (एन एच एम), लोक स्वास्थ्य और चिकित्सा शिक्षा विभाग, मध्य प्रदेश शासन द्वारा विकसित किया गया हैं।\n\nइस ऐप की विषयवस्तु मानसिक स्वास्थ्य समस्याओं के बारे में जागरूकता पैदा करने के लिए निर्मित की गई हैं।\n\nइस ऐप में पूछे गए प्रश्न आपके मानसिक स्वास्थ्य का आकलन करने में मदद करेंगे, इसका उपयोग मानसिक स्वास्थ्य विशेषज्ञ के द्वारा किये जाने वाले निदान/उपचार/सलाह के विकल्प के रूप में नहीं किया जाना चाहिए।\n\nइस ऐप की सामग्री और एनएचएम (लोक स्वास्थ्य और चिकित्सा शिक्षा विभाग, मध्य प्रदेश शासन) किसी भी स्थिति में, किसी भी व्यक्ति या संपत्ति को होने वाले किसी भी नुकसान या क्षति के लिए उत्तरदायी नहीं हैं।\n\nस्क्रीनिंग हेतु प्रदान की गई व्यक्तिगत जानकारी और परिणाम गोपनीय रखे जाएंगे।\n\nयह ऐप किसी व्यावसायिक उद्देश्य के लिए नहीं हैं। इस ऐप में प्रस्तुत प्रश्नावलियाँ  मुक्त सार्वजनिक स्रोतों से एकत्र की गई हैंं जो सार्वजनिक स्वास्थ्य मुद्दों पर आधारित संपादकीय टीम के विचारों को भी दर्शाती हैंं। इस सन्दर्भ में कोई भी प्रकाशन ऐप द्वारा समर्थित नहीं माना जाएगा । न तो ऐप का नाम, न ही इसके प्रकाशक, न ही ऐप या उसमें मौजूद सामग्री को बनाने, या वितरित करने में शामिल कोई अन्य, ऐप में प्रदान की गई किसी भी जानकारी की सटीकता, पूर्णता या उपयोगिता के लिए कोई दायित्व या जिम्मेदारी लेते हैंं , और  न ही वे आगे ऐसा करेंगे। ऐप में मौजूद सामग्री से उत्पन्न होने वाले किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक, विशेष परिणाम या दंडात्मक क्षति के लिए  भी वे उत्तरदायी नहीं होंगे ।';
