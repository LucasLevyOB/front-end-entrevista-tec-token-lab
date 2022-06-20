import moment from 'moment';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  description: Yup.string().required('A descrição é obrigatória.'),
  dateBegin: Yup.string().required('A data de início é obrigatória.'),
  // check if the time in the end is after the time in the begin
  dateEnd: Yup.string()
    .required('A data de fim é obrigatória.')
    .test(
      'after-timeBegin',
      'A data de fim deve ser posterior à data de início.',
      function (value) {
        const dateBegin = moment(this.parent.dateBegin);
        const dateEnd = moment(value);
        return dateEnd.isAfter(dateBegin);
      }
    ),
});

export default validationSchema;
