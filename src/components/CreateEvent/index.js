import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import moment from 'moment';
import { createEvent } from '../../api/events';
import FormEvent from '../FormEvent';

const CreateEvent = ({
  isOpen,
  onClose,
  date,
  daysHaveEvents,
  setDaysHaveEvents,
}) => {
  const datePtBr = moment(date).format('dddd, DD [de] MMMM [de] YYYY');
  const userId = localStorage.getItem('usr_id');
  const toast = useToast();

  function formatTitleEvents(events) {
    const conflitingEvents = events.reduce((_, curr) => {
      return `${curr.eve_title},`;
    }, '').replace(/,$/, '.');
    return conflitingEvents;
  }

  function updateDaysHaveEvents() {
    console.log(
      daysHaveEvents[date]?.counter ? daysHaveEvents[date].counter + 1 : 1
    );
    setDaysHaveEvents({
      ...daysHaveEvents,
      [date]: {
        has: true,
        counter: daysHaveEvents[date]?.counter
          ? daysHaveEvents[date].counter + 1
          : 1,
      },
    });
  }

  async function submit(data) {
    try {
      const response = await createEvent(userId, data);
      if (response.status === 201) {
        updateDaysHaveEvents();
        toast({
          title: 'Evento criado com sucesso.',
          description: 'O evento foi criado com sucesso.',
          status: 'success',
          duration: 3000,
          variant: 'solid',
          position: 'bottom-right',
          isClosable: true,
        });
        onClose();
        return false;
      }
      if (response.status === 409) {
        const conflitingEvents = formatTitleEvents(response.data);
        toast({
          title: 'Conflito de eventos.',
          description:
          `Não foi possível criar o evento, pois ele conflita com o(s) seguinte(s) evento(s): ${conflitingEvents}`,
          status: 'success',
          duration: 5000,
          variant: 'solid',
          position: 'bottom-right',
          isClosable: true,
        });
        return false;
      }
      return false;
    } catch (error) {
      
      if (error.response.status === 409) {
        const conflitingEvents = formatTitleEvents(error.response.data);
        toast({
          title: 'Conflito de eventos.',
          description:
            `Não foi possível criar o evento, pois ele conflita com o(s) seguinte(s) evento(s): ${conflitingEvents}`,
          status: 'error',
          duration: 5000,
          variant: 'solid',
          position: 'bottom-right',
          isClosable: true,
        });
        return false;
      }
      toast({
        title: 'Erro ao criar o evento.',
        description:
          'Ocorreu um erro ao criar o evento, tente novamente mais tarde.',
        status: 'error',
        duration: 3000,
        variant: 'solid',
        position: 'bottom-right',
        isClosable: true,
      });
      return false;
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Evento para {datePtBr}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormEvent
            date={date}
            isReadOnly={false}
            onCancel={onClose}
            submitAction={submit}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateEvent;
