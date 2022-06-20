import * as Yup from 'yup';

const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string()
    .email('Este campo deve conter um email válido.')
    .required('O email é obrigatório.'),
  password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

export default validationSchemaSignIn;
