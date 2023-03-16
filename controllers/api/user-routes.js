const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Post a comment
router.post('/comment', async (req, res) => {

  try {
    const dbCommentData = await Comment.create({
      content: req.body.comment,
      blogpost_id: req.body.blogpostId,
      user_id: req.session.user_id,
      created_date: req.body.createdDate,
    });   

    res.status(200).json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

// Create a new blog topic
router.post('/newpost', async (req, res) => {

  try {
    const dbNewpostData = await Blogpost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
      created_date: req.body.createdDate,
    });   

    res.status(200).json(dbNewpostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.put('/updatepost', async (req, res) => {

  try {
    const dbUpdateData = await Blogpost.update(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
        created_date: req.body.createdDate,
      },
      {
        where: {
          id: req.body.blogpostId,
        }
      }
    );   

    res.status(200).json(dbUpdateData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

module.exports = router;
