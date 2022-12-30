import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

//Define Schema
const typeDefs = `
type Query {
  hello(name:String):String
}

`
//Define Resolver
const resolvers = {
    //Query
    Query: {
        hello(parent, args, contextValue, info) {
            console.log(args)
            return `Hello ${args.name}`
        }
    }

}

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
