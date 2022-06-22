import { forwardRef, useRef, useState } from 'react';

import {
  ButtonGroup,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import EventTag from '../EventTag';
import FormEvent from '../FormEvent';

const EventPopover = forwardRef(({ event, date }, ref) => {
  const refTag = useRef(null);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isReadOnly, setIsReadOnly] = useState(true);

  function handleIsReadOnly() {
    setIsReadOnly(!isReadOnly);
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
        <EventTag title={event.title} ref={refTag} onClick={onToggle} />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="semibold">{event.title}</Text>
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
            />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
});

export default EventPopover;
