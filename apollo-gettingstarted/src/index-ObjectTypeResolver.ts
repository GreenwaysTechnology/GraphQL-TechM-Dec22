import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

//Define Schema
const typeDefs = `
  type User {
    id:ID
    firstName:String
    lastName:String
    age:Int
    points:Float
    status:Boolean
  }
  #Query for User
  type Query {
    user:User
  }

`
//Define Resolver
const resolvers = {
    //Query
    Query: {
        user() {
            return {
                id: 1,
                firstName: 'Subramanian',
                lastName: 'Murugan',
                age: 42,
                points: 200.5,
                status: true
            }
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
