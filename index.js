// 1. apollo-server 를 불러옵니다. 
const { ApolloServer } = require('apollo-server')

var _id = 0
var photos = []

const typeDefs = `
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
    }

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }

    type Mutation {
        postPhoto(name: String! description: String): Photo!
    }
` 

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },
    Mutation: {
        postPhoto (parent, args) {
            var newPhoto = {
                id: _id++,
                ...args
            }
            photos.push(newPhoto)

            return newPhoto
        }
    },
    Photo: {
        url: parent => `http://localhost:4000/img/${parent.id}.jpg`
    }
}

// 2. 서버 인스턴스를 새로 만듭니다. 
// 3. typeDefs(스키마)와 리졸버를 객체에 넣어 전달합니다. 
const server = new ApolloServer({
    typeDefs,
    resolvers
})

// 4. 웹 서버를 구동하기 위해 listen 메서드를 호출합니다. 
server.listen().then(({url}) => console.log(`GraphQL Service running on ${url}`))