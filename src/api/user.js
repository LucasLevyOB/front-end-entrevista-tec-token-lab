import httpClient from './httpClient';

const END_POINT = '/users';

async function createUser(data) {
  const response = await httpClient.post(END_POINT, { ...data });
  return response;
}

export { createUser };
