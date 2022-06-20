import { Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react';
import FormUser from '../../components/FormUser';

const SignIn = () => {
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
        <FormUser isSignUp={false} />
      </Stack>
    </Flex>
  );
};

export default SignIn;
