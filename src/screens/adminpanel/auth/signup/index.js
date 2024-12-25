import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import st from '../../../../global/styles';
import Back from '../../../../components/back';
import {colors} from '../../../../global/theme';
import {useTranslation} from 'react-i18next';
import AdminInput from '../../../../components/adminInput';
import Button from '../../../../components/button';

const INITIALINPUT = {
  Designation:'',
  Institute:'',
  Email:'',
  mobile:'',
  Section:'',
  Password:'',
  ConfirmPassword : ''
};

const AdminSignUp = ({navigation}) => {
  const {t} = useTranslation();
  const [inputs, setInputs] = useState(INITIALINPUT);
  const [errors, setErrors] = useState(INITIALINPUT);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <View style={st.flex}>
      <ScrollView>
        <View style={st.pd20}>
          <View style={[st.row, st.justify_S, st.mt_t10]}>
            <Back
              onPress={() => navigation.navigate('AdminLogin')}
              iconColor={colors.black}
            />
            <Text style={[st.tx20, {color: colors.black}]}>Register</Text>
            <Text></Text>
          </View>

          <View>
            <View style={st.mt_t10}>
              <AdminInput
                placeholder={t('Designation')}
                onChangeText={text => handleOnchange(text, 'Designation')}
                onFocus={() => handleError(null, 'Designation')}
                error={errors?.Designation}
                iconName={'phone-call'}
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('Institute')}
                onChangeText={text => handleOnchange(text, 'Institute')}
                onFocus={() => handleError(null, 'Institute')}
                error={errors?.Institute}
                iconName={'phone-call'}
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('AdminEmail')}
                onChangeText={text => handleOnchange(text, 'Email')}
                onFocus={() => handleError(null, 'Email')}
                error={errors?.Email}
                iconName={'phone-call'}
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('MOBILE')}
                onChangeText={text => handleOnchange(text, 'mobile')}
                onFocus={() => handleError(null, 'mobile')}
                maxLength={10}
                error={errors?.mobile}
                iconName={'phone-call'}
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('Section')}
                onChangeText={text => handleOnchange(text, 'Section')}
                onFocus={() => handleError(null, 'Section')}
                error={errors?.Section}
                iconName={'phone-call'}
              />
            </View>

            <View>
              <AdminInput
                placeholder={'Password'}
                onChangeText={text => handleOnchange(text, 'password')}
                onFocus={() => handleError(null, 'password')}
                error={errors?.password}
                iconName={'lock'}
                password
              />
            </View>

            <View>
              <AdminInput
                placeholder={t('ConfirmPassword')}
                onChangeText={text => handleOnchange(text, 'ConfirmPassword')}
                onFocus={() => handleError(null, 'ConfirmPassword')}
                error={errors?.ConfirmPassword}
                iconName={'lock'}
                password
              />
            </View>

            <View style={[st.mt_B]}>
              <Button
                title={t('SignUp')}
                backgroundColor={colors.lightFrozy}
                color={colors.white}
                onPress={() => dispatch(setAdminLogin(true))}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminSignUp;

const styles = StyleSheet.create({});
