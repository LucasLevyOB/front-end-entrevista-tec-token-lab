import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import { createUser } from '../../api/user';

import FormUser from '../../components/FormUser';

const SignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();

  async function submit(data) {
    try {
      const { confirmPassword, ...dataFields } = data;
      const response = await createUser(dataFields);
      if (response.status === 201) {
        toast({
          title: 'Conta criada com sucesso.',
          description:
            'Sua conta foi criada com sucesso, agora é só fazer o login e aproveitar o app',
          status: 'success',
          duration: 3000,
          variant: 'solid',
          position: 'bottom-right',
          isClosable: true,
        });
        navigate('/signin');
        return true;
      }
      return false;
    } catch (error) {
      toast({
        title: 'Erro ao criar conta',
        description:
          'Ocorreu um erro ao criar sua conta, tente novamente mais tarde.',
        status: 'error',
        duration: 3000,
        variant: 'solid',
        position: 'bottom-right',
        isClosable: true,
      });
      console.log(error);
      return false;
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Crie uma conta grátis!</Heading>
        </Stack>
        <FormUser isSignUp={true} submitAction={submit} />
      </Stack>
    </Flex>
  );
};

export default SignUp;
