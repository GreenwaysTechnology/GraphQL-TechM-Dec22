import { readFileSync } from "fs";
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { BooksDataSource } from './datasources.js';
import resolvers from './resolvers/index.js';

export interface MyContext {
    dataSources: {
        booksAPI: BooksDataSource;
    };
}
const typeDefs = readFileSync("./schema.graphql", { encoding: 'utf-8' })

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
});
//start the webserver and deploy
const { url } = await startStandaloneServer(server, {
    context: async () => {
        return {
            // We are using a static data set for this example, but normally
            // this would be where you'd add your data source connections
            // or your REST API classes.
            dataSources: {
                booksAPI: new BooksDataSource(),
            },
        };
    },
});
console.log(`Apollo Server is Ready at ${url}`)