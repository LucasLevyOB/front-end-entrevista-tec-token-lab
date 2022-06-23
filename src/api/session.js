import httpClient from './httpClient';

const END_POINT = '/sessions';

async function createSession(data) {
  const response = await httpClient.post(END_POINT, data);
  return response;
}

export { createSession };
