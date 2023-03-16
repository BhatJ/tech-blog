const router = require('express').Router();
const { User, Blogpost, Comment } = require('../models');

// GET all blogs for homepage
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

// GET one blog and all comments for that blog
router.get('/blogpost/:id', async (req, res) => {
  const blogpost = true;
  const loggedIn = req.session.loggedIn;
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

    res.render('blogpost', { blog, loggedIn, blogpost });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all blogs created by logged in user
router.get('/dashboard', async (req, res) => {
  const loggedIn = req.session.loggedIn;
  const dashboardPage = true;

  if (loggedIn) {

    try {
      const dbBlogData = await Blogpost.findAll( { where: {user_id: req.session.user_id} } );
      const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

      console.log("\n\n BLOGS \n\n");
      console.log(blogs);

      res.render('dashboard', {blogs, loggedIn, dashboardPage});
      return;
    } catch (err) {
      res.status(500).json(err);
    }
  }
  res.render('login');
});

// Create a new post route
router.get('/dashboard/newpost', async (req, res) => {
  const loggedIn = req.session.loggedIn;
  const newpost = true;
  const dashboardPage = true;

  if (loggedIn) {

    try {
      console.log("\n\n Create a new blog \n\n");

      res.render('createpost', {loggedIn, dashboardPage, newpost});
      return;
    } catch (err) {
      res.status(500).json(err);
    }
  }
  res.render('login');
});

// Update a post route
router.get('/dashboard/updatepost/:id', async (req, res) => {
  const loggedIn = req.session.loggedIn;
  const updatepost = true;
  const dashboardPage = true;

  if (loggedIn) {
    try {
      console.log("\n\n Update an existing blog post \n\n");

      const dbBlogData = await Blogpost.findByPk(req.params.id, {
        attributes: [
          'title',
          'content',
        ],
      });
      const blog = dbBlogData.get({ plain: true });

      console.log("\n\n------------------ BLOGPOST TO UPDATE --------------------\n\n");
      console.log(blog);

      res.render('updatepost', {blog, loggedIn, dashboardPage, updatepost});
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
