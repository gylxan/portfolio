export const parseJSON = <T>(
  value: string | undefined,
  defaultValue: T,
): T => {
  if (!value) {
    return defaultValue;
  }
  return JSON.parse(value);
};
