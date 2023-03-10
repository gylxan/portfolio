export const getShortenedJoinedList = (
  options: string[],
  maxElements: number = 3,
) => {
  return options.length > maxElements
    ? `${options.slice(0, maxElements).join(', ')} + ${
        options.length - 3
      } others`
    : options.join(', ');
};
