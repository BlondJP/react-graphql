const {Sequelize, SequelizeClass} = require('sequelize');
const sequelize = new Sequelize('graphql', 'root', 'hubside123', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const Book = sequelize.define('book', {
  name: Sequelize.STRING,
  genre: Sequelize.STRING,
  authorId: Sequelize.INTEGER
});

const Author = sequelize.define('author', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
});

module.exports = {
  Book : Book,
  Author : Author
};
