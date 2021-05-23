const router = require('express').Router();
const { Game } = require('../models');

router.get('/all', async (req, res) => {
  const { id: owner_id } = req.user;
  try {
    const games = await Game.findAll({ where: { owner_id: owner_id } });
    res.status(200).json({ games: games, message: "Data fetched." });

  } catch (err) {
    res.status(500).json({ message: "Data not found" });
  }
});

router.get('/:id', async (req, res) => {
  const { id: owner_id } = req.user;
  const { id } = req.params;
  try {
    const game = await Game.findOne({ where: { id: id, owner_id: owner_id } });
    res.status(200).json({ game: game });

  } catch (err) {
    res.status(500).json({ message: "Data not found." })
  }
});

router.post('/create', async (req, res) => {
  console.log(req.body);
  const { id: owner_id } = req.user;
  const { title, studio, esrb_rating, user_rating, have_played } = req.body.game;
  try {
    const game = await Game.create({
      title,
      studio,
      owner_id,
      esrb_rating,
      user_rating,
      have_played
    });
    res.status(200).json({ game: game, message: "Game created." })

  } catch (err) {
    res.status(500).send(err.message)
  }
});

router.put('/update/:id', async (req, res) => {
  const { id: owner_id } = req.user;
  const { id } = req.params;
  const { title, studio, esrb_rating, user_rating, have_played } = req.body.game;
  try {
    const game = await Game.update({
      title,
      studio,
      esrb_rating,
      user_rating,
      have_played
    },
    {
      where: {
        id: id,
        owner_id: owner_id 
      }
    });
    res.status(200).json({ game, message: "Successfully updated." });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.delete('/remove/:id', async (req, res) => {
  const { id: owner_id } = req.user;
  const { id } = req.params;
  try {
    await Game.destroy({
      where: {
        id: id,
        owner_id: owner_id
      }
    });
    res.status(200).json({ game: game, message: "Successfully deleted" })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
