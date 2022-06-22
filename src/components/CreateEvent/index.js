import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import moment from 'moment';
import FormEvent from '../FormEvent';

const CreateEvent = ({ isOpen, onClose, date }) => {
  const datePtBr = moment(date).format('dddd, DD [de] MMMM [de] YYYY');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Evento para {datePtBr}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormEvent date={date} isReadOnly={false} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateEvent;
