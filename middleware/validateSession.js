const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET } = require('../common/config')

async function validateSession(req, res, next) {
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    return res.sendStatus(200);
  }
  const sessionToken = req.headers.authorization;
  if (!sessionToken) 
    return res.status(403).send({ auth: false, message: "No token provided." });
  try {
    const { id } = jwt.verify(sessionToken, SECRET);
    let user;
    if (id) {
      user = await User.findOne({ where: { id: id } });
    }
    if (!id || !user) {
      return res.status(401).send({ error: "not authorized" });
    }
    req.user = user;
    console.log(`user: ${user}`);
    next();

  } catch (err) {
    console.error(err.message);
    res.status(401).send({ error: "not authorized" })
  }
}

module.exports = validateSession;
