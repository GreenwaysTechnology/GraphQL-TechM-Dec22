import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { GraphQLScalarType, Kind } from "graphql"
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { GraphQLSchema, defaultFieldResolver } from 'graphql'
import { makeExecutableSchema } from "@graphql-tools/schema"




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
#Custom Data type Declaration
scalar Date

type User {
    id:ID!
    name:String @upper
    email:String
    date:Date
}
#Directive Declration
directive @upper on FIELD_DEFINITION
type Query {
  users:[User]
}

`

const USERS = [{
    id: 1,
    name: 'subramanian',
    email: 'subu@gmail.com',
    date: new Date()
},
{
    id: 2,
    name: 'murugan',
    email: 'murugan@gmail.com',
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
//directive logic
function upperDirectiveTransformer(schema, directiveName) {
    return mapSchema(schema, {
        // Executes once for each object field in the schema
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            // Check whether this field has the specified directive
            const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

            if (upperDirective) {
                // Get this field's original resolver
                const { resolve = defaultFieldResolver } = fieldConfig;

                // Replace the original resolver with a function that *first* calls
                // the original resolver, then converts its result to upper case
                fieldConfig.resolve = async function (source, args, context, info) {
                    const result = await resolve(source, args, context, info);
                    if (typeof result === 'string') {
                        //logic
                        return result.toUpperCase();
                    }
                    return result;
                };
                return fieldConfig;
            }
        },
    });
}

//create schema
let schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
//Attach directive to the schema
schema = upperDirectiveTransformer(schema, 'upper')

const server = new ApolloServer({
    schema
})
//start the webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Ready at ${url}`)
