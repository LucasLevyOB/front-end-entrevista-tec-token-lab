import * as Yup from 'yup';

const validationSchemaSignUp = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório.'),
  email: Yup.string()
    .email('Este campo deve conter um email válido.')
    .required('O email é obrigatório.'),
  password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas não conferem.'
  ),
});

export default validationSchemaSignUp;
