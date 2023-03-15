const { Blogpost } = require('../models');

const blogpostData = [
  {
    title: 'CSS',
    content: "Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.",
    user_id: 1,
    created_date: 'April 20, 2022 07:00:00',
  },
  {
    title: 'Express-session',
    content: "Express-session - an HTTP server-side framework used to create and manage a session middleware. This tutorial is all about sessions. Thus Express-session library will be the main focus. Cookie-parser - used to parse cookie header to store data on the browser whenever a session is established on the server-side.",
    user_id: 1,
    created_date: 'April 21, 2022 09:00:00',
  },
  {
    title: 'Scrum',
    content: "Scrum is an agile way to manage work. Ever few weeks (typically two to four), teams deliver a fully functional chunk of work (an increment). Teams and the business use the feedback from each delivery to determine what to build next, or how to adapt what they've already built.",
    user_id: 3,
    created_date: 'April 21, 2022 09:00:00',
  },
];

const seedBlogpost = () => Blogpost.bulkCreate(blogpostData);

module.exports = seedBlogpost;
