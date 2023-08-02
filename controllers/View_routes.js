const router = require('express').Router();
const User = require('../models/User');
const Thought = require('../models/Thought');
const Comment = require('../models/Comment');
const dayjs = require('dayjs');



function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;


  if (!isAuthenticated) return res.redirect('/login');


  next();
}


// Show Homepage
router.get('/', async (req, res) => {
  try {
    let thoughts = await Thought.findAll({
      include: User,
    });
    
    thoughts = thoughts.map((t) => ({
      ...t.get({ plain: true }),
      formattedCreatedAt: dayjs(t.createdAt).format('M, D YYYY'),
    }));
    res.render('index', {
      isHome: true,
      isLoggedIn: req.session.user_id,
      thoughts: thoughts,
      
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while fetching thoughts' });
  }
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
    include: [
      {
        model: Thought,
        as: 'thoughts',
        attributes: ['id', 'title', 'text', 'createdAt'], 
      },
    ],
    attributes: ['username'],
  });


  const userData = {
    user: {
      username: user.username,
    },
    thoughts: user.thoughts.map(t => ({
      ...t.get(),
      formattedCreatedAt: dayjs(t.createdAt).format('MMM, D YYYY')
    })),
  };

  console.log('I want to see user', userData);
  res.render('dashboard', {
    ...userData,
    
    isDashboard: true,
    isEdit: true,
    
  });


});


// show Edit page
router.get('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const thoughts = await Thought.findByPk(req.params.id);
    
    const thought = thoughts.get({plain:true})
   

    res.render('editPost', {  
      ...thought,
        isEdit: true,
        isDashboard: true,
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while fetching the thought' });
  }
});
// show comment page
router.get('/comment/:id', isAuthenticated, async (req, res) => {
  try {
    const thoughts = await Thought.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes:['text']
        },
        {
          model: User,
          attributes:['username']
        }
      ]
    });
    
    const comments = thoughts.comments.map((comment) => ({
      ...comment.get({ plain: true }),
      formattedCreatedAt: dayjs(comment.createdAt).format('M, D YYYY'),
    }));
   
      const username = thoughts.user.dataValues.username; 
      console.log ('mira username', username)
    // console.log('prueba si realmente sale ', thoughts.get({pain: true}));
    res.render('comment', {  
      ...thoughts.get({pain: true}),
      comments,
      username,
        // isHome: true,
        isComment: true,
        
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while fetching the thought' });
  }
});

module.exports = router;


