const Game = require('./game');
const User = require('./user');

async function syncModels() {
  await User.sync();
  await Game.sync();
  console.log('Models synchronized!');
}
module.exports = {
  Game,
  User,
  syncModels
};
