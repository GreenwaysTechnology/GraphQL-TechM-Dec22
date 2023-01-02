import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

//Define Schema
const typeDefs = `
interface Book {
    title: String!
    author: Author!
}
  
type Course {
    name:String
}
type Author {
    name:String
}
type Textbook implements Book {
    title: String!
    author: Author!
    courses: [Course!]!
}
type ColoringBook implements Book {
    title: String!
    author: Author!
    colors: [String!]!
}
  
type Query {
  books: [Book!]!
}
 `


//Define Resolver
const resolvers = {

    Book: {
        __resolveType(book, contextValue, info) {
            if (book.courses) {
                return 'Textbook' //must return Implementaton type in String
            }
            if (book.colors) {
                return 'ColoringBook'
            }
            return null
        }
    },
    //Query
    Query: {

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
