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
    // check if user is owner of the thought
    if (thought.userId !== req.session.userId) {
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
    console.log("res si paso", res.json);
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
  //   const recipeId = req.params.id;
    console.log('Recipe ID received:');

    const thought = await Thought.destroy({
      where: {
          id: req.params.id,
          // user_id: req.session.user_id,
      },
  });
    console.log('Recipe ID received:', thought);
    if (!thought) {
     
      return res.status(404).json({ message: 'thought not found' });
    }
    // return res.redirect('/');
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting thought recipe:', error);
    res.status(500).json({ message: 'Error deleting favorite recipe' });
  }
});

module.exports = router;