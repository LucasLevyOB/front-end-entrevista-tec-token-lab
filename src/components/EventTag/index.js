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
      size={['sm', 'sm', 'md']}
      variant="outline"
      colorScheme="blue"
      width="100%"
      tabIndex={0}
    >
      <TagLeftIcon
        boxSize="16px"
        as={EventIcon}
        display={['none', 'none', 'block']}
      />
      <TagLabel title={title}>{title}</TagLabel>
    </Tag>
  );
});

export default EventTag;
