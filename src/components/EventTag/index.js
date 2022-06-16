import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';

import EventIcon from '@mui/icons-material/Event';

const EventTag = ({ title }) => {
  return (
    <Tag as="div" role="button" size="md" variant="outline" colorScheme="blue">
      <TagLeftIcon boxSize="16px" as={EventIcon} />
      <TagLabel title={title}>{title}</TagLabel>
    </Tag>
  );
};

export default EventTag;
