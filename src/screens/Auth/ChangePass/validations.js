import * as Yup from 'yup';

const validations = Yup.object().shape({
  eMail: Yup.string()
    .email()
    .required(),
});

module.exports = validations;
