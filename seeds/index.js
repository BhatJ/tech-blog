const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedBlogpost = require('./blogpostData');
const seedCommentData = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser();
  console.log('\n----- USER TABLE SEEDED -----\n');

  await seedBlogpost();
  console.log('\n----- BLOGPOST TABLE SEEDED -----\n');

  await seedCommentData();
  console.log('\n----- COMMENT TABLE SEEDED -----\n');

  process.exit(0);
};

seedAll();
