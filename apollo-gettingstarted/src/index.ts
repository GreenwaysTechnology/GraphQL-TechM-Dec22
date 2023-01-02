import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

//Define Schema
const typeDefs = `
 #Product OutStock or Availablity or Product

 #Product Name is Candy
 type Candy{
   id:String!
   name:String!
   price:Float
 }
 #Status Types
 type OutOfStock {
    restockDate:String
 }
 type RegionUnAvailablity {
    availableRegions: [String!]
 }

 #union type
 union CandyResult = Candy | OutOfStock | RegionUnAvailablity

 type Query {
    candy(id:String!):CandyResult
 }

 `
//data
const CANDIES = [
    {
        "id": "gummy-bears",
        "name": "Haribo Gummy Bears",
        "price": 100.89
    },
    {
        "id": "sour-patch",
        "name": "Sour-Patch Kids",
        "price": 45.89
    },
    {
        "id": "wonka-nerds",
        "name": "Wonka Nerds",
        "restockDate": "2022-04-10"
    },
    {
        "id": "swirly-pops",
        "name": "Swirly Pops",
        "availableRegions": ["Coimbatore", "Chennai", "Banaglore"]
    }
]


//Define Resolver
const resolvers = {

    //Resolver Type Resolution function
    CandyResult: {
        __resolveType(obj, contextValue, info) {
            //we need to pass unquie fields
            if (obj.restockDate) {
                return 'OutOfStock' // Type Name Must be String
            }
            if (obj.availableRegions) {
                return 'RegionUnAvailablity'
            }
            if (obj.price) {
                return 'Candy'
            }
            return null
        }
    },

    //Query
    Query: {
        candy(_, args) {
            return CANDIES.find(candy => {
                return candy.id === args.id
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
