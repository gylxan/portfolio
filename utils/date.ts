export const getFormattedPostDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}. ${date.toLocaleString('en-US', {
    month: 'long',
  })} ${date.getFullYear()}`;
};

export const getFormattedMonthAndYear = (dateString?: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  return `${date.toLocaleString('en-US', {
    month: 'long',
  })} ${date.getFullYear()}`;
};

