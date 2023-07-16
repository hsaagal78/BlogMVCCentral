const router = require('express').Router();
const User = require('../models/User');
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
    userId: req.session.user_id
  });


  res.redirect('/dashboard');
});

// Update a thought
router.put('/thought/:id', isAuthenticated, async (req, res) => {
  try {
    const thought = await Thought.findByPk(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
// check if user is owner of the comment
    if (thought.userId !== req.session.user_id) {
      return res.status(403).json({ message: 'You are not authorized to update this thought' });
    }

    // Update the comment with the new data
    await thought.update({
      title: req.body.title,
      text: req.body.text
    });

    res.json({ message: 'Thought updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating the thought' });
  }

  // Delete a thought
router.delete('/thought/:id', isAuthenticated, async (req, res) => {
  try {
    const thought = await Thought.findByPk(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    //Check if the user wants delete comment 
       if (thought.userId !== req.session.user_id) {
      return res.status(403).json({ message: 'You are not authorized to delete this thought' });
    }

    // Eliminate comment
    await thought.destroy();

    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the thought' });
  }
});

});

module.exports = router;