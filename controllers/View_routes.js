const router = require('express').Router();
const User = require('../models/User');
const Thought = require('../models/Thought');
const dayjs = require('dayjs');



function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;


  if (!isAuthenticated) return res.redirect('/login');


  next();
}


// Show Homepage
router.get('/', async (req, res) => {
  let thoughts = await Thought.findAll({
    include: User,
   
  });


  thoughts = thoughts.map(t => t.get({ plain: true }));


  res.render('index', {
    isHome: true,
    isLoggedIn: req.session.user_id,
    thoughts: thoughts
  });
});


// Show Login Page
router.get('/login', (req, res) => {
  if (req.session.user_id) return res.redirect('/dashboard');


  res.render('login', {
    isLogin: true
  });
});


// Show Register Page
router.get('/register', (req, res) => {
  if (req.session.user_id) return res.redirect('/dashboard');


  res.render('register', {
    isRegister: true
  });
});


// Show Dashboard Page
router.get('/dashboard', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user_id, {
    include: Thought
  });

  const thoughts = user.thoughts.map(t => ({
    ...t.get({ plain: true }),
    formattedCreatedAt: dayjs(t.createdAt).format('MMM, D YYYY')
  }));

  
  res.render('dashboard', {
    username: user.username,
    thoughts: thoughts
  });
});



// show Edit page
router.get('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const thought = await Thought.findByPk(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.render('editPost', {  
      thought: thought,
      username : thought.username,
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while fetching the thought' });
  }
});

module.exports = router;


