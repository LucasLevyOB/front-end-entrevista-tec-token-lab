import Day from '../Day';

const generateBlankDays = quantity => {
  return Array.from({ length: quantity }).map((_, index) => (
    <Day key={index} />
  ));
};

export default generateBlankDays;
