export enum ConfigKey {
  ABOUT_SLUGS = 'ABOUT_SLUGS',
  ABOUT_PARAGRAPHS = 'ABOUT_PARAGRAPHS',
  PROJECTS = 'PROJECTS',
}

export enum Format {
  JSON,
}

export const getConfig = (
  name: ConfigKey,
  defaultValue: null | string[] = null,
  format: null | Format = null,
) => {
  const environment = process.env;
  const value = environment[name];

  if (!value) {
    return defaultValue;
  }

  if (format === Format.JSON) {
    return JSON.parse(value);
  }
  return value;
};
