const express = require('express');
const { PORT } = require('./common/config');
const { dbStart } = require('./db');
const { syncModels } = require('./models');
const user = require('./controllers/userController');
const game = require('./controllers/gameController')
const sessionValidator = require('./middleware/validateSession');

const app = express();
app.use(express.json());

app.use('/api/auth', user);
app.use(sessionValidator);
app.use('/api/game', game);

(async () => {
  await dbStart();
  await syncModels();
  await app.listen(PORT);
  console.log(`App is listening on ${PORT}`);
})();
