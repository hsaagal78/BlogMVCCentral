const router = require('express').Router();
const Thought = require('../models/Thought');

function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect('/login');

  next();
}

// Update a thought
router.put('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const thought = await Thought.findByPk(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    // check if user is owner of the thought
    if (thought.userId !== req.session.user_id) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to update this thought' });
    }

    // Update the thought with the new data
    await thought.update({
      title: req.body.title,
      text: req.body.text,
    });

    res.json({ message: 'Thought updated successfully' });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the thought' });
  }
});

// Delete a thought
router.delete('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const thought = await Thought.findByPk(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Check if the user is the owner of the thought
    if (thought.userId !== req.session.user_id) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this thought' });
    }

    // Eliminate thought
    await thought.destroy();

    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'An error occurred while deleting the thought' });
  }
});

module.exports = router;