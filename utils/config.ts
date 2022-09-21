export enum ConfigKey {
  ABOUT_SLUGS = 'ABOUT_SLUGS',
  ABOUT_PARAGRAPHS = 'ABOUT_PARAGRAPHS',
  NAME = 'NAME',
  PROJECTS = 'PROJECTS',
  PROFILE_IMAGE_URL = 'PROFILE_IMAGE_URL',
  START_PARAGRAPHS = 'START_PARAGRAPHS',
}

export enum Format {
  JSON,
}

export const getConfig = (
  name: ConfigKey,
  defaultValue: null | string | string[] = null,
  parseFormat: null | Format = null,
) => {
  const environment = process.env;
  const value = environment[name];

  if (!value) {
    return defaultValue;
  }

  if (parseFormat === Format.JSON) {
    return JSON.parse(value);
  }
  return value;
};
