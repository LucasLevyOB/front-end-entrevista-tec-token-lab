import { forwardRef, useRef, useState } from 'react';

import {
  ButtonGroup,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import EventTag from '../EventTag';
import FormEvent from '../FormEvent';
import { deleteEvent, updateEvent } from '../../api/events';

const EventPopover = forwardRef(({ event, handleEvents, date }, ref) => {
  const refTag = useRef(null);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const toast = useToast();

  function handleIsReadOnly() {
    setIsReadOnly(!isReadOnly);
  }

  function deleteEventFromArray() {
    handleEvents({ type: 'DELETE', payload: event.eve_id });
  }

  function formatTitleEvents(events) {
    const conflitingEvents = events.reduce((_, curr) => {
      return `${curr.eve_title},`;
    }, '').replace(/,$/, '.');
    return conflitingEvents;
  }

  function updateEventFromArray(dataForm) {
    const [eve_date_begin, eve_time_begin] = dataForm.fullDateBegin.split('T');
    const [eve_date_end, eve_time_end] = dataForm.fullDateEnd.split('T');
    const { title, description } = dataForm;
    const newEvent = {
      ...event,
      eve_title: title,
      eve_description: description,
      eve_date_begin,
      eve_time_begin,
      eve_date_end,
      eve_time_end,
    };
    handleEvents({ type: 'UPDATE', payload: newEvent });
  }

  async function handleDeleteEvent() {
    try {
      const response = await deleteEvent(event.eve_id);
      if (response.status === 204) {
        deleteEventFromArray();
        toast({
          title: 'Evento deletado com sucesso.',
          description: 'O evento foi deletado com sucesso.',
          status: 'success',
          duration: 3000,
          variant: 'solid',
          position: 'bottom-right',
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: 'Erro ao deletado o evento.',
        description:
          'Ocorreu um erro ao deletado o evento, tente novamente mais tarde.',
        status: 'error',
        duration: 3000,
        variant: 'solid',
        position: 'bottom-right',
        isClosable: true,
      });
      console.log(error);
    }
  }

  async function submit(data) {
    try {
      const response = await updateEvent(event.eve_id, data);
      if (response.status === 204) {
        updateEventFromArray(data);
        toast({
          title: 'Evento atualizado com sucesso.',
          description: 'O evento foi atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          variant: 'solid',
          position: 'bottom-right',
          isClosable: true,
        });
        onClose();
        return true;
      }
      if (response.status === 409) {
        const conflitingEvents = formatTitleEvents(response.data);
        toast({
          title: 'Conflito de eventos.',
          description:
            `Não foi possível atualizar o evento, pois ele conflita com o(s) evento(s): ${conflitingEvents}`,
          status: 'error',
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
            `Não foi possível atualizar o evento, pois ele conflita com o(s) evento(s): ${conflitingEvents}`,
          status: 'error',
          duration: 5000,
          variant: 'solid',
          position: 'bottom-right',
          isClosable: true,
        });
        return false;
      }
      toast({
        title: 'Erro ao atualizar o evento.',
        description:
          'Ocorreu um erro ao atualizar o evento, tente novamente mais tarde.',
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
    <Popover
      initialFocusRef={ref}
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      closeOnBlur={true}
      isLazy
      lazyBehavior="keepMounted"
      left="0px"
      top="0px"
    >
      <PopoverTrigger>
        <EventTag title={event.eve_title} ref={refTag} onClick={onToggle} />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="semibold">{event.eve_title}</Text>
              <ButtonGroup variant="outline" size="sm">
                <IconButton
                  aria-label="Editar Evento"
                  icon={<EditIcon />}
                  onClick={handleIsReadOnly}
                  colorScheme="blue"
                />
                <IconButton
                  aria-label="Editar Evento"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={handleDeleteEvent}
                />
                <IconButton
                  aria-label="Fechar Popover"
                  icon={<CloseIcon />}
                  colorScheme="gray"
                  onClick={onClose}
                />
              </ButtonGroup>
            </Flex>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverBody>
            <FormEvent
              event={event}
              date={date}
              isReadOnly={isReadOnly}
              isEditing={true}
              handleIsReadOnly={handleIsReadOnly}
              submitAction={submit}
            />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
});

export default EventPopover;
