import {
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../../api/session';
import FormUser from '../../components/FormUser';

const SignIn = () => {
  const toast = useToast();
  const navigate = useNavigate();

  async function submit(data) {
    try {
      const response = await createSession(data);
      if (response.status === 201) {
        localStorage.setItem('usr_id', response.data.usr_id);
        localStorage.setItem('usr_name', response.data.usr_name);
        localStorage.setItem('usr_email', response.data.usr_email);
        navigate('/');
        return true;
      }
      return false;
    } catch (error) {
      toast({
        title: 'Conta não entrada.',
        description: 'Email e/ou senha incorretos.',
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
          <Heading fontSize={'4xl'}>Faça login em sua conta!</Heading>
        </Stack>
        <FormUser isSignUp={false} submitAction={submit} />
      </Stack>
    </Flex>
  );
};

export default SignIn;
