process.env.EMAIL = 'youmail@mail.com';
process.env.API_KEY = 'your_key';
process.env.ZONE = 'mydomain.io';

const { updateRecord } = require('./updateRecord');

updateRecord().then(
  () => {
    console.log('done');
  },
  err => {
    console.error(err);
  }
);
