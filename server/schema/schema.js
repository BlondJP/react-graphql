const graphql = require('graphql');
const { GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLSchema,
        GraphQLID,
        GraphQLList } = graphql;
const _ = require('lodash');

const models = require('../models/index.js');
const Book = models.Book;
const Author = models.Author;

// schema
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args){
        return await Author.findOne({
            where: {
              id: parent.id
            }
          });
      }
    }
  })
});

// schema
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args){
        return await Book.findAll({
            where: {
              authorId: parent.id
            }
          });
      }
    }
  })
});

//query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

      // BOOK resolvers
      book: {
        type: BookType,
        args: {id: {type: GraphQLID}},
        async resolve(parent, args){
            return await Book.findOne({
                where: {
                  id: args.id
                }
              });
        }
      },
      books: {
        type: new GraphQLList(BookType),
        async resolve(parent, args){
          return await Book.findAll();
        }
      },

      // AUTHOR resolver
      author: {
        type: AuthorType,
        args: {id: {type: GraphQLID}},
        async resolve(parent, args){
          return await Author.findOne({
              where: {
                id: args.id
              }
            });
        }
      },
      authors: {
        type: new GraphQLList(AuthorType),
        async resolve(parent, args){
          return await Author.findAll();
        }
      }

  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      async resolve(parent, args){
        let author = {name: args.name, age: args.age};
        return await Author.create(author);
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID},
      },
      async resolve(parent, args){
        let book = {name: args.name, genre: args.genre, authorId: args.authorId};
        return await Book.create(book);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
