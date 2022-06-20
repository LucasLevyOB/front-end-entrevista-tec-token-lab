import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const FormControlInput = ({
  id,
  label,
  registerName,
  register,
  errors,
  control,
  defaultValue = '',
  ...props
}) => {
  return (
    <FormControl id={id}>
      <FormLabel>{label}</FormLabel>
      <Controller
        render={({ field }) => (
          <Input
            {...field}
            {...register(registerName)}
            isInvalid={errors ? true : false}
            errorBorderColor="red.300"
            {...props}
          />
        )}
        control={control}
        id={id}
        name={id}
      />
      <Text color="red.300" fontSize="sm" mt="2">
        {errors?.message}
      </Text>
    </FormControl>
  );
};

FormControlInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  registerName: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  control: PropTypes.object,
  props: PropTypes.object,
};

export default FormControlInput;
