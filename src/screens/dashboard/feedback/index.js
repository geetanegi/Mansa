import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import st from '../../../global/styles';
import {useTranslation} from 'react-i18next';
import Input from '../../../components/input';
import {colors, images} from '../../../global/theme';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import Button from '../../../components/button';
import PopUpMessage from '../../../components/thanksPopup';
import {getApi, postApi} from '../../../utils/apicalls';
import {API} from '../../../utils/endpoints';
import {handleAPIErrorResponse} from '../../../utils/helperfunctions/validations';
import Loader from '../../../components/loader';
import {
  ValidateMail,
  ValueEmpty,
} from '../../../utils/helperfunctions/validations';
import {View} from 'react-native-animatable';

const INITIALINPUT = {
  name: '',
  email: '',
  comments: '',
};

const Feedback = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const lang = i18n.language;
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);
  const [starRating, setStarRating] = useState(null);
  const [starRatingErr, setStarRatingErr] = useState(null);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
    navigation.goBack();
  };

  const validation = () => {
    Keyboard.dismiss();
    const validEmail = ValidateMail(inputs?.email);
    const emptyEmail = ValueEmpty(inputs?.email);
    const emptyName = ValueEmpty(inputs?.name);
    const emptyComment = ValueEmpty(inputs?.comments);

    let isValid = true;

    if (starRating) {
      setStarRatingErr('');
    } else {
      isValid = false;
      setStarRatingErr(t('Required'));
    }

    if (isValid) {
      feedback_handle();
    }
  };

  const feedback_handle = async () => {
    var todayDate = new Date().toISOString().slice(0, 10);
    const url = API.POST_FEEDBACK;

    const params = {
      name: inputs.name,
      rating: starRating,
      suggestion: inputs.comments,
      email: inputs.email,
      submitdate: todayDate,
    };

    try {
      setIsLoading(true);
      const result = await postApi(url, params);
      if (result?.status == 200) {
        const data = result.data;

        setTitle(lang == 'hi' ? 'बहुमूल्य प्रतिक्रिया के लिए धन्यवाद' :data);
        setPopupMessageVisibility(true);
        setIsLoading(false);
        setInputs(INITIALINPUT);
        setStarRating(null);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      handleAPIErrorResponse(e);
    }
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
        twoButton={false}
      />
    );
  };

  return (
    <View style={st.flex}>
      <AuthHeader
        title={t('Feedback')}
        onBack={() => navigation.navigate('Main')}
        gotohome={() => navigation.navigate('Main')}
      />
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={st.pd10} animation={'fadeInRight'} delay={500}>
          <View>
            <Input
              placeholder={t('EnterName')}
              onChangeText={text => handleOnchange(text, 'name')}
              onFocus={() => handleError(null, 'name')}
              error={errors?.name}
              iconName={images.user}
              label={t('Name')}
              labelColor={colors.black}
              inputsty={st.inputsty}
              value={inputs.name}
            />
          </View>

          <View>
            <Input
              placeholder={t('ENTEREmail')}
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              error={errors?.email}
              iconName={images.mail}
              label={t('email')}
              labelColor={colors.black}
              inputsty={st.inputsty}
              value={inputs.email}
            />
          </View>

          <View style={st.mt_v}>
            <Text
              style={[st.tx16, {color: colors.black, paddingHorizontal: 10}]}>
              {t('scaling')}
            </Text>
            <View style={[st.row, st.mt_t10, {paddingHorizontal: 10}]}>
              <TouchableOpacity
                onPress={() => {
                  setStarRating(1);
                  setStarRatingErr('');
                }}>
                <MaterialIcons
                  name={starRating >= 1 ? 'star' : 'staro'}
                  size={32}
                  style={[
                    st.mr_10,
                    starRating >= 1
                      ? styles.starSelected
                      : styles.starUnselected,
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setStarRating(2);
                  setStarRatingErr('');
                }}>
                <MaterialIcons
                  name={starRating >= 2 ? 'star' : 'staro'}
                  size={32}
                  style={[
                    st.mr_10,
                    starRating >= 2
                      ? styles.starSelected
                      : styles.starUnselected,
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setStarRating(3);
                  setStarRatingErr('');
                }}>
                <MaterialIcons
                  name={starRating >= 3 ? 'star' : 'staro'}
                  size={32}
                  style={[
                    st.mr_10,
                    starRating >= 3
                      ? styles.starSelected
                      : styles.starUnselected,
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setStarRating(4);
                  setStarRatingErr('');
                }}>
                <MaterialIcons
                  name={starRating >= 4 ? 'star' : 'staro'}
                  size={32}
                  style={[
                    st.mr_10,
                    starRating >= 4
                      ? styles.starSelected
                      : styles.starUnselected,
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setStarRating(5);
                  setStarRatingErr('');
                }}>
                <MaterialIcons
                  name={starRating >= 5 ? 'star' : 'staro'}
                  size={32}
                  style={[
                    st.mr_10,
                    starRating >= 5
                      ? styles.starSelected
                      : styles.starUnselected,
                  ]}
                />
              </TouchableOpacity>
            </View>
            {starRatingErr && <Text style={st.error}>{starRatingErr}</Text>}
          </View>

          <View style={[st.mt_t10]}>
            <TextInput
              multiline
              numberOfLines={5}
              onChangeText={text => handleOnchange(text, 'comments')}
              onFocus={() => handleError(null, 'comments')}
              value={inputs.comments}
              placeholder={t('Add your comments...')}
              style={[
                st.inputsty,
                {
                  height: 100, // <- set the max height here
                  borderRadius: 10,
                  padding: 10,
                },
              ]}
            />

            {errors?.comments && (
              <Text style={st.error}>{errors?.comments}</Text>
            )}
          </View>
        </View>

        <View style={st.pd20} animation={'fadeInRight'} delay={1000}>
          <Button
            title={t('SUBMIT')}
            backgroundColor={colors.lightBlue}
            color={colors.white}
            onPress={() => {
              validation();
            }}
          />
          <Button
            title={t('Cancel')}
            backgroundColor={colors.lightBlue}
            color={colors.white}
            onPress={() => {
              setInputs(INITIALINPUT);
              setStarRating(null);
            }}
          />
        </View>
      </ScrollView>
      {show_alert_msg()}
      {isLoading && <Loader />}
      <Footer />
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
});
