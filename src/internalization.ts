// i18n.js
import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  cookie: 'lang',
  queryParameter: 'lang',
  autoReload: true,
  syncFiles: true,
  objectNotation: true,
});

export default i18n;
