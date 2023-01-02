import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

interface MyContext {
    greeting?: String
}

//Define Schema
const typeDefs = `
type Query {
  hello:String  
}

`
//Define Resolver
const resolvers = {
    //Query
    Query: {
        hello(parent, args, contextValue, info) {
            return contextValue.greeting
        }
    }
}

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
})
//start the webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    },
    context: async ({ req, res }) => {
        return {
            greeting: 'Hello GraphQL context'
        }
    }
})
console.log(`Apollo Server is Ready at ${url}`)
