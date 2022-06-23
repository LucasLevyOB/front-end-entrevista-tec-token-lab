import moment from 'moment';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório.'),
  description: Yup.string().required('A descrição é obrigatória.'),
  fullDateBegin: Yup.string().required('A data de início é obrigatória.'),
  fullDateEnd: Yup.string()
    .required('A data de fim é obrigatória.')
    .test(
      'after-timeBegin',
      'A data de fim deve ser posterior à data de início.',
      function (value) {
        const fullDateBegin = moment(this.parent.fullDateBegin);
        const dateEnd = moment(value);
        return dateEnd.isAfter(fullDateBegin);
      }
    ),
});

export default validationSchema;
