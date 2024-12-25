export const ValueEmpty = value => {
  if (value?.trim()) {
    return false;
  }
  return true;
};

export const ValidateMobile = (mobile, t) => {
  const reg = /^[6-9]\d{9}$/;

  if (ValueEmpty(mobile)) {
    return t('Please fill your mobile number');
  } else if (!reg.test(mobile)) {
    return t('Invalid mobile number');
  } else if (mobile.length < 10) {
    return t('Please enter 10 digit mobile number');
  } else return 'success';
};

export const ValidateName = (name, t) => {
  const regex = /^[\u0900-\u097F A-Za-z]+$/;

  if (ValueEmpty(name)) {
    return t('Required');
  } else if (!regex.test(name)) {
    return t('validName');
  } else return 'success';
};

export const specialCharactorRemove = (value, t) => {
  const reg = /^[\u0900-\u097F A-Za-z0-9\s]+$/;
  if (!reg.test(value)) {
    return t('SpecialCharacters');
  } else return 'success';
};

export const validateAge = (input, t) => {
  const isValid = /^[0-9]+$/.test(input);

  if (!isValid) {
    return t('SpecialCharacters');
  } else return 'success';
};

export const ValidateMail = email => {
  // if (ValueEmpty(email)) {
  //   return 'Please provide valid email';
  // }
  const emailPattern =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email)) {
    return 'Please provide valid email';
  }
  return 'success';
};

export const ValidatePassword = password => {
  var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  if (ValueEmpty(password)) {
    return 'Please provide a password to keep your account secure';
  } else if (password.length < 8 || password.length > 16) {
    return 'Password should be 8-16 characters long';
  } else if (!reg.test(password)) {
    return 'Password should be alphanumeric & it contain atleast one special character';
  }

  return 'success';
};

export const ifEmail = str => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(str);
};

export const handleAPIErrorResponse = (response, caller) => {
  const {status, problem, data} = response;

  if (status === 200) {
    return;
  }

  if (status === 404) {
    throw `error in ${caller}: NOT FOUND`;
  }

  if (status === 500) {
    throw `error in ${caller}: SERVER ERROR`;
  }

  if (problem === 'CLIENT_ERROR') {
    throw `error in ${caller}: CLIENT_ERROR`;
  }
};

export const dateFormet = () => {
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

export const reportDateFormet = d => {
  (month = '' + (d.getMonth() + 1)),
    (day = '' + d.getDate()),
    (year = d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};
