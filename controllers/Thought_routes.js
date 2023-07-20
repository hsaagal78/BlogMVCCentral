const router = require('express').Router();
const Thought = require('../models/Thought');


function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect('/login');

  next();
}

// Add a thought
router.post('/thought', isAuthenticated, async (req, res) => {
  await Thought.create({
    title: req.body.title,
    text: req.body.text,
    userId: req.session.user_id,
  });

  res.redirect('/dashboard');

});



module.exports = router;


