import * as Yup from 'yup';

const validations = Yup.object().shape({
  userName: Yup.string().required(),
  eMail: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')])
    .required(),
  information: Yup.bool(),
});

module.exports = validations;
