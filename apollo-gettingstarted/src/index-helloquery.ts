import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

//Define Schema
const typeDefs = `
#Simple Query:Which returns helloworld

type Query {
    """
     This is hello api which returns hello world in 
     in the string format.
    """
  hello:String
  "This is hai api which returns hai messsage"
  hai:String
  
}

`
//Define Resolver
const resolvers = {
    //Query
    Query: {
        hello() {
            return "Hello,Apollo GraphQL"
        },
        hai() {
            return "Hai , GraphQL!"
        }
    }
    //Mutation

    //Subscription
}
// const server = new ApolloServer({
//     typeDefs: typeDefs,
//     resolvers: resolvers
// })
const server = new ApolloServer({
    typeDefs,
    resolvers,
})
//start the webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Ready at ${url}`)
