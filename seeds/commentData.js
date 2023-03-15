const { Comment } = require('../models');

const commentData = [
  {
    content: "I sometime struggle with CSS",
    blogpost_id: 1,
    user_id: 2,
    created_date: 'April 25, 2022 17:00:00',
  },
  {
    content: "I have the same issue",
    blogpost_id: 1,
    user_id: 3,
    created_date: 'April 25, 2022 18:00:00',
  },
  {
    content: "I like express session. I tried using passport with limited success",
    blogpost_id: 2,
    user_id: 3,
    created_date: 'April 25, 2022 18:30:00',
  },
];

const seedCommentData = () => Comment.bulkCreate(commentData);

module.exports = seedCommentData;