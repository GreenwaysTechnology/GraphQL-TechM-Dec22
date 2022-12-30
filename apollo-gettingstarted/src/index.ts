import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

//Define Schema
const typeDefs = `
  type User {
    id:ID!
    name:String
    email:String
    address:Address #This becomes Query
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
//USERS ARRAY THINK AS Database table:
//CREATE TABLE users(id int,name varchar(20),email varchar(30),constraint c primaryKey(id))
//CREATE TABLE address(city varchar(20),state varchar(30), id int references users id)
//How to link a user with his/her address when you query.
// a info with address

//DECLARE USERS information in array like tables

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
    city: 'BNG',
    state: 'KA',
    id: 2
},
{
    city: 'HYD',
    state: 'TS',
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
            console.log(parent)
            //return address
            //Get the Parent of Address
            return ADDRESS.find(address => {
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
