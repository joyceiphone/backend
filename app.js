var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString} = require('graphql');
var {medias} = require('./data');

const TitleType = new GraphQLObjectType({
    name: 'title',
    fields: ()=>({
        image: {type: GraphQLString},
        title: {type: GraphQLString},
        description:{type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'media list',
    fields: {
        medias: {
            type: new GraphQLList(TitleType),
            resolve: ()=> medias.slice(0,10)
        }
        
    }
})


var schema = new GraphQLSchema({
    query: RootQuery
})

// The root provides a resolver function for each API endpoint
var root = {
    start: ()=> console.log('hello world')
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');