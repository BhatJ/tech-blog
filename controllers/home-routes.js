const router = require('express').Router();
const { User, Blogpost, Comment } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    const blogs = dbBlogpostData.map((blog) =>
      blog.get({ plain: true })
    );

    console.log(blogs);


    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
router.get('/blogpost/:id', async (req, res) => {
  try {
    const dbBlogData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
        {
          model: User,
        }
      ],
    });

    const dbUserData = await User.findAll( { attributes: ['id', 'username'], });

    const blog = dbBlogData.get({ plain: true });
    const users = dbUserData.map((user) => user.get({ plain: true }));

    // Map the user_id to username
    for (let i = 0; i < blog.comments.length; i++)
    {
      const userId = blog.comments[i].user_id;
      let username = "";

      for (let i = 0; i < users.length; i++)
      {
        if (users[i].id == userId)
        {
          username = users[i].username;
        }
      }

      blog.comments[i].user_id = username;

    }

    console.log("\n\n------------------------BLOG------------------------\n\n");
    console.log(blog);
    console.log("\n\n------------------------USERS------------------------\n\n");
    console.log(users);

    res.render('blogpost', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
  const loggedIn = req.session.loggedIn;
  if (loggedIn) {

    try {
      const dbBlogData = await Blogpost.findAll( { where: {user_id: req.session.user_id} } );
      const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

      console.log("\n\n BLOGS \n\n");
      console.log(blogs);

      res.render('dashboard', {blogs, loggedIn});
      return;
    } catch (err) {
      res.status(500).json(err);
    }
  }
  res.render('login');
});


// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
