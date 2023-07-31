const router = require('express').Router();
const Thought = require('../models/Thought');

function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect('/login');

  next();
}

// Add a comment
router.put('/comment/:id', isAuthenticated, async (req, res) => {
  try {
    const thought = await Thought.findByPk(req.params.id);
    console.log("id si paso", thought);

  
    // Update the thought with the new data
    await thought.create({
      
      text: req.body.text,
      
    });

    res.redirect('/comment');;
    console.log("res si paso", res.json);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the thought' });
  }
});
