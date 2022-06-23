import { useEffect } from 'react';

import moment from 'moment';

import { Box, Button, ButtonGroup } from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import FormControlInput from '../FormControlInput';
import validationSchema from './validationSchema';

const FormEvent = ({
  event = null,
  isReadOnly = false,
  handleIsReadOnly = null,
  onCancel = null,
  isEditing = false,
  date,
  submitAction,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: 'Sem Título',
      description: 'Sem Descrição',
      fullDateBegin: '',
      fullDateEnd: '',
    },
  });

  const onSubmit = async data => {
    const success = await submitAction(data);
    if (isEditing && success) {
      handleCancel();
    } else if (isEditing && !success) {
      setValue('title', event.eve_title);
      setValue('description', event.eve_description);
      setValue(
        'fullDateBegin',
        moment(event.eve_date_begin + 'T' + event.eve_time_begin).format(
          'YYYY-MM-DDTHH:mm'
        )
      );
      setValue(
        'fullDateEnd',
        moment(event.eve_date_end + 'T' + event.eve_time_end).format(
          'YYYY-MM-DDTHH:mm'
        )
      );
    }
  };

  function handleCancel() {
    if (handleIsReadOnly) {
      handleIsReadOnly();
    }
    if (onCancel) {
      onCancel();
    }
  }

  useEffect(() => {
    if (event) {
      setValue('title', event.eve_title);
      setValue('description', event.eve_description);
      setValue(
        'fullDateBegin',
        moment(event.eve_date_begin + 'T' + event.eve_time_begin).format(
          'YYYY-MM-DDTHH:mm'
        )
      );
      setValue(
        'fullDateEnd',
        moment(event.eve_date_end + 'T' + event.eve_time_end).format(
          'YYYY-MM-DDTHH:mm'
        )
      );
    } else {
      setValue(
        'fullDateBegin',
        moment(date + 'T00:00').format('YYYY-MM-DDTHH:mm')
      );
      setValue(
        'fullDateEnd',
        moment(date + 'T23:59').format('YYYY-MM-DDTHH:mm')
      );
    }
  }, [event]);

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControlInput
        id="title"
        label="Título do evento"
        registerName="title"
        register={register}
        errors={errors?.title}
        control={control}
        type="text"
        placeholder="Título do evento"
        isReadOnly={isReadOnly}
      />
      <FormControlInput
        id="description"
        label="Descrição do evento"
        registerName="description"
        register={register}
        errors={errors?.description}
        control={control}
        type="text"
        placeholder="Descrição do evento"
        isReadOnly={isReadOnly}
      />
      <FormControlInput
        id="fullDateBegin"
        label="Início"
        registerName="fullDateBegin"
        register={register}
        errors={errors?.fullDateBegin}
        control={control}
        type="datetime-local"
        // min={moment(date + 'T00:00').format('YYYY-MM-DDTHH:mm')}
        // max={moment(date + 'T23:59').format('YYYY-MM-DDTHH:mm')}
        placeholder="Início"
        isReadOnly={isReadOnly}
      />
      <FormControlInput
        id="fullDateEnd"
        label="Término"
        registerName="fullDateEnd"
        register={register}
        errors={errors?.fullDateEnd}
        control={control}
        type="datetime-local"
        placeholder="Término"
        // min={moment(date + 'T00:00').format('YYYY-MM-DDTHH:mm')}
        isReadOnly={isReadOnly}
      />
      <Box w="full" display="flex" justifyContent="end">
        {!isReadOnly && (
          <ButtonGroup size="sm" mt="4">
            <Button variant="outline" colorScheme="red" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="blue">
              {isEditing ? 'Atualizar' : 'Salvar'}
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Box>
  );
};

export default FormEvent;
