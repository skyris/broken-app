const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET } = require('../common/config')

const ONE_DAY = 60 * 60 * 24;

router.post('/signup', async (req, res) => {
  try {
    const { full_name, username, password, email } = req.body.user;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ full_name, username, passwordHash, email });

    if (!user) throw Error('Could not create User');
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: ONE_DAY });
    res.status(200).json({ user, token });
  } catch (err) {
    console.log('this is error', err.message);
    res.status(500).send(err.message)
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body.user;
  const user = await User.findOne({ where: { username: username } });
  if (!user) {
    res.status(403).send({ error: "User not found." })
  }
  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    res.status(502).send({ error: "Passwords do not match." })
  }
  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: ONE_DAY });
  res.json({
    user: user,
    message: "Successfully authenticated.",
    sessionToken: token
  });
});

module.exports = router;
