import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';

import EventIcon from '@mui/icons-material/Event';
import { forwardRef } from 'react';

const EventTag = forwardRef(({ title, onClick }, ref) => {
  return (
    <Tag
      as="div"
      ref={ref}
      role="button"
      onClick={onClick}
      size="md"
      variant="outline"
      colorScheme="blue"
    >
      <TagLeftIcon boxSize="16px" as={EventIcon} />
      <TagLabel title={title}>{title}</TagLabel>
    </Tag>
  );
});

export default EventTag;
