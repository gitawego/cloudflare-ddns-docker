const minutes = process.env.UPDATE_TIME || 10;
const the_interval = minutes * 60 * 1000;

const { updateRecord } = require('./updateRecord');

setInterval(async () => {
  try {
    await updateRecord();
  } catch (err) {
    console.error(err);
  }
}, the_interval);

updateRecord();
