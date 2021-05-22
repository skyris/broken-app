const express = require('express');
const { PORT } = require('./common/config');
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')

const app = express();
app.use(express.json());

db.sync();
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});
