import httpClient from './httpClient';

const END_POINT = '/events';

async function getEventsByUserId(userId, date) {
  const response = await httpClient.get(END_POINT + '/' + userId + '/' + date);

  return response;
}

async function getDaysHaveEvents(userId) {
  const response = await httpClient.get(END_POINT + '/days/have/' + userId);

  return response;
}

async function updateEvent(eventId, data) {
  const response = await httpClient.put(END_POINT + '/' + eventId, data);

  return response;
}

async function createEvent(userId, data) {
  const response = await httpClient.post(END_POINT + '/' + userId, data);

  return response;
}

async function deleteEvent(eventId) {
  const response = await httpClient.delete(END_POINT + '/' + eventId);

  return response;
}

export {
  getEventsByUserId,
  updateEvent,
  createEvent,
  deleteEvent,
  getDaysHaveEvents,
};
