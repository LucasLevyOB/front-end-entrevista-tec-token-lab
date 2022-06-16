import Day from '../Day';

const GenerateBlankDays = ({ quantity }) => {
  return Array.from({ length: quantity }).map((_, index) => (
    <Day key={index} />
  ));
};

export default GenerateBlankDays;
