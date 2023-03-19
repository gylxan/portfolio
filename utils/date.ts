export const getFormattedPostDate = (dateString: string, locale?: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}. ${date.toLocaleString(
    locale ?? process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
    {
      month: 'long',
    },
  )} ${date.getFullYear()}`;
};

export const getFormattedMonthAndYear = (
  dateString?: string,
  locale?: string,
) => {
  const date = dateString ? new Date(dateString) : new Date();
  return `${date.toLocaleString(locale ?? process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE, {
    month: 'long',
  })} ${date.getFullYear()}`;
};
