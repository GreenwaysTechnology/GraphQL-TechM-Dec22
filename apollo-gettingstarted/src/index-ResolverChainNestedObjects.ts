import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

//Define Schema
const typeDefs = `
  type User {
    id:ID!
    name:String
    email:String
    address:[Address] #This becomes Query
  }
  type Address {
    city:String
    state:String
  }
  #Query for User
  type Query {
    users:[User] 
  }

`

const USERS = [{
    id: 1,
    name: 'A',
    email: 'a@gmail.com'
},
{
    id: 2,
    name: 'B',
    email: 'b@gmail.com'
},
{
    id: 3,
    name: 'C',
    email: 'c@gmail.com'
}

]


const ADDRESS = [{
    city: 'CBE',
    state: 'TN',
    id: 1 //linking field
},
{
    city: 'CHN',
    state: 'TN',
    id: 1 //linking field
},
{
    city: 'BNG',
    state: 'KA',
    id: 2
},
{
    city: 'CHN',
    state: 'TN',
    id: 2
},
{
    city: 'HYD',
    state: 'TS',
    id: 3
},
{
    city: 'CBE',
    state: 'TN',
    id: 3
}
]

//Define Resolver
const resolvers = {
    //Query
    Query: {
        users() {
            return USERS
        }
    },
    //Resolver Chain
    User: {
        address(parent, args, contextValue, info) {
            return ADDRESS.filter(address => {
                return address.id === parent.id
            })
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
