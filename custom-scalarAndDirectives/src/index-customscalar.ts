import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { GraphQLScalarType, Kind } from "graphql"

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date Data type',
    serialize(value: Date) {
        //logic how to treate that data type
        return value.getTime() // convert outgoing date to the interger for JSON processing
    },
    parseValue(value: Date) {
        return new Date(value) //convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10))
        }
        return null
    }


})


//Define Schema
const typeDefs = `
#Custom Data type
scalar Date

type User {
    id:ID!
    name:String
    email:String
    date:Date
}

type Query {
  users:[User]
}

`

const USERS = [{
    id: 1,
    name: 'A',
    email: 'a@gmail.com',
    date: new Date()
},
{
    id: 2,
    name: 'A1',
    email: 'a1@gmail.com',
    date: new Date()
}
]
//Define Resolver
const resolvers = {
    Date: dateScalar,
    //Query
    Query: {
        users() {
            return USERS
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
