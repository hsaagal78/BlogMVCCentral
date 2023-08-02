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
    console.log("id si paso", thought);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
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
router.delete('/edit/:id', async (req, res) => {
  try {
    const thought = await Thought.destroy({
      where: {
          id: req.params.id,
        
      },
  });
    if (!thought) {
     
      return res.status(404).json({ message: 'thought not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting thought recipe:', error);
    res.status(500).json({ message: 'Error deleting favorite recipe' });
  }
});

module.exports = router;