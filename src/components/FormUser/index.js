import { Box, Button, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '../Link';

import validationSchemaSignUp from './validationSchemaSignUp';
import validationSchemaSignIn from './validationSchemaSignIn';
import FormControlInput from '../FormControlInput';

const defaultValueSignUp = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const defaultValueSignIn = {
  email: '',
  password: '',
};

const FormUser = ({ isSignUp, submitAction }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      isSignUp ? validationSchemaSignUp : validationSchemaSignIn
    ),
    defaultValues: isSignUp ? defaultValueSignUp : defaultValueSignIn,
  });

  const onSubmit = async data => {
    const success = await submitAction(data);
    if (success) reset();
  };

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <Stack as="form" spacing={5} onSubmit={handleSubmit(onSubmit)}>
        {isSignUp && (
          <FormControlInput
            id="name"
            label="Nome"
            registerName="name"
            register={register}
            errors={errors?.name}
            control={control}
            type="text"
            placeholder="João da Silva"
          />
        )}
        <FormControlInput
          id="email"
          label="Email"
          registerName="email"
          register={register}
          errors={errors?.email}
          control={control}
          type="text"
          placeholder="joao@gmail.com"
        />
        <FormControlInput
          id="password"
          label="Senha"
          registerName="password"
          register={register}
          errors={errors?.password}
          control={control}
          type="password"
        />
        {isSignUp && (
          <FormControlInput
            id="confirmPassword"
            label="Confirmar senha"
            registerName="confirmPassword"
            register={register}
            errors={errors?.confirmPassword}
            control={control}
            type="password"
          />
        )}
        <Button
          type="submit"
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
          {isSignUp ? 'Cadastrar' : 'Entrar'}
        </Button>
      </Stack>
      <Text fontSize={'lg'} textAlign="center" color={'gray.600'} mt="10">
        {isSignUp ? 'Já' : 'Não'} possui uma conta?{' '}
        <Link to={isSignUp ? '/signin' : '/signup'} color={'blue.400'}>
          Clique aqui
        </Link>
      </Text>
    </Box>
  );
};

export default FormUser;
