import * as Yup from 'yup';

const validations = Yup.object().shape({
  eMailVerified: Yup.string()
    .required()
    .min(6),
});

module.exports = validations;
