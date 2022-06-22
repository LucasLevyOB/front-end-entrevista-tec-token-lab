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
      description: '',
      dateBegin: '',
      dateEnd: '',
    },
  });

  const onSubmit = data => {
    console.log(data);
    handleCancel();
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
      setValue('description', event.description);
      setValue('dateBegin', moment(event.dateBegin).format('YYYY-MM-DDTHH:mm'));
      setValue('dateEnd', moment(event.dateEnd).format('YYYY-MM-DDTHH:mm'));
    } else {
      setValue('dateBegin', moment(date + 'T00:00').format('YYYY-MM-DDTHH:mm'));
      setValue('dateEnd', moment(date + 'T23:59').format('YYYY-MM-DDTHH:mm'));
    }
  }, [event]);

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
        id="dateBegin"
        label="Início"
        registerName="dateBegin"
        register={register}
        errors={errors?.dateBegin}
        control={control}
        type="datetime-local"
        min={moment(date + 'T00:00').format('YYYY-MM-DDTHH:mm')}
        max={moment(date + 'T23:59').format('YYYY-MM-DDTHH:mm')}
        placeholder="Início"
        isReadOnly={isReadOnly}
      />
      <FormControlInput
        id="dateEnd"
        label="Término"
        registerName="dateEnd"
        register={register}
        errors={errors?.dateEnd}
        control={control}
        type="datetime-local"
        placeholder="Término"
        min={moment(date + 'T00:00').format('YYYY-MM-DDTHH:mm')}
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
