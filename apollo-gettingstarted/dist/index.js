import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
//Define Schema
const typeDefs = `
#Simple Query:Which returns helloworld
type Query {
  hello:String
  greet(name:String,message:String):String 
}

`;
//Define Resolver
const resolvers = {
    //Query
    Query: {
        hello() {
            return "Hello,Apollo GraphQL";
        },
        greet(_, args) {
            console.log(args);
            const { name, message } = args;
            return `${message} ${name}`;
        }
    }
    //Mutation
    //Subscription
};
// const server = new ApolloServer({
//     typeDefs: typeDefs,
//     resolvers: resolvers
// })
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
//start the webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
});
console.log(`Apollo Server is Ready at ${url}`);
