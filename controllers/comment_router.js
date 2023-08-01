const router = require('express').Router();
const Thought = require('../models/Thought');
const Comment = require('../models/Comment');

function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect('/login');

  next();
}
//Create comments
router.post('/comment/:id', isAuthenticated, async (req, res) => {
  try {
    // Get the thought ID from the URL parameters
    const thoughtId = req.params.id;
    // console.log('ver que pasa al crear comment', thoughtId)

    // Get the comment text from the request body
    const { text } = req.body;

    // Create the comment in the database
    await Comment.create({
      text,
      thoughtId,
      userId: req.session.user_id,
    });

    // Redirect the user to the thought details page
    res.redirect(`/comment/${thoughtId}`);
    // res.redirect('/comment/:id');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while creating the comment' });
  }
});


module.exports = router;