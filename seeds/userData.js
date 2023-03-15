const { User } = require("../models");

let UserData = [
  {
    id: 1,
    username: "jisha",
    password: "password123",
    email: "jisha@example.com",
  },
  {
    id: 2,
    username: "michael",
    password: "password123",
    email: "michael@example.com",
  },
  {
    id: 3,
    username: "joe",
    password: "password123",
    email: "joe@example.com",
  },
];

const seedUser = () => User.bulkCreate(UserData, { individualHooks: true });

module.exports = seedUser;
