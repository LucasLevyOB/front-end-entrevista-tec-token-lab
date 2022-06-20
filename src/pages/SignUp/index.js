import { Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react';

import FormUser from '../../components/FormUser';

const SignUp = () => {
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
        <FormUser isSignUp={true} />
      </Stack>
    </Flex>
  );
};

export default SignUp;
