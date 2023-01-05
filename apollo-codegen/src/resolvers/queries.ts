import { Message, QueryResolvers } from "../__generated__/resolvers-types";
import { Book } from "../__generated__/resolvers-types";
// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  Query: {
    // Our third argument (`contextValue`) has a type here, so we
    // can check the properties within our resolver's shared context value.
    books: async (_, __, contextValue): Promise<Book> => {
      return await contextValue.dataSources.booksAPI.getBooks();
    },
    hello: (): Promise<Message> => {
      // return {
      //   msg: 'Hello'
      // }
      //return Promise.resolve({ msg: 'Hello' })
      return new Promise((resolve, reject) => {
        //delay response
        setTimeout(resolve, 5000, { msg: 'Hello' })
      })
    }
  },
};

export default queries;
