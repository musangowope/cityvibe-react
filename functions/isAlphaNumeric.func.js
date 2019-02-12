export default string => {
  const numberExp = ".*\\d+.*";
  const letterExp = /[a-z]/i;
  return !!(string.match(numberExp) && string.match(letterExp));
};
