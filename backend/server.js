const app = require('./app');

const listener = app.listen(process.env.PORT || 3006, () => {
  console.log('App is listening on port: ', listener.address().port);
});
