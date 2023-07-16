const router = require('express').Router();
const User = require('../models/User');
const Thought = require('../models/Thought');


function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;


  if (!isAuthenticated) return res.redirect('/login');


  next();
}

router.get('/editPost/:id', async (req, res) => {
    try {
      const thought = await Thought.findByPk(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      
      res.render('editPost', { thought });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while fetching the thought' });
    }
  });
  
  module.exports = router;