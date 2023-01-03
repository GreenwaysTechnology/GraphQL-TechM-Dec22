import { RESTDataSource } from "@apollo/datasource-rest"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"


//type class 
export class Book {
    id?: number;
    title?: string;
    author?: string;
}

export class MutationResponse {
    status: string
    data?: Book
}

//Rest Data Source
export class BooksAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = "http://localhost:3000/"
    }
    //apis:biz api
    async getBooks() {
        //http://localhost:3000/books
        return this.get<Book[]>(`books`)
    }
    async book(id: number) {
        return this.get<Book>(`books/${id}`)
    }
    //save book
    async postBook(book) {
        console.log(book)
        return this.post<MutationResponse>(`books`, book).then(resp => resp.data)
    }
}

//Context Type:
interface ContextValue {
    dataSources: {
        booksAPI: BooksAPI
    }
}


//Define Schema
const typeDefs = `
type Book {
    id:Int
    title:String
    author:String
}

#Query
type Query {
    "GET all Books from the Rest api server"
    books:[Book!]
    book(id:Int!):Book
}


#Mutations

input BookInput{
    title:String!
    author:String!
}

type Mutation {
    "POST new Book to the REST API server"
    addBook(input:BookInput):Book
}

`
//Define Resolver
const resolvers = {
    //Query
    Query: {
        async books(parent, args, contextValue, info) {
            const { dataSources } = contextValue
            return dataSources.booksAPI.getBooks()
        },
        //Book By Id 
        async book(parent, args, contextValue, info) {
            const { dataSources } = contextValue
            const id = +args.id
            return dataSources.booksAPI.book(id)
        }

    },
    Mutation: {
        //create Book
        async addBook(parent, args, contextValue, info) {
            const { input } = args
            return contextValue.dataSources.booksAPI.postBook({ ...input })
        },
        // //update Book
        // async updateBook(parent, args, contextValue, info) {

        // },
        // //remove Book
        // async removeBook(parent, args, contextValue, info) {

        // }
    }
}

const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
})
//start the webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    },
    context: async () => {
        return {
            dataSources: {
                booksAPI: new BooksAPI()  // dataSources.booksAPI.getBooks()
            }
        }
    }
})
console.log(`Apollo Server is Ready at ${url}`)
