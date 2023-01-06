import { readFileSync } from "fs";
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { prisma } from "./database.js";
import { PrismaClient } from "@prisma/client";

const typeDefs = readFileSync("./schema.graphql", { encoding: 'utf-8' })

interface MyContext {
    dataSources: {
        db: PrismaClient
    }
}

//Resolvers
const resolvers = {
    Query: {
        async users(parent, args, contextValue, info) {
            return await contextValue.dataSources.db.user.findMany({})
        }
    },
    Mutation: {
        async createUser(parent, args, contextValue, info) {
            const { user } = args
            return await contextValue.dataSources.db.user.create({
                data: {
                    createdAt: new Date(),
                    email: user.email || 'dummy@testmail.com',
                    name: user.name || 'dummyUser'
                }
            })
           
        }
    }
}

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers
})

//start the webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    },
    context: async () => {
        return {
            dataSources: {
                db: prisma
            }
        }
    }
})
console.log(`Apollo Server is Ready at ${url}`)