import { useState } from 'react';
import moment from 'moment';

import { Center, Flex, SimpleGrid, Wrap, WrapItem } from '@chakra-ui/react';
import Day from '../Day';
import GenerateBlankDays from './generateBlankDays';

const Calendar = () => {
  const [today, setToday] = useState(moment());
  const months = moment.months();
  const weekdaysShort = moment.weekdaysShort();
  const currentDay = today.date();
  const daysInMonth = moment(today).daysInMonth();
  console.log(currentDay);

  function firstDayOfMonth() {
    return moment(today).startOf('month').day();
  }

  console.log(firstDayOfMonth());

  return (
    <>
      <Flex spacing="0">
        {weekdaysShort.map((day, index) => (
          <Center
            key={index}
            w="180px"
            h="38px"
            bg="red.200"
            border="1px"
            borderColor="gray.200"
          >
            {day}
          </Center>
        ))}
      </Flex>
      <SimpleGrid columns={7} spacing="0">
        <GenerateBlankDays quantity={firstDayOfMonth()} />
        {Array.from({ length: daysInMonth }, (_, index) => (
          <Day key={index} day={index + 1} />
        ))}
        <GenerateBlankDays quantity={42 - daysInMonth - firstDayOfMonth()} />
      </SimpleGrid>
    </>
  );
};

export default Calendar;
