import {StyleSheet, Text, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import AuthHeader from '../../../components/Auth_Header';
import st from '../../../global/styles';
import {colors} from '../../../global/theme';
import Button from '../../../components/button';
import {useTranslation, I18n} from 'react-i18next';
import {View} from 'react-native-animatable';
import {images} from '../../../global/theme';
import Accordian from '../../../components/accordion/Accordian_des';

const ChildHighScoreDes = ({navigation, route}) => {
  const [data, setData] = useState(content);
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  const childDetails = route?.params?.childDetails

  const renderAccordians = () => {
    const items = [];
    for (item of data) {
      items.push(<Accordian data={item} lang={lang} />);
    }
    return items;
  };
  // console.log('hightscoredis', childDetails)
  return (
    <View style={st.flex}>
      <AuthHeader
        title={''}
        gotohome={() => navigation.navigate('Main')}
        onBack={() => navigation.goBack()}
        auth={true}
      />
      <ScrollView>
        <View style={st.pd20}>
          <View animation={'fadeInRight'}>{renderAccordians()}</View>
        </View>

        <View style={st.pd_H20}>
          <Text style={[st.tx14, st.pd10, {color: colors.black}]}>
            {t('high_child_des')}
          </Text>
        </View>

        <View
          style={[st.align_C, st.mt_B]}
          animation={'fadeInRight'}
          delay={500}>
          <Button
            title={t('Continue')}
            backgroundColor={colors.lightBlue}
            color={colors.white}
            onPress={() => navigation.navigate('ChildFurtherQues', {ageId: 10, childDetails:childDetails})}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChildHighScoreDes;

const content = [
  {
    description:
      'ID occurs when a person has difficulty with general mental abilities. This may impact:',
    hindiDes:
      'यह कोई बीमारी नहीं बल्कि एक स्थिति हैं । जब किसी व्यक्ति की सामान्य मानसिक क्षमताओं जैसे सीखने और समझने में कठिनाई होती हैं तथा शारीरिक और मानसिक विकास में धीमापन आता हैं तब यह स्थिति बौद्धिक निशक्तता कहलाती हैं । इसके निम्न  प्रभाव  हो सकते हैं:',
    question: 'A. What is Intellectual disability (ID)?',
    hindiques: 'A. बौद्धिक निशक्तता  (ID) क्या हैं?',
    imgUrl: images.int_dis,
    options: [
      {
        title: 'Intellectual functioning,',
        hindititle: 'बौद्धिक कार्यप्रणाली,',
        option:
          'such as their learning, judgment, problem solving, abstract thinking, memory, reasoning, and academic skills.',
        hindioption:
          'जैसे कि सीखने, निर्णय लेने, समस्या को सुलझाने, अमूर्त सोच, स्मृति, तर्क, और शैक्षिक कौशल की क्षमताओं में समस्या ।',
      },
      {
        title: 'Practical functioning,',
        hindititle: 'व्यावहारिक कार्यप्रणाली,',
        option:
          'refers to the ability to function and take care of oneself independently, such as performing personal care tasks, managing money, and performing work, school, or home tasks.',
        hindioption:
          'जो कि स्वतंत्र रूप से स्वयं की देखभाल और कार्य करने की क्षमता को संदर्भित करता हैं, जैसे कि व्यक्तिगत देखभाल के कार्यों को करना, पैसे का प्रबंधन करना, और काम/व्यवसाय, स्कूल, या घर के कार्यों को उचित ढंग से करना, इत्यादि में समस्याएं आना ।',
      },
      {
        title: 'Social functioning,',
        hindititle: 'सामाजिक कार्यप्रणाली,',
        option:
          'which refers to the ability to function normally in society by using skills such as social judgment, communication, understanding and following social rules and cues, understanding the consequences of one’s actions, and making friends.',
        hindioption:
          'जो सामाजिक निर्णय, संचार, सामाजिक नियमों और संकेतों को समझने और पालन करने, अपने कार्यों के परिणामों को समझने, और दोस्त बनाने जैसे कौशलों का उपयोग करके समाज में सामान्य रूप से कार्य करने की क्षमता को निर्धारित करता हैं इनमें भी समस्या उत्पन्न होती हैं ।',
      },
    ],
  },

  {
    description:
      'ADHD is marked by an ongoing pattern of inattention and/or hyperactivity-impulsivity that interferes with functioning or development. People with ADHD experience an ongoing pattern of the following types of symptoms:',
    hindiDes:
      'यह समस्या ध्यान की कमी और अतिसक्रियता-आवेगपूर्णता के निरंतर रूप से पाए जाने के रूप में दिखाई देती हैं जो बच्चे के कार्य करने के तरीक़ों और  विकास में बाधा बनती हैं । ADHD वाले लोग निम्न प्रकार के लक्षणों को निरंतर रूप से अनुभव करते हैंं:',
    question: 'B. What is Attention-deficit/hyperactivity disorder (ADHD)?',
    hindiques: 'B. ध्यान अभाव/अतिसक्रियता विकार (ADHD) क्या हैं?',
    imgUrl: images.adhd,
    options: [
      {
        title: 'Inattention',
        hindititle: 'ध्यान की कमी-',
        option:
          'means a person may have difficulty staying on task, sustaining focus, and staying organized, and these problems are not due to defiance or lack of comprehension.',
        hindioption:
          'इसका मतलब हैं कि एक बच्चे को कार्य करते रहने, ध्यान केंद्रित रखने, और व्यवस्थित रहने में कठिनाई हो सकती हैं, लेकिन ये समस्याएँ अनुशासनहीनता या समझ की कमी के कारण नहीं होती हैंं ।',
      },
      {
        title: 'Hyperactivity,',
        hindititle: 'अतिसक्रियता-',
        option:
          'means a person may seem to move about constantly, including in situations when it is not appropriate, or excessively fidgets, taps, or talks. In adults, hyperactivity may mean extreme restlessness or talking too much.',
        hindioption:
          'इसका मतलब हैं कि एक बच्चा लगातार और बिना आवश्यकता के बहुत गतिशील रहे या हिलता रहे , जबकि ऐसा करना बिलकुल भी उचित नहीं हो, या बच्चा अत्यधिक उंगली चटकाने, टैप करने, या बात करने में लगा रहता हैं। वयस्कों में, अतिसक्रियता का मतलब हो सकता हैं अत्यधिक बेचैनी या बहुत अधिक बोलना ।',
      },
      {
        title: 'Impulsivity,',
        hindititle: 'आवेगपूर्णता-',
        option:
          'means a person may act without thinking or have difficulty with self-control. Impulsivity could also include a desire for immediate rewards or the inability to delay gratification. An impulsive person may interrupt others or make important decisions without considering long-term consequences.',
        hindioption:
          'इसका मतलब हैं कि एक बच्चा बिना परिणाम सोचे अचानक कुछ कार्य कर बैठे या उसे आत्म-नियंत्रण में कठिनाई हो । आवेगपूर्णता में तत्काल परिणाम पाने की इच्छा या सुख की भावना को टालने में  अक्षमता भी शामिल हो सकती हैं। एक आवेगपूर्ण बच्चा दूसरों को बाधित कर सकता हैं या दीर्घकालिक परिणामों का आकलन किए बिना महत्वपूर्ण निर्णय ले सकता हैं ।',
      },
    ],
  },

  {
    description:
      'ASD is a neurological and developmental disorder that affects how people interact with others, communicate, learn, and behave. Although autism can be diagnosed at any age, it is described as a “developmental disorder” because symptoms generally appear in the first two years of life. People with ASD often have:',
    hindiDes:
      'यह एक तंत्रिका सम्बन्धी विकासात्मक विकार हैं इससे प्रभावित लोग अन्य लोगों के साथ सामाजिक सम्बन्ध स्थापित करने, संवाद करने, सीखने, और व्यवहार करने के तौर तरीकों को नहीं समझ पाते हैंं । हालांकि ऑटिज्म किसी भी उम्र में मिल सकता हैं, इसे "विकासात्मक विकार" के रूप में वर्णित किया जाता हैं क्योंकि इसके लक्षण आमतौर पर जीवन के पहले दो वर्षों में प्रकट होते हैंं । ASD वाले बच्चों में अक्सर यह देखा जाता हैं:',
    question: 'C. What is autism spectrum disorder (ASD) ?',
    hindiques: 'C. स्वपरायणता अथवा ऑटिज्म स्पेक्ट्रम डिसऑर्डर (ASD) क्या हैं?',
    imgUrl: images.asd,
    options: [
      {
        title: '',
        option:
          'Difficulty with communication and interaction with other people.',
        hindioption: 'अन्य लोगों के साथ संचार और बातचीत में कठिनाई |',
      },
      {
        title: '',
        option: 'Restricted interests and repetitive behaviors.',
        hindioption: 'सीमित रुचियाँ और दोहराव वाले व्यवहार |',
      },
      {
        title: '',
        option:
          'Symptoms that affect their ability to function in school, work, and other areas of life.',
        hindioption:
          'ऐसे लक्षण जो उनके स्कूल, काम, और जीवन के अन्य क्षेत्रों में कार्य करने की क्षमता को प्रभावित करते हैंं ।',
      },
    ],
  },

  {
    description:
      'SLDs are defined as “heterogeneous group of conditions wherein there is a deficit in processing language, spoken or written, that may manifest itself as a difficulty to comprehend, speak, read, write, spell, or to do mathematical calculations and includes such conditions as perceptual disabilities, dyslexia, dysgraphia, dyscalculia, dyspraxia and developmental aphasia".',
    hindiDes:
      'इनको समस्याओं को ऐसे विविध समूह के रूप में परिभाषित किया जाता हैं जिसमें भाषा और गणित को सीखने, सहज और सक्रिय रूप से उसका उपयोग कर पाने में कठिनाई होती हैं । इससे प्रभावित बच्चे, मौखिक या लिखित रूप से भाषा के कौशल में समस्या अनुभव करते हैंं । उन्हें समझने, बोलने, पढ़ने, लिखने, वर्तनी लगाने (शब्दों का क्रम से उच्चारण करना) में या गणितीय गणनाओं को करने की कठिनाई का अनुभव होता हैं । इसमें अवधारणात्मक निशक्तता , डिस्लेक्सिया, डिस्ग्राफिया, डिस्कैलकुलिया, डिस्प्रेक्सिया और विकासात्मक रूप से बोलने की प्रक्रिया की समस्या शामिल हैंं ।',
    question: 'D. What is Specific Learning Disabilities (SLD) ?',
    hindiques: 'विशिष्ट सीखने की अक्षमताएं (SLD) क्या हैंं?',
    imgUrl: images.learning,
  },
];
