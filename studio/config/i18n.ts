export const i18nConfig = {
  base: 'en',
  languages: [
    {
      id: 'en',
      title: 'English',
    },
    {
      id: 'de',
      title: 'Deutsch',
    },
  ],
};

export const i18nDocuments = ['post', 'page']

export const languageField = {
  // should match 'languageField' plugin configuration setting, if customized
  name: 'language',
  type: 'string',
  readOnly: true,
  hidden: true,
}
