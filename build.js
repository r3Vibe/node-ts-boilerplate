const copyfiles = require('copyfiles');

try {
  copyfiles(['src/views/*.ejs', 'dist'], { up: 1 }, () =>
    // eslint-disable-next-line no-console
    console.log('EJS files copied'),
  );
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err);
}
