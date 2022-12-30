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
    users:[User]
    user(id:ID!):User
  }

`
////
//Mock data
const USERS = [{
    id: 1,
    firstName: 'Subramanian',
    lastName: 'Murugan',
    age: 42,
    points: 200.5,
    status: true

},
{
    id: 2,
    firstName: 'Ram',
    lastName: 'Murugan',
    age: 35,
    points: 100.5,
    status: true

},
{
    id: 3,
    firstName: 'Geetha',
    lastName: 'Subramanian',
    age: 38,
    points: 500.5,
    status: false

},
{
    id: 4,
    firstName: 'John',
    lastName: 'Mc',
    age: 23,
    points: 200.5,
    status: false

},
{
    id: 5,
    firstName: 'Karthik',
    lastName: 'Subramanian',
    age: 22,
    points: 500.5,
    status: true

}
]



//Define Resolver
const resolvers = {
    //Query
    Query: {
        users() {
            return USERS
        },
        user(_, args) {
            const { id } = args; //destructure args object:Extract id field
            //biz logic
            return USERS.find(user => {
                return user.id === +id
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
