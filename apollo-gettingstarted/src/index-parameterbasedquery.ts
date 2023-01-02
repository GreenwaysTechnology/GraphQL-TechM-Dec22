import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { GraphQLScalarType, Kind } from 'graphql';


const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: Date) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value: Date) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }
        // Invalid hard-coded value (not an integer)
        return null;
    },
});
//Define Schema
const typeDefs = `


  type User {
    id:ID!
    name:String
    email:String
    date:Date
    address:[Address] #This becomes Query
  }
  type Address {
    city:String
    state:String
  }
  #Query for User
  type Query {
    users:[User] 
    user(id:ID):User
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
    name: 'B',
    email: 'b@gmail.com',
    date: new Date()
},
{
    id: 3,
    name: 'C',
    email: 'c@gmail.com',
    date: new Date()
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
    //Custom Scalar
    Date: dateScalar,
    //Query
    Query: {
        users() {
            return USERS
        },
        user(_, args) {
            return USERS.find(user => {
                return user.id === +args.id
            })
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
