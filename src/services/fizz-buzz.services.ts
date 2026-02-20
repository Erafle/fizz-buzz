const getFizzBuzzValue = (num: number) => {
  let result = "";

  if (num % 3 === 0) result += "Fizz";
  if (num % 5 === 0) result += "Buzz";
  return result || num;
};

export const getFizzBuzzService = ({
  from,
  to,
}: {
  from: number;
  to: number;
}) => {
  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(getFizzBuzzValue(i));
  }
  return result;
};
